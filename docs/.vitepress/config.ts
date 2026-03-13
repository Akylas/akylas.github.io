import { defineConfig } from 'vitepress'
import { joinURL, withoutTrailingSlash } from 'ufo'

export default defineConfig({
  title: 'Akylas',
  description: 'Open Source Developer & Mobile App Consultant',
  lang: 'en-US',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#42C0ED' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'fr' }],
    ['meta', { property: 'og:site_name', content: 'Akylas Portfolio' }],
  ],

  // Enable dark mode by default
  appearance: 'dark',

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Portfolio', link: '/portfolio/' },
      { text: 'Open Source', link: '/opensource' },
      { text: 'Contact', link: '/contact' },
      { text: 'Privacy', link: '/privacy' }
    ],

    sidebar: {
      '/portfolio/': [
        {
          text: 'Portfolio',
          items: [
            { text: 'All Projects', link: '/portfolio/' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/farfromrefug' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/martinguillon/' }
    ],

    footer: {
      message: 'Building innovative mobile applications',
      copyright: 'Copyright © 2026 Akylas'
    }
  },

  // Clean URLs (no .html extension)
  cleanUrls: true,

  // Build output directory
  outDir: '../dist',

  // Enable sitemap generation
  sitemap: {
    hostname: 'https://www.akylas.fr',
    transformItems: (items) => {
      // add new items or modify/filter existing items
      items.push({
        url: '/oss-weather',
        priority: 0.8
      })
      items.push({
        url: '/OSS-DocumentScanner',
        priority: 0.8
      })
      return items
    }
  },
  transformPageData: (pageData, { siteConfig }) => {
    // Initialize the `head` frontmatter if it doesn't exist.
    pageData.frontmatter.head ??= []

    // Add basic meta tags to the frontmatter.
    pageData.frontmatter.head.push(
      [
        'meta',
        {
          property: 'og:title',
          content:
            pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:title',
          content:
            pageData.frontmatter.title || pageData.title || siteConfig.site.title,
        },
      ],
      [
        'meta',
        {
          property: 'og:description',
          content:
            pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],
      [
        'meta',
        {
          name: 'twitter:description',
          content:
            pageData.frontmatter.description || pageData.description || siteConfig.site.description,
        },
      ],
    )
    // Create the canonical URL
    pageData.frontmatter.head.push([
      'link',
      {
        rel: 'canonical',
        href: joinURL(
          'https://garabit.barbapapazes.dev', // Modify this prior to deployment
          withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
        ),
      },
    ])

    pageData.frontmatter.head.push([
      'meta',
      {
        property: 'og:url',
        content: joinURL(
          'https://garabit.barbapapazes.dev', // Modify this prior to deployment
          withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, '')),
        ),
      },
    ])
  },
})
