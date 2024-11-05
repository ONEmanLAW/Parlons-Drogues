<!-- views/Chapter2.vue -->
<template>
  <div class="chapter">
    <IntroChapters
      :title="chapter.title"
      :subtitle="chapter.subtitle"
      :description="chapter.description"
      :videoSource="chapter.videoSource"
      :imageSource="chapter.imageSource"
    />

    <h2>Chapitre 2 - Cartes</h2>
    <div class="card-container">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :description="card.description"
        :backContent="card.backContent"
        :backgroundImage="card.backgroundImage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import IntroChapters from '../components/IntroChapters.vue';
import Card from '../components/Card.vue';
import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';

const chapterData = introChaptersData.chapters.find(ch => ch.id === 2);

const videoSource = new URL(`../${chapterData.videoSource}`, import.meta.url).href;
const imageSource = new URL(`../${chapterData.imageSource}`, import.meta.url).href;

const chapter = {
  ...chapterData,
  videoSource,
  imageSource
};

const cards = ref([]);

onMounted(() => {
  cards.value = cardsData.cards;
});
</script>

<style src="../styles/Chapter.css" scoped></style>
