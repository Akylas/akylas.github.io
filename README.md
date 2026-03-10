# Akylas Portfolio Website

Modern portfolio website built with [VitePress](https://vitepress.dev/), showcasing mobile development projects and open source work.

## Features

- 🎨 **Modern Design**: Clean, professional design with responsive layout
- 📱 **Portfolio Showcase**: Display projects with screenshots and detailed information
- 🔗 **GitHub Integration**: Automatically fetch project data from GitHub repositories
- 🚀 **Fast & Static**: Static site generation for optimal performance
- 🎯 **SEO Optimized**: Built-in SEO features with VitePress
- 📦 **Fastlane Support**: Automatically integrate app metadata from Fastlane

## Project Structure

```
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress configuration
│   │   ├── theme/              # Custom theme
│   │   │   ├── index.ts        # Theme entry
│   │   │   └── custom.css      # Custom styles
│   │   ├── components/         # Vue components
│   │   │   └── PortfolioGrid.vue
│   │   ├── data/               # Data files
│   │   │   └── portfolio.ts    # Portfolio projects data
│   │   └── utils/              # Utility functions
│   │       └── github-loader.ts
│   ├── public/                 # Static assets
│   │   └── img/                # Images
│   ├── portfolio/              # Portfolio pages
│   │   ├── index.md            # Portfolio index
│   │   ├── ecairn.md           # Project pages
│   │   └── ...
│   ├── index.md                # Home page
│   ├── about.md                # About page
│   ├── opensource.md           # Open source work
│   └── contact.md              # Contact page
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run docs:dev

# Server will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Adding Portfolio Projects

### Traditional Projects (Static)

Edit `docs/.vitepress/data/portfolio.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  subtitle: 'Platform',
  description: 'Project description',
  thumbnail: '/img/portfolio/project/thumb.png',
  images: ['/img/portfolio/project/screenshot.png'],
  date: 'January 2024',
  client: 'Technology Used',
  category: 'Application Development',
  tags: ['Tag1', 'Tag2']
}
```

### GitHub Projects (Dynamic)

For projects hosted on GitHub with Fastlane metadata:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  subtitle: 'Open Source Project',
  description: 'Fallback description',
  thumbnail: '/img/portfolio/project/icon.png',
  date: 'Ongoing',
  client: 'Open Source',
  category: 'Open Source Development',
  tags: ['NativeScript', 'Open Source'],
  github: {
    repo: 'owner/repository',
    fastlanePath: 'fastlane/metadata/en-US'  // Optional
  }
}
```

The website will automatically fetch:
- Repository stars, forks, and metadata
- Fastlane metadata (name, description, keywords)
- Screenshots from Fastlane metadata
- Latest release information

## GitHub Integration

### Fastlane Metadata Structure

The site can automatically fetch app metadata from Fastlane directories:

```
your-repo/
└── fastlane/
    └── metadata/
        └── en-US/
            ├── name.txt
            ├── subtitle.txt
            ├── description.txt
            ├── keywords.txt
            └── screenshots/
                ├── screenshot1.png
                └── screenshot2.png
```

### API Rate Limits

To avoid GitHub API rate limits in production:

1. Create a GitHub Personal Access Token
2. Add to your build environment:
   ```bash
   export GITHUB_TOKEN="your_token_here"
   ```

## Customization

### Theme Colors

Edit `docs/.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand-1: #42C0ED;  /* Primary brand color */
  --vp-c-brand-2: #16afe6;  /* Secondary brand color */
}
```

### Navigation

Edit `docs/.vitepress/config.ts`:

```typescript
nav: [
  { text: 'Home', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'Portfolio', link: '/portfolio/' },
  // Add more items...
]
```

## Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages when you push to the main branch.

**Setup Steps:**

1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch - the site will deploy automatically

### Manual Deployment

```bash
# Build the site
npm run docs:build

# The built files will be in /dist directory
# Upload to your hosting provider
```

## Adding New Pages

Create a new markdown file in `docs/`:

```markdown
# Page Title

Your content here...
```

VitePress will automatically generate routes based on file structure.

## Technologies Used

- **VitePress**: Static site generator
- **Vue 3**: Component framework
- **TypeScript**: Type-safe development
- **Octokit**: GitHub API integration
- **GitHub Actions**: CI/CD

## Contributing

This is a personal portfolio site, but suggestions and feedback are welcome!

## License

Copyright © 2024 Akylas

---

## Support

For questions or issues:
- Open an issue on GitHub
- Contact via [GitHub profile](https://github.com/farfromrefug)

## Links

- **Live Site**: https://akylas.github.io
- **GitHub**: https://github.com/farfromrefug
- **Company**: Akylas
