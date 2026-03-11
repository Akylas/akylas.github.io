// Portfolio projects data
export interface PortfolioProject {
  id: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  images?: string[]
  featureImage?: string
  date: string
  client: string
  category: string
  tags?: string[]
  featured?: boolean
  github?: {
    repo: string
    fastlanePath?: string
  }
  stores?: {
    ios?: string
    android?: string
    github?: string
    fdroid?: string
    izzyondroid?: string
  }
}

export const projects: PortfolioProject[] = [
  {
    id: 'document-scanner',
    title: 'OSS Document Scanner',
    subtitle: 'Open Source Document Scanner',
    description: 'A powerful open-source document scanning application with OCR capabilities, edge detection, and PDF generation. Built with NativeScript for iOS and Android.',
    thumbnail: '/img/portfolio/logo.png',
    images: [],
    date: 'Ongoing',
    client: 'Open Source',
    category: 'Open Source Development',
    tags: ['NativeScript', 'OCR', 'Document Scanning', 'Open Source', 'iOS', 'Android'],
    featured: true,
    github: {
      repo: 'Akylas/OSS-DocumentScanner',
      fastlanePath: 'fastlane/metadata/com.akylas.documentscanner/android/en-US'
    },
    stores: {
      ios: 'https://apps.apple.com/app/oss-document-scanner/id1563961977',
      android: 'https://play.google.com/store/apps/details?id=com.akylas.documentscanner',
      github: 'https://github.com/Akylas/OSS-DocumentScanner/releases',
      izzyondroid: 'https://apt.izzysoft.de/fdroid/index/apk/com.akylas.documentscanner'
    }
  },
  {
    id: 'ecairn',
    title: 'eCairn',
    subtitle: 'Android / iOS Application',
    description: 'A comprehensive outdoor navigation and hiking application built with NativeScript.',
    thumbnail: '/img/portfolio/ecairn/icon.png',
    images: ['/img/portfolio/ecairn/Simulator Screen Shot - iPhone 6 - 2019-10-15 at 15.37.13.png'],
    date: 'June 2019',
    client: 'NativeScript',
    category: 'Application Development',
    tags: ['NativeScript', 'Mobile', 'Navigation', 'iOS', 'Android'],
    featured: true
  },
  {
    id: 'activelook',
    title: 'Activelook',
    subtitle: 'Android / iOS Applications',
    description: 'Smart glasses companion app for athletes and outdoor enthusiasts.',
    thumbnail: '/img/portfolio/activelook/90ViCQSM1BCVUtaYrL2nbnhvdAFN_lHQJ6Pze8K-XEo3SJbTVOB9RpY0aJgTF4QJ2onS=s360.png',
    images: ['/img/portfolio/activelook/CPU6d3nxh5fKUyy8kmDa2FlPCA4nqlBu9NDXGhcRZIaW3t9SJ6G-MR339B7Ff1Bseg=w3530-h1980.png'],
    date: 'January 2018',
    client: 'NativeScript',
    category: 'Application Development',
    tags: ['NativeScript', 'Mobile', 'IoT', 'Bluetooth', 'iOS', 'Android'],
    featured: true
  },
  {
    id: 'oenoneo',
    title: 'Oenoneo',
    subtitle: 'Android / iOS Applications',
    description: 'Wine management and cellar tracking application.',
    thumbnail: '/img/portfolio/oenoneo/logo.png',
    images: ['/img/portfolio/oenoneo/myoeno.png'],
    date: 'January 2017',
    client: 'Titanium Mobile',
    category: 'Application Development',
    tags: ['Titanium Mobile', 'Mobile', 'Wine', 'iOS', 'Android']
  },
  {
    id: 'lesbellesannees',
    title: 'Les Belles Années',
    subtitle: 'Android / iOS Application',
    description: 'Social networking application for seniors and their families.',
    thumbnail: '/img/portfolio/lesbellesannees/DefaultIcon.png',
    images: [],
    date: 'January 2017',
    client: 'Titanium Mobile',
    category: 'Application Development',
    tags: ['Titanium Mobile', 'Mobile', 'Social', 'iOS', 'Android']
  },
  {
    id: 'alpimaps',
    title: 'Alpimaps',
    subtitle: 'Mountain Navigation App',
    description: 'Specialized mapping application for mountain sports and alpine activities.',
    thumbnail: '/img/portfolio/alpimaps/DefaultIcon.png',
    images: [],
    date: 'Various',
    client: 'NativeScript',
    category: 'Application Development',
    tags: ['NativeScript', 'Maps', 'Navigation', 'iOS', 'Android']
  }
]
