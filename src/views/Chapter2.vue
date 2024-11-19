<template>
  <Header />
  <div class="chapter">
    <IntroChapters
      :title="chapter.title"
      :subtitle="chapter.subtitle"
      :description="chapter.description"
      :videoSource="chapter.videoSource"
      :imageSource="chapter.imageSource"
    />

    <!-- Affichage des cartes pour ce chapitre -->
    <div class="card-container">
      <Card
        v-for="(card, index) in chapter.cards"
        :key="index"
        :title="card.title"
        :description="card.description"
        :backDescription="card.backDescription"
        :icon="card.icon"
        :donutPercentage="card.donutPercentage"
        :centerText="card.centerText"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import IntroChapters from '../components/IntroChapters.vue';
import Card from '../components/Card.vue';
import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';  // Importation des cartes

import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';

// Récupération des données du chapitre 2
const chapterData = introChaptersData.chapters.find(ch => ch.id === 2);

// Vérification si les cartes du chapitre 2 existent
const chapterCards = cardsData.chapters.find(ch => ch.id === 2)?.cards || [];  // S'assurer que les cartes existent

const videoSource = new URL(`../${chapterData.videoSource}`, import.meta.url).href;
const imageSource = new URL(`../${chapterData.imageSource}`, import.meta.url).href;

const chapter = {
  ...chapterData,
  videoSource,
  imageSource,
  cards: chapterCards  // Ajout des cartes du chapitre 2
};
</script>

<style scoped src="../styles/Chapter.css"></style>
