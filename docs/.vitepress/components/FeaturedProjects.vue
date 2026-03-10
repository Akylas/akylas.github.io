<script setup lang="ts">
import { projects } from '../data/portfolio'

const featuredProjects = projects.filter(p => p.featured)
</script>

<template>
  <div class="featured-projects">
    <h2 class="section-title">Featured Projects</h2>
    <p class="section-subtitle">Showcasing our latest and most innovative work</p>
    
    <div class="featured-grid">
      <article 
        v-for="project in featuredProjects" 
        :key="project.id"
        class="featured-card"
      >
        <a :href="`/portfolio/${project.id}`" class="featured-link">
          <div class="featured-image">
            <img 
              v-if="project.thumbnail" 
              :src="project.thumbnail" 
              :alt="project.title"
              loading="lazy"
            />
            <div v-else class="placeholder-image">
              <span>{{ project.title.charAt(0) }}</span>
            </div>
            <div class="featured-overlay">
              <span class="view-project">View Project →</span>
            </div>
          </div>
          
          <div class="featured-content">
            <div class="featured-header">
              <h3>{{ project.title }}</h3>
              <span v-if="project.github" class="github-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                Open Source
              </span>
            </div>
            <p class="featured-subtitle">{{ project.subtitle }}</p>
            <p class="featured-description">{{ project.description }}</p>
            
            <div class="featured-tags">
              <span 
                v-for="tag in project.tags?.slice(0, 3)" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.featured-projects {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.featured-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
}

.featured-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(66, 192, 237, 0.25);
  border-color: var(--vp-c-brand-1);
}

.featured-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.featured-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-card:hover .featured-image img {
  transform: scale(1.1);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  font-size: 5rem;
  font-weight: bold;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.featured-card:hover .featured-overlay {
  opacity: 1;
}

.view-project {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.featured-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.featured-content h3 {
  margin: 0;
  font-size: 1.8rem;
  font-family: 'Montserrat', sans-serif;
  color: var(--vp-c-text-1);
}

.github-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.featured-subtitle {
  color: var(--vp-c-brand-1);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.featured-description {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  padding: 0.4rem 0.9rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.featured-card:hover .tag {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .featured-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
