// .vitepress/theme/index.ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Custom layout slots can be added here if needed
    })
  },
  enhanceApp({ app, router, siteData }) {
    // App-level enhancements
  }
} satisfies Theme
