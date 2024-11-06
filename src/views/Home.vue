<template>
  <div class="home">
    <h1>Bienvenue sur Parlons Drogues</h1>
    <p>Découvrez des informations importantes et explorez différents chapitres pour en savoir plus sur le sujet.</p>

    <!-- Conteneur pour le défilement horizontal -->
    <div class="horizontal-scroll" ref="scrollContainer">
      <div
        class="chapter-slide"
        v-for="(chapter, index) in chapters"
        :key="index"
      >
        <!-- Utilisation de router-link pour naviguer vers les vues -->
        <router-link :to="`/chapter${index + 1}`">
          <img :src="chapter.imageSource" :alt="chapter.title" class="chapter-image" />
        </router-link>
        <h2>{{ chapter.title }}</h2>
        <p>{{ chapter.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import introChaptersData from '../data/introChapters.json';

const scrollContainer = ref(null);
const chapters = ref([]);

// Convertir les chemins d'images et vidéos en URLs absolues lors de l'initialisation
onMounted(() => {
  chapters.value = introChaptersData.chapters.map((chapterData) => ({
    ...chapterData,
    imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
    videoSource: new URL(`../${chapterData.videoSource}`, import.meta.url).href
  }));

  let lastScrollTop = 0;
  const container = scrollContainer.value;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollAmount = scrollTop - lastScrollTop;

    if (scrollAmount > 0) {
      container.scrollLeft += 50;
    } else if (scrollAmount < 0) {
      container.scrollLeft -= 50;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
</script>

<style scoped src="../styles/Home.css"></style>
