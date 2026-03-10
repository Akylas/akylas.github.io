<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCompleteProjectData } from '../utils/github-loader'
import type { GitHubProjectData } from '../utils/github-loader'

interface Props {
  repo: string
  fastlanePath?: string
}

const props = defineProps<Props>()

const projectData = ref<GitHubProjectData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    projectData.value = await fetchCompleteProjectData(props.repo, props.fastlanePath)
    loading.value = false
  } catch (e) {
    console.error('Error loading GitHub data:', e)
    error.value = 'Failed to load project data from GitHub'
    loading.value = false
  }
})
</script>

<template>
  <div class="github-project-data">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading project data from GitHub...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="projectData" class="project-info">
      <!-- Feature Graphic -->
      <div v-if="projectData.fastlaneMetadata?.featureGraphic" class="feature-graphic">
        <img 
          :src="projectData.fastlaneMetadata.featureGraphic" 
          :alt="`${projectData.name} feature graphic`"
          loading="lazy"
        />
      </div>

      <!-- Project Stats -->
      <div class="stats-bar">
        <div class="stat">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">{{ projectData.stars }}</span>
          <span class="stat-label">Stars</span>
        </div>
        <div class="stat">
          <span class="stat-icon">🔱</span>
          <span class="stat-value">{{ projectData.forks }}</span>
          <span class="stat-label">Forks</span>
        </div>
        <div class="stat">
          <span class="stat-icon">💻</span>
          <span class="stat-value">{{ projectData.language }}</span>
          <span class="stat-label">Language</span>
        </div>
      </div>

      <!-- Description from Fastlane -->
      <div v-if="projectData.fastlaneMetadata?.description" class="fastlane-description">
        <h3>About</h3>
        <p>{{ projectData.fastlaneMetadata.description }}</p>
      </div>

      <!-- Screenshots from Fastlane -->
      <div v-if="projectData.fastlaneMetadata?.screenshots && projectData.fastlaneMetadata.screenshots.length > 0" class="screenshots">
        <h3>Screenshots</h3>
        <div class="screenshots-grid">
          <img 
            v-for="(screenshot, index) in projectData.fastlaneMetadata.screenshots.slice(0, 6)" 
            :key="index"
            :src="screenshot" 
            :alt="`Screenshot ${index + 1}`"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Topics/Keywords -->
      <div v-if="projectData.topics && projectData.topics.length > 0" class="topics">
        <h4>Topics</h4>
        <div class="topic-tags">
          <span v-for="topic in projectData.topics" :key="topic" class="topic-tag">
            {{ topic }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-project-data {
  margin: 2rem 0;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  padding: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
}

.feature-graphic {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feature-graphic img {
  width: 100%;
  height: auto;
  display: block;
}

.stats-bar {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 2rem 0;
  justify-content: center;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.fastlane-description {
  margin: 2rem 0;
}

.fastlane-description h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.fastlane-description p {
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.screenshots {
  margin: 3rem 0;
}

.screenshots h3 {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.screenshots-grid img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: transform 0.3s ease;
}

.screenshots-grid img:hover {
  transform: scale(1.05);
}

.topics {
  margin: 2rem 0;
}

.topics h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .stats-bar {
    gap: 1rem;
  }
  
  .screenshots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
