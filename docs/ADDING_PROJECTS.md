# Adding Portfolio Projects

This guide explains how to add new projects to the Akylas portfolio website.

## Two Types of Projects

### 1. Traditional Projects (Static)
These are projects with manually maintained information, screenshots, and descriptions.

### 2. GitHub-Integrated Projects (Dynamic)
These automatically fetch information from GitHub repositories, including Fastlane metadata.

---

## Adding a Traditional Project

### Step 1: Prepare Assets

Place your project images in `docs/public/img/portfolio/your-project/`:
- `icon.png` or `thumbnail.png` - For the grid view
- `screenshot1.png`, `screenshot2.png` - For the detail page

### Step 2: Add to Portfolio Data

Edit `docs/.vitepress/data/portfolio.ts` and add your project:

```typescript
{
  id: 'your-project-id',
  title: 'Your Project Name',
  subtitle: 'iOS / Android Application',
  description: 'A comprehensive description of your project and what it does.',
  thumbnail: '/img/portfolio/your-project/icon.png',
  images: [
    '/img/portfolio/your-project/screenshot1.png',
    '/img/portfolio/your-project/screenshot2.png'
  ],
  date: 'January 2024',
  client: 'Technology Stack',
  category: 'Application Development',
  tags: ['NativeScript', 'Mobile', 'iOS', 'Android']
}
```

### Step 3: Create Detail Page

Create `docs/portfolio/your-project-id.md`:

```markdown
# Your Project Name

![Icon](/img/portfolio/your-project/icon.png)

## Overview

Your project description here.

### Project Details

- **Platform**: iOS & Android
- **Technology**: NativeScript
- **Release Date**: January 2024
- **Category**: Application Type

## Features

- Feature 1
- Feature 2
- Feature 3

## Screenshots

![Screenshot](/img/portfolio/your-project/screenshot1.png)

---

<div style="text-align: center; margin: 3rem 0;">
  <a href="/portfolio/" class="vp-button alt medium">← Back to Portfolio</a>
</div>
```

---

## Adding a GitHub-Integrated Project

This is the powerful feature that lets your portfolio auto-update when you update your GitHub repo!

### Step 1: Set Up Your GitHub Repository

Your GitHub repository should have Fastlane metadata in this structure:

```
your-repo/
├── fastlane/
│   └── metadata/
│       └── en-US/
│           ├── name.txt
│           ├── subtitle.txt
│           ├── description.txt
│           ├── keywords.txt
│           └── screenshots/
│               ├── screenshot1.png
│               └── screenshot2.png
```

**Example files:**

`name.txt`:
```
OSS Document Scanner
```

`subtitle.txt`:
```
Fast, Accurate Document Scanning
```

`description.txt`:
```
A powerful open-source document scanning application with OCR capabilities, 
edge detection, and PDF generation. Built with NativeScript for iOS and Android.
```

`keywords.txt`:
```
document scanner, OCR, PDF, NativeScript, open source
```

### Step 2: Add to Portfolio Data

Edit `docs/.vitepress/data/portfolio.ts`:

```typescript
{
  id: 'your-project-id',
  title: 'Your Project Name',  // Fallback if GitHub fetch fails
  subtitle: 'Open Source Project',
  description: 'Fallback description',
  thumbnail: '/img/portfolio/your-project/icon.png',
  images: [],
  date: 'Ongoing',
  client: 'Open Source',
  category: 'Open Source Development',
  tags: ['NativeScript', 'Open Source'],
  github: {
    repo: 'YourUsername/your-repository',
    fastlanePath: 'fastlane/metadata/en-US'  // Optional, defaults to this
  }
}
```

### Step 3: Create Detail Page with GitHub Integration

Create `docs/portfolio/your-project-id.md`:

```markdown
# Your Project Name

<div style="display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <a href="https://github.com/YourUsername/your-repository" target="_blank" rel="noopener" class="badge-link">
    <img src="https://img.shields.io/github/stars/YourUsername/your-repository?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/YourUsername/your-repository" target="_blank" rel="noopener" class="badge-link">
    <img src="https://img.shields.io/github/license/YourUsername/your-repository" alt="License">
  </a>
</div>

## Overview

**Your Project** is an open-source application built with NativeScript.

### Key Features

- Feature from GitHub repo
- Another feature
- OCR Support

## Technology Stack

**Framework**: NativeScript  
**Languages**: TypeScript  
**Platforms**: iOS 11+, Android 5.0+

## GitHub Repository

This project is fully open source and available on GitHub:

🔗 **Repository**: [YourUsername/your-repository](https://github.com/YourUsername/your-repository)

### Contributing

Contributions are welcome! Check out the [Contributing Guidelines](https://github.com/YourUsername/your-repository/blob/master/CONTRIBUTING.md).

## Screenshots

<div class="screenshot-gallery">
  <p><em>Screenshots are managed via Fastlane metadata in the repository.</em></p>
  <p><a href="https://github.com/YourUsername/your-repository/tree/master/fastlane" target="_blank" rel="noopener">View Fastlane Metadata →</a></p>
</div>

---

<div style="text-align: center; margin: 3rem 0;">
  <a href="https://github.com/YourUsername/your-repository" target="_blank" rel="noopener" class="vp-button brand medium">View on GitHub →</a>
</div>
```

### Step 4: Using the GitHub Loader (Advanced)

For dynamic fetching, you can use the GitHub loader utility in your Vue components:

```typescript
import { fetchCompleteProjectData } from '../.vitepress/utils/github-loader'

const projectData = await fetchCompleteProjectData(
  'YourUsername/your-repository',
  'fastlane/metadata/en-US'
)

// projectData will contain:
// - name, description from GitHub
// - stars, forks, language
// - topics/tags
// - fastlaneMetadata (if available)
//   - name, subtitle, description
//   - keywords, screenshots
```

---

## Best Practices

### Images
- Use web-optimized images (compress before uploading)
- PNG for logos/icons, JPEG for screenshots
- Recommended sizes:
  - Thumbnails: 400x400px
  - Screenshots: 1170x2532px (iPhone) or 1080x1920px (Android)

### Descriptions
- Keep descriptions concise but informative
- Use bullet points for features
- Include technical stack information

### GitHub Integration
- Keep Fastlane metadata up to date
- Use semantic versioning for releases
- Add comprehensive README to your repo

### Tags
- Use consistent tag names across projects
- Common tags: 'NativeScript', 'iOS', 'Android', 'Open Source', 'Vue', 'TypeScript'

---

## Automatic Updates

When you push changes to your GitHub repository's Fastlane metadata:

1. Update your `fastlane/metadata/en-US/` files
2. Commit and push to GitHub
3. The website will automatically fetch the latest data on next build
4. GitHub Actions will rebuild and deploy the site

**Note**: For private repositories, you'll need to set the `GITHUB_TOKEN` environment variable in your build environment.

---

## Troubleshooting

### Images not showing
- Check the path is correct (starts with `/img/portfolio/`)
- Verify the file exists in `docs/public/img/portfolio/`
- Check file permissions

### GitHub integration not working
- Verify the repository is public
- Check the Fastlane path is correct
- Ensure metadata files are properly formatted
- Check GitHub API rate limits

### Build fails
- Run `npm run docs:build` locally to see errors
- Check TypeScript types are correct
- Verify all image paths exist

---

## Example: Complete Project Setup

See the OSS Document Scanner project for a complete example:
- Portfolio data: `docs/.vitepress/data/portfolio.ts` (document-scanner entry)
- Detail page: `docs/portfolio/document-scanner.md`
- GitHub repo: https://github.com/Akylas/OSS-DocumentScanner

This demonstrates all features including GitHub badges, repository links, and Fastlane integration structure.
