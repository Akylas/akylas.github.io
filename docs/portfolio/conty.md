<script setup>
import PortfolioPage from '../.vitepress/components/PortfolioPage.vue'
</script>

<PortfolioPage project-id="conty" />

## Technology Stack

**Framework**: NativeScript with Svelte
**Languages**: TypeScript, JavaScript  
**Map Framework**: Akylas fork of Carto Mobile SDK  
**Data**: Topographic and geographic databases  
**Platforms**: iOS 11+, Android 5.0+

## Key Features

### Alpine Navigation

- 🗺️ **Topographic Maps**: High-detail alpine terrain maps
- 🏔️ **Elevation Data**: Accurate elevation profiles and 3D terrain
- 🧭 **Route Planning**: Plan mountain routes with waypoints
- 📍 **GPS Tracking**: Real-time location in mountain environments
- ⛰️ **Peak Information**: Database of mountains and peaks
- 🥾 **Trail Data**: Hiking and climbing routes
- 📊 **Activity Stats**: Track altitude gain, distance, and time

### Safety Features

- Offline map access for areas without connectivity
- Emergency location sharing
- Weather integration
- Avalanche risk information
- Route difficulty ratings

### Technical Challenges Solved

- Efficient rendering of complex terrain data
- Offline map caching for large areas
- Battery optimization for extended mountain trips
- Accurate GPS in challenging alpine environments
- Smooth 3D terrain visualization


## Target Audience

- Mountain climbers
- Alpine hikers
- Ski tourers
- Trail runners in alpine terrain
- Mountain guides
- Search and rescue teams

## Use Cases

### Mountaineering
Plan and navigate complex alpine routes with detailed elevation data and terrain information.

### Ski Touring
Find the best lines and assess terrain for backcountry skiing adventures.

### Trail Running
Discover new mountain trails and track your alpine running adventures.

### Safety & Rescue
Accurate location data for emergency situations in mountain environments.

## Impact

Alpimaps provides essential navigation tools for mountain enthusiasts, helping them explore alpine terrain safely and confidently. The app combines detailed topographic information with modern GPS technology for the ultimate mountain navigation experience.

### Key Advantages

- **Specialized**: Built specifically for alpine environments
- **Reliable**: Works offline in remote mountain areas
- **Accurate**: High-precision elevation and location data
- **Comprehensive**: Complete mountain information database

## Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🔧 Code contributions

Check out the [Contributing Guidelines](https://github.com/Akylas/conty/blob/master/CONTRIBUTING.md) to get started.

## Support

For questions, issues, or feature requests:

- 📝 [Open an issue](https://github.com/Akylas/conty/issues)
- 💬 [Discussions](https://github.com/Akylas/conty/discussions)
- 📧 Contact via GitHub profile

---

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 12px;">
  <h3>⭐ Star This Project</h3>
  <p>If you find this project useful, please consider starring it on GitHub!</p>
  <a href="https://github.com/Akylas/conty" target="_blank" rel="noopener" class="vp-button brand medium">View on GitHub →</a>
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
