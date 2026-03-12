<script setup>
import PortfolioPage from '../.vitepress/components/PortfolioPage.vue'
</script>

<PortfolioPage project-id="oss-weather" />

## Technology Stack

**Framework**: NativeScript with Svelte 
**Languages**: TypeScript, JavaScript  
**Image Processing**: OpenCV, custom algorithms  
**OCR Engine**: Tesseract integration  
**Platforms**: iOS 11+, Android 5.0+

## Key Features

- 📸 **Fast Card Detection**: Automatic edge detection for quick card capture from camera
- 🎨 **Pass Book support**: import, visualize, export your .pkpass
- 🎨 **Image Enhancement**: Multiple filters and enhancement options
- 📄 **PDF Generation**: Create multi-page PDFs from scanned documents
- 🔍 **OCR Support**: Extract text from scanned documents
- 📱 **Cross-Platform**: Available for both iOS and Android
- 🎯 **High Accuracy**: Advanced computer vision algorithms
- 💾 **Local Storage**: Keep your documents private and secure
- 🎨 **Customizable**: Configurable settings and themes

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

## Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🔧 Code contributions

Check out the [Contributing Guidelines](https://github.com/Akylas/oss-weather/blob/master/CONTRIBUTING.md) to get started.

## Support

For questions, issues, or feature requests:

- 📝 [Open an issue](https://github.com/Akylas/oss-weather/issues)
- 💬 [Discussions](https://github.com/Akylas/oss-weather/discussions)
- 📧 Contact via GitHub profile

---

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 12px;">
  <h3>⭐ Star This Project</h3>
  <p>If you find this project useful, please consider starring it on GitHub!</p>
  <a href="https://github.com/Akylas/oss-weather" target="_blank" rel="noopener" class="vp-button brand medium">View on GitHub →</a>
</div>

<style scoped>
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
