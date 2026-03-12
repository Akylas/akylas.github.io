<script setup lang="ts">
import { projects } from '../data/portfolio'

interface Props {
  limit?: number
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 0,
  featured: false
})

const displayedProjects = props.limit > 0 
  ? projects.slice(0, props.limit) 
  : projects
</script>

<template>
  <div class="portfolio-grid">
    <article 
      v-for="project in displayedProjects" 
      :key="project.id"
      class="portfolio-card"
    >
      <a :href="`/portfolio/${project.id}`" class="portfolio-link">
        <div class="portfolio-image">
          <img 
            v-if="project.thumbnail" 
            :src="project.thumbnail" 
            :alt="project.title"
            loading="lazy"
          />
          <div v-else class="placeholder-image">
            <span>{{ project.title.charAt(0) }}</span>
          </div>
        </div>
        
        <div class="portfolio-content">
          <h3>{{ project.title }}</h3>
          <p class="subtitle">{{ project.subtitle }}</p>
          <p class="description">{{ project.description }}</p>
          
          <div class="portfolio-meta">
            <span class="date">{{ project.date }}</span>
            <span class="client">{{ project.client }}</span>
          </div>
          
          <div v-if="project.tags" class="portfolio-tags">
            <span 
              v-for="tag in project.tags" 
              :key="tag"
              class="portfolio-badge"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<style scoped>
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.portfolio-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
  height: 100%;
}

.portfolio-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(66, 192, 237, 0.2);
  border-color: var(--vp-c-brand-1);
}

.portfolio-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.portfolio-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
  transition: transform 0.3s ease;
  padding: 0.5rem;
}

.portfolio-card:hover .portfolio-image img {
  transform: scale(1.05);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  font-size: 4rem;
  font-weight: bold;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.portfolio-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.portfolio-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
}

.subtitle {
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.description {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
}

.portfolio-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.portfolio-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.portfolio-card:hover .portfolio-badge {
  background: var(--vp-c-brand-1);
  color: white;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
