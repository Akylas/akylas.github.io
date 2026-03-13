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
        src="https://storage.googleapis.com/pe-portal-consumer-prod-wagtail-static/downloads_folder/Google%20Play%20Badge%20guidelines/11nVShEBmHWOUyCHfC_aTrzDZSs06-zEB?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wagtail%40pe-portal-consumer-prod.iam.gserviceaccount.com%2F20260312%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260312T143439Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DGetItOnGooglePlay_Badge_Web_color_English.png&X-Goog-Signature=43a57572831b58546b220f6f535f057b25cfad8564927dec2d08e02b2d27d37e1478027bafb8e80fb6d6a5c40f5b843812fadfe4e4be0ce7424a2ffbb1b203ca00ca2ff2efa889718252b77b7e63d323f8a5fa2848af83f812cb088136da05bf8a258b9f5c9f343be3645682d7f3d78fe61b82d5b5a2b21240c8fa8c9e1ac1cf54d387ec9842a3b8b2c8680bdf435abc0dd69762793c7c47d9b50be4f8887803612e1749e2fa5489b25016b157e3f8793559f41d76017436684803ee37afddb87c780aad4cfdf3c0d18902b430410f4c1ca62dae9a5947b0f560790d36eb8452f3a5ac5b6928534abc5307353943092f78b58140a2edd5df54940e9106eaa92f" 
        alt="Get it on Google Play"
        class="app-store-badge"
      />
    </a>

    <a 
      v-if="githubUrl" 
      :href="githubUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge"
    >
      <img 
        src="https://raw.githubusercontent.com/Akylas/OSS-DocumentScanner/main/badge_github.png" 
        alt="Get it on Github"
        class="app-store-badge"
      />
    </a>

    <a 
      v-if="izzyUrl" 
      :href="izzyUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="store-badge"
    >
      <img 
        src="https://izzyondroid.org/assets/static/IzzyOnDroidButtonGreyBorder_nofont.png" 
        alt="Get it on IzzyOnDroid"
        class="app-store-badge"
      />
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
  border-radius: 0px;
  width: auto;
}

.play-store-badge {
  height: 75px;
  padding: -20px;
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
