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

    <div class="cards-container">
      <Card
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :description="card.description"
        :backContent="card.backContent"
        :icon="card.icon"
        :backDescription="card.backDescription"
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
import cardsData from '../data/cardsData.json';

import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';

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



<style scoped src="../styles/Chapter.css"></style>
