<script setup lang="ts">
interface Props {
  iosUrl?: string
  androidUrl?: string
  githubUrl?: string
  fdroidUrl?: string
  izzyUrl?: string
}

defineProps<Props>()
</script>

<template>
  <div class="store-badges">
    <a 
      v-if="iosUrl" 
      :href="iosUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge"
    >
      <img 
        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1623024000" 
        alt="Download on the App Store"
        class="app-store-badge"
      />
    </a>
    
    <a 
      v-if="androidUrl" 
      :href="androidUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge"
    >
      <img 
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
        alt="Get it on Google Play"
        class="play-store-badge"
      />
    </a>

    <a 
      v-if="githubUrl" 
      :href="githubUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge github-badge"
    >
      <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      <span>GitHub Releases</span>
    </a>

    <a 
      v-if="fdroidUrl" 
      :href="fdroidUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge fdroid-badge"
    >
      <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.707 0l-8.5 8.5 1.293 1.293L6.414 7.88v8.535c0 3.76 3.055 6.815 6.814 6.815h.814v-2.035h-.814c-2.653 0-4.78-2.127-4.78-4.78V7.88l1.914 1.914 1.293-1.293L11.707 0zM13.228 8.268v2.034h.814c2.653 0 4.779 2.127 4.779 4.78v8.033l-1.914-1.914-1.293 1.293 8.5-8.5-1.293-1.293-1.914 1.914v-6.519c0-3.76-3.055-6.815-6.814-6.815h-.814z"/>
      </svg>
      <span>F-Droid</span>
    </a>

    <a 
      v-if="izzyUrl" 
      :href="izzyUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge izzy-badge"
    >
      <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.707 0l-8.5 8.5 1.293 1.293L6.414 7.88v8.535c0 3.76 3.055 6.815 6.814 6.815h.814v-2.035h-.814c-2.653 0-4.78-2.127-4.78-4.78V7.88l1.914 1.914 1.293-1.293L11.707 0zM13.228 8.268v2.034h.814c2.653 0 4.779 2.127 4.779 4.78v8.033l-1.914-1.914-1.293 1.293 8.5-8.5-1.293-1.293-1.914 1.914v-6.519c0-3.76-3.055-6.815-6.814-6.815h-.814z"/>
      </svg>
      <span>IzzyOnDroid</span>
    </a>
  </div>
</template>

<style scoped>
.store-badges {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  align-items: center;
}

.store-badge {
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.store-badge:hover {
  transform: translateY(-2px);
}

.app-store-badge {
  height: 50px;
  width: auto;
}

.play-store-badge {
  height: 75px;
  width: auto;
}

/* Custom badges (GitHub, F-Droid, IzzyOnDroid) */
.github-badge,
.fdroid-badge,
.izzy-badge {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  gap: 0.5rem;
  border: 2px solid;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.badge-icon {
  width: 24px;
  height: 24px;
}

.github-badge {
  background-color: #24292e;
  color: white;
  border-color: #24292e;
}

.github-badge:hover {
  background-color: #2f363d;
  border-color: #2f363d;
}

.fdroid-badge {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.fdroid-badge:hover {
  background-color: #1565c0;
  border-color: #1565c0;
}

.izzy-badge {
  background-color: #00897b;
  color: white;
  border-color: #00897b;
}

.izzy-badge:hover {
  background-color: #00796b;
  border-color: #00796b;
}

@media (max-width: 768px) {
  .store-badges {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
