<script setup lang="ts">
import { computed } from 'vue'
import { projects, type PortfolioProject } from '../data/portfolio'
import GitHubProject from './GitHubProject.vue'
import StoreBadges from './StoreBadges.vue'

interface Props {
  projectId: string
}

const props = defineProps<Props>()

const project = computed<PortfolioProject | undefined>(() => {
  return projects.find(p => p.id === props.projectId)
})
</script>

<template>
  <div v-if="project" class="portfolio-page">
    <div class="portfolio-header">
      <h1>{{ project.title }}</h1>
      <p class="subtitle">{{ project.subtitle }}</p>
    </div>

    <!-- Feature Image or Thumbnail -->
    <div v-if="project.featureImage || project.thumbnail" class="feature-image">
      <img 
        :src="project.featureImage || project.thumbnail" 
        :alt="project.title"
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
      <p>{{ project.description }}</p>
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
    <div v-if="project.images && project.images.length > 0" class="images-section">
      <h2>Screenshots</h2>
      <div class="images-grid">
        <img 
          v-for="(image, index) in project.images" 
          :key="index"
          :src="image" 
          :alt="`${project.title} screenshot ${index + 1}`"
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 2rem;
}

.portfolio-header h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.3rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin: 0;
}

.feature-image {
  margin: 2rem 0;
  text-align: center;
}

.feature-image img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.project-details {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  font-size: 0.95rem;
}

.detail-item strong {
  color: var(--vp-c-brand-1);
  margin-right: 0.5rem;
}

.description-section {
  margin: 3rem 0;
}

.description-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.description-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.tags-section {
  margin: 2rem 0;
}

.tags-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.tag:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.github-section {
  margin: 3rem 0;
}

.images-section {
  margin: 3rem 0;
}

.images-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.images-grid img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.back-button {
  text-align: center;
  margin: 3rem 0;
}

.vp-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-brand-1);
}

.vp-button.alt {
  background-color: transparent;
  color: var(--vp-c-brand-1);
}

.vp-button.alt:hover {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.vp-button.brand {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.vp-button.brand:hover {
  background-color: var(--vp-c-brand-2);
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.not-found p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .portfolio-header h1 {
    font-size: 2rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .images-grid {
    grid-template-columns: 1fr;
  }
}
</style>
