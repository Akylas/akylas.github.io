# OSS Document Scanner

<script setup>
import GitHubProject from '../.vitepress/components/GitHubProject.vue'
import StoreBadges from '../.vitepress/components/StoreBadges.vue'
</script>

<div style="display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <a href="https://github.com/Akylas/OSS-DocumentScanner" target="_blank" rel="noopener" class="badge-link">
    <img src="https://img.shields.io/github/stars/Akylas/OSS-DocumentScanner?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/Akylas/OSS-DocumentScanner" target="_blank" rel="noopener" class="badge-link">
    <img src="https://img.shields.io/github/forks/Akylas/OSS-DocumentScanner?style=social" alt="GitHub forks">
  </a>
  <a href="https://github.com/Akylas/OSS-DocumentScanner/blob/master/LICENSE" target="_blank" rel="noopener" class="badge-link">
    <img src="https://img.shields.io/github/license/Akylas/OSS-DocumentScanner" alt="License">
  </a>
</div>

## Download

<StoreBadges 
  ios-url="https://apps.apple.com/app/oss-document-scanner/id1563961977"
  android-url="https://play.google.com/store/apps/details?id=com.akylas.documentscanner"
/>

## Overview

**OSS Document Scanner** is a powerful open-source document scanning application built with NativeScript. It provides professional-grade document scanning capabilities with advanced image processing, OCR (Optical Character Recognition), and PDF generation.

### Key Features

- 📸 **Fast Document Detection**: Automatic edge detection for quick document capture
- 🎨 **Image Enhancement**: Multiple filters and enhancement options
- 📄 **PDF Generation**: Create multi-page PDFs from scanned documents
- 🔍 **OCR Support**: Extract text from scanned documents
- 📱 **Cross-Platform**: Available for both iOS and Android
- 🎯 **High Accuracy**: Advanced computer vision algorithms
- 💾 **Local Storage**: Keep your documents private and secure
- 🎨 **Customizable**: Configurable settings and themes

## Project Information

<GitHubProject 
  repo="Akylas/OSS-DocumentScanner" 
  fastlane-path="fastlane/metadata/android/en-US"
/>

## Technology Stack

**Framework**: NativeScript with Vue.js  
**Languages**: TypeScript, JavaScript  
**Image Processing**: OpenCV, custom algorithms  
**OCR Engine**: Tesseract integration  
**Platforms**: iOS 11+, Android 5.0+

## GitHub Repository

This project is fully open source and available on GitHub:

🔗 **Repository**: [Akylas/OSS-DocumentScanner](https://github.com/Akylas/OSS-DocumentScanner)

### Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🔧 Code contributions

Check out the [Contributing Guidelines](https://github.com/Akylas/OSS-DocumentScanner/blob/master/CONTRIBUTING.md) to get started.

## Project Status

**Status**: 🟢 Active Development  
**Latest Release**: Check [GitHub Releases](https://github.com/Akylas/OSS-DocumentScanner/releases)  
**License**: MIT License

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/Akylas/OSS-DocumentScanner.git
cd OSS-DocumentScanner

# Install dependencies
npm install

# Run on iOS
ns run ios

# Run on Android
ns run android
```

### Build from GitHub

The project uses Fastlane for automated builds and deployments. The fastlane configuration includes:

- Automated screenshots
- App metadata management
- Beta distribution
- App Store/Play Store submission

## Screenshots

<div class="screenshot-gallery">
  <p><em>Screenshots and app store assets are managed via Fastlane metadata in the repository.</em></p>
  <p><a href="https://github.com/Akylas/OSS-DocumentScanner/tree/master/fastlane" target="_blank" rel="noopener">View Fastlane Metadata →</a></p>
</div>

## Use Cases

- **Business**: Digitize receipts, invoices, and documents
- **Education**: Scan notes, textbooks, and assignments
- **Legal**: Archive important documents and contracts
- **Personal**: Organize personal documents and paperwork

## Performance

- ⚡ **Fast Scanning**: < 1 second for document detection
- 📦 **Small Size**: Optimized app size < 50MB
- 🔋 **Battery Efficient**: Minimal battery impact
- 💨 **Smooth UI**: 60fps native performance

## Future Roadmap

- [ ] Cloud backup integration
- [ ] Batch scanning improvements
- [ ] Advanced OCR languages
- [ ] Document organization features
- [ ] Collaboration tools

## Support

For questions, issues, or feature requests:

- 📝 [Open an issue](https://github.com/Akylas/OSS-DocumentScanner/issues)
- 💬 [Discussions](https://github.com/Akylas/OSS-DocumentScanner/discussions)
- 📧 Contact via GitHub profile

## Related Projects

Check out other open source projects:
- [Other NativeScript Plugins](https://github.com/farfromrefug?tab=repositories)
- [Akylas Organization](https://github.com/Akylas)

---

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 12px;">
  <h3>⭐ Star This Project</h3>
  <p>If you find this project useful, please consider starring it on GitHub!</p>
  <a href="https://github.com/Akylas/OSS-DocumentScanner" target="_blank" rel="noopener" class="vp-button brand medium">View on GitHub →</a>
</div>

<style scoped>
.badge-link {
  display: inline-block;
}

.badge-link img {
  height: 20px;
}

.screenshot-gallery {
  margin: 2rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.vp-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.vp-button.brand {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.vp-button.brand:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}
</style>
