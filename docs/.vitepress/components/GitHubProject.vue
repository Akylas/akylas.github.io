<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Star, GitFork, Code2, Calendar } from 'lucide-vue-next'
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
          <Star class="stat-icon" :size="24" />
          <span class="stat-value">{{ projectData.stars }}</span>
          <span class="stat-label">Stars</span>
        </div>
        <div class="stat">
          <GitFork class="stat-icon" :size="24" />
          <span class="stat-value">{{ projectData.forks }}</span>
          <span class="stat-label">Forks</span>
        </div>
        <div class="stat">
          <Code2 class="stat-icon" :size="24" />
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-graphic:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(66, 192, 237, 0.3);
}

.feature-graphic img {
  width: 100%;
  height: auto;
  display: block;
}

.stats-bar {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(66, 192, 237, 0.1), rgba(22, 175, 230, 0.05));
  border-radius: 16px;
  margin: 2rem 0;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid rgba(66, 192, 237, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.stat:hover {
  transform: scale(1.1);
}

.stat-icon {
  color: var(--vp-c-brand-1);
  transition: transform 0.3s ease;
}

.stat:hover .stat-icon {
  transform: rotate(15deg);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.fastlane-description {
  margin: 2rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.fastlane-description h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fastlane-description p {
  line-height: 1.8;
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
}

.screenshots {
  margin: 3rem 0;
}

.screenshots h3 {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-size: 1.8rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.screenshots-grid img:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 8px 32px rgba(66, 192, 237, 0.3);
}

.topics {
  margin: 2rem 0;
}

.topics h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-size: 1.3rem;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.topic-tag {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, rgba(66, 192, 237, 0.15), rgba(22, 175, 230, 0.1));
  color: var(--vp-c-brand-1);
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(66, 192, 237, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.topic-tag:hover {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 192, 237, 0.4);
}

@media (max-width: 768px) {
  .stats-bar {
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .screenshots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
