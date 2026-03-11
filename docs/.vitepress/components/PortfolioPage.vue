<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects, type PortfolioProject } from '../data/portfolio'
import { fetchFastlaneMetadata, type FastlaneMetadata } from '../utils/github-loader'
import GitHubProject from './GitHubProject.vue'
import StoreBadges from './StoreBadges.vue'

interface Props {
  projectId: string
}

const props = defineProps<Props>()

const project = computed<PortfolioProject | undefined>(() => {
  return projects.find(p => p.id === props.projectId)
})

const fastlaneData = ref<FastlaneMetadata | null>(null)
const loadingFastlane = ref(false)

// Computed values that prioritize Fastlane metadata over portfolio.ts
const displayTitle = computed(() => {
  return fastlaneData.value?.name || project.value?.title || ''
})

const displaySubtitle = computed(() => {
  return fastlaneData.value?.subtitle || project.value?.subtitle || ''
})

const displayDescription = computed(() => {
  return fastlaneData.value?.description || project.value?.description || ''
})

const displayFeatureImage = computed(() => {
  return fastlaneData.value?.featureGraphic || project.value?.featureImage || project.value?.thumbnail || ''
})

const displayScreenshots = computed(() => {
  if (fastlaneData.value?.screenshots && fastlaneData.value.screenshots.length > 0) {
    return fastlaneData.value.screenshots
  }
  return project.value?.images || []
})

// Load Fastlane metadata if available
onMounted(async () => {
  if (project.value?.github?.repo && project.value?.github?.fastlanePath) {
    try {
      loadingFastlane.value = true
      console.log('PortofolioPage0, ', project.value)
      fastlaneData.value = await fetchFastlaneMetadata(
        project.value.github.repo,
        project.value.github.fastlanePath
      )
    } catch (error) {
      console.error('Error loading Fastlane metadata:', error)
    } finally {
      loadingFastlane.value = false
    }
  }
})
</script>

<template>
  <div v-if="project" class="portfolio-page">
    <div class="portfolio-header">
      <h1>{{ displayTitle }}</h1>
      <p class="subtitle">{{ displaySubtitle }}</p>
    </div>

    <!-- Feature Image or Thumbnail -->
    <div v-if="displayFeatureImage" class="feature-image">
      <img 
        :src="displayFeatureImage" 
        :alt="displayTitle"
      />
    </div>

    <!-- Store Badges -->
    <StoreBadges 
      v-if="project.stores"
      :ios-url="project.stores.ios"
      :android-url="project.stores.android"
      :github-url="project.stores.github"
      :fdroid-url="project.stores.fdroid"
      :izzy-url="project.stores.izzyondroid"
    />

    <!-- Project Details -->
    <div class="project-details">
      <div class="detail-grid">
        <div class="detail-item">
          <strong>Date:</strong> {{ project.date }}
        </div>
        <div class="detail-item">
          <strong>Client:</strong> {{ project.client }}
        </div>
        <div class="detail-item">
          <strong>Category:</strong> {{ project.category }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="description-section">
      <h2>Overview</h2>
      <p>{{ displayDescription }}</p>
    </div>

    <!-- Tags -->
    <div v-if="project.tags && project.tags.length > 0" class="tags-section">
      <h3>Technologies</h3>
      <div class="tags">
        <span 
          v-for="tag in project.tags" 
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- GitHub Project Integration -->
    <div v-if="project.github" class="github-section">
      <GitHubProject 
        :repo="project.github.repo" 
        :fastlane-path="project.github.fastlanePath"
      />
    </div>

    <!-- Project Images -->
    <div v-if="displayScreenshots.length > 0" class="images-section">
      <h2>Screenshots</h2>
      <div class="images-grid">
        <img 
          v-for="(image, index) in displayScreenshots" 
          :key="index"
          :src="image" 
          :alt="`${displayTitle} screenshot ${index + 1}`"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Back Button -->
    <div class="back-button">
      <a href="/portfolio/" class="vp-button alt medium">← Back to Portfolio</a>
    </div>
  </div>
  <div v-else class="not-found">
    <h1>Project Not Found</h1>
    <p>The project "{{ projectId }}" could not be found.</p>
    <a href="/portfolio/" class="vp-button brand medium">← Back to Portfolio</a>
  </div>
</template>

<style scoped>
.portfolio-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

.portfolio-header h1 {
  font-size: 3.5rem;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(135deg, var(--akylas-primary) 0%, var(--akylas-accent) 50%, var(--akylas-secondary) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 1.5rem;
  color: var(--akylas-accent);
  font-weight: 600;
  margin: 0;
}

.feature-image {
  margin: 3rem 0;
  text-align: center;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.feature-image img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 24px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(66, 192, 237, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 2px solid rgba(66, 192, 237, 0.2);
}

.feature-image img:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 80px rgba(66, 192, 237, 0.4), 0 0 0 1px rgba(66, 192, 237, 0.4);
}

.project-details {
  margin: 3rem 0;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(66, 192, 237, 0.1), rgba(22, 175, 230, 0.05));
  border-radius: 20px;
  border: 1px solid rgba(66, 192, 237, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  animation: fadeInUp 1s ease-out 0.4s both;
  position: relative;
  overflow: hidden;
}

.project-details::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--akylas-primary), var(--akylas-accent), var(--akylas-secondary));
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  font-size: 1rem;
  line-height: 1.8;
}

.detail-item strong {
  color: var(--akylas-primary);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.description-section {
  margin: 4rem 0;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(26, 31, 46, 0.6), rgba(15, 20, 25, 0.8));
  border-radius: 24px;
  border: 1px solid rgba(66, 192, 237, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  animation: fadeInUp 1.2s ease-out 0.6s both;
}

.description-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.description-section p {
  font-size: 1.15rem;
  line-height: 2;
  color: var(--vp-c-text-2);
}

.tags-section {
  margin: 3rem 0;
  animation: fadeInUp 1.4s ease-out 0.8s both;
}

.tags-section h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, rgba(66, 192, 237, 0.15), rgba(22, 175, 230, 0.1));
  color: var(--akylas-primary);
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  border: 2px solid rgba(66, 192, 237, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tag:hover {
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-secondary));
  color: white;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(66, 192, 237, 0.4);
}

.github-section {
  margin: 4rem 0;
  animation: fadeInUp 1.6s ease-out 1s both;
}

.images-section {
  margin: 4rem 0;
  animation: fadeInUp 1.8s ease-out 1.2s both;
}

.images-section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.images-grid img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  border-radius: 16px;
  border: 2px solid rgba(66, 192, 237, 0.2);
  background: rgba(26, 31, 46, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  backdrop-filter: blur(10px);
}

.images-grid img:hover {
  transform: scale(1.05) translateY(-8px);
  box-shadow: 0 16px 48px rgba(66, 192, 237, 0.4);
  border-color: rgba(66, 192, 237, 0.5);
}

.back-button {
  text-align: center;
  margin: 4rem 0;
}

.vp-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.4s ease;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}

.vp-button.alt {
  background: linear-gradient(135deg, rgba(66, 192, 237, 0.1), rgba(22, 175, 230, 0.05));
  color: var(--akylas-primary);
  border: 2px solid rgba(66, 192, 237, 0.4);
  backdrop-filter: blur(10px);
}

.vp-button.alt::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(66, 192, 237, 0.3), transparent);
  transition: left 0.5s;
}

.vp-button.alt:hover::before {
  left: 100%;
}

.vp-button.alt:hover {
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-secondary));
  color: white;
  border-color: transparent;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(66, 192, 237, 0.5);
}

.vp-button.brand {
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-secondary));
  color: white;
  border: none;
  box-shadow: 0 8px 24px rgba(66, 192, 237, 0.3);
}

.vp-button.brand:hover {
  background: linear-gradient(135deg, var(--akylas-accent), var(--akylas-primary));
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(66, 192, 237, 0.5);
}

.not-found {
  text-align: center;
  padding: 6rem 2rem;
  animation: fadeInUp 0.6s ease-out;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--akylas-primary), var(--akylas-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.not-found p {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .portfolio-header h1 {
    font-size: 2.5rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .images-grid {
    grid-template-columns: 1fr;
  }

  .description-section,
  .project-details {
    padding: 2rem;
  }

  .portfolio-page {
    padding: 2rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
