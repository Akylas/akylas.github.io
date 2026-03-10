<script setup lang="ts">
interface Props {
  iosUrl?: string
  androidUrl?: string
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
  display: inline-block;
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

@media (max-width: 768px) {
  .store-badges {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
