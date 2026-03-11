/**
 * GitHub Repository Data Loader
 * 
 * This loader fetches metadata from GitHub repositories, including fastlane data,
 * to automatically populate portfolio projects from their GitHub repos.
 * 
 * Usage: Add github config to portfolio projects in portfolio.ts
 */

import { Octokit } from '@octokit/rest'

export interface FastlaneMetadata {
  name?: string
  subtitle?: string
  description?: string
  keywords?: string[]
  screenshots?: string[]
  icon?: string
  featureGraphic?: string
  version?: string
  releaseNotes?: string
}

export interface GitHubProjectData {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  topics: string[]
  homepage?: string
  license?: string
  lastUpdate: string
  fastlaneMetadata?: FastlaneMetadata
}

/**
 * Fetch repository data from GitHub
 */
export async function fetchGitHubRepo(repo: string): Promise<GitHubProjectData | null> {
  try {
    const [owner, repoName] = repo.split('/')
    
    // Note: For production, you'd want to use GITHUB_TOKEN for higher rate limits
    const octokit = new Octokit({
      // auth: process.env.GITHUB_TOKEN
    })

    const { data } = await octokit.repos.get({
      owner,
      repo: repoName
    })

    return {
      name: data.name,
      description: data.description || '',
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language || 'Unknown',
      topics: data.topics || [],
      homepage: data.homepage || undefined,
      license: data.license?.name,
      lastUpdate: data.updated_at
    }
  } catch (error) {
    console.error(`Error fetching GitHub repo ${repo}:`, error)
    return null
  }
}

/**
 * Fetch Fastlane metadata from a GitHub repository
 * 
 * Fastlane stores app metadata in /fastlane/metadata directory with structure:
 * - fastlane/metadata/en-US/name.txt
 * - fastlane/metadata/en-US/subtitle.txt
 * - fastlane/metadata/en-US/description.txt
 * - fastlane/metadata/en-US/keywords.txt
 * - fastlane/metadata/en-US/screenshots/
 */
export async function fetchFastlaneMetadata(
  repo: string, 
  fastlanePath: string = 'fastlane/metadata/en-US'
): Promise<FastlaneMetadata | null> {
  try {
    const [owner, repoName] = repo.split('/')
    const octokit = new Octokit()

    // Fetch metadata files
    const metadata: FastlaneMetadata = {}

    // Helper to fetch file content
    const fetchFile = async (path: string): Promise<string | undefined> => {
      try {
      console.log('fetchFile, ', owner, repoName, path)
        const { data } = await octokit.repos.getContent({
          owner,
          repo: repoName,
          path
        })
        
        if ('content' in data && data.content) {
          return Buffer.from(data.content, 'base64').toString('utf-8').trim()
        }
      } catch {
        return undefined
      }
    }

    // Fetch standard Fastlane metadata files
    const [name, subtitle, description] = await Promise.all([
      fetchFile(`${fastlanePath}/title.txt`),
      fetchFile(`${fastlanePath}/short_description.txt`),
      fetchFile(`${fastlanePath}/full_description.txt`),
    ])

    if (name) metadata.name = name
    if (subtitle) metadata.subtitle = subtitle
    if (description) metadata.description = description

    // Fetch screenshots
    try {
      const { data: screenshotsDir } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path: `${fastlanePath}/images/phoneScreenshots`
      })

      if (Array.isArray(screenshotsDir)) {
        metadata.screenshots = screenshotsDir
          .filter(file => file.type === 'file' && /\.(png|jpg|jpeg)$/i.test(file.name))
          .map(file => file.download_url || '')
          .filter(url => url !== '')
      }
    } catch {
      // Screenshots directory might not exist
    }

    // Fetch icon (usually in parent directory or images folder)
    try {
      const iconPath = fastlanePath.replace('/en-US', '/icon.png')
      const { data: iconData } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path: iconPath
      })
      if ('download_url' in iconData && iconData.download_url) {
        metadata.icon = iconData.download_url
      }
    } catch {
      // Icon might not exist
    }

    // Fetch feature graphic (Android)
    try {
      const featureGraphicPath = fastlanePath.replace('/en-US', '/featureGraphic.png')
      const { data: featureData } = await octokit.repos.getContent({
        owner,
        repo: repoName,
        path: featureGraphicPath
      })
      if ('download_url' in featureData && featureData.download_url) {
        metadata.featureGraphic = featureData.download_url
      }
    } catch {
      // Feature graphic might not exist
    }

    return Object.keys(metadata).length > 0 ? metadata : null
  } catch (error) {
    console.error(`Error fetching Fastlane metadata for ${repo}:`, error)
    return null
  }
}

/**
 * Combine GitHub repo data with Fastlane metadata
 */
export async function fetchCompleteProjectData(
  repo: string,
  fastlanePath?: string
): Promise<GitHubProjectData | null> {
  const repoData = await fetchGitHubRepo(repo)
  
  if (!repoData) return null

  if (fastlanePath) {
    const fastlaneData = await fetchFastlaneMetadata(repo, fastlanePath)
    if (fastlaneData) {
      repoData.fastlaneMetadata = fastlaneData
      
      // Override with Fastlane data if available
      if (fastlaneData.description) {
        repoData.description = fastlaneData.description
      }
      if (fastlaneData.keywords) {
        repoData.topics = [...repoData.topics, ...fastlaneData.keywords]
      }
    }
  }

  return repoData
}
