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

    <ChapterText :currentChapterId="2" />

    <Card :chapterId="2" />

  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import IntroChapters from '../components/IntroChapters.vue';
import ChapterText from '../components/ChapterText.vue';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';

import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';

// Récupération des données du chapitre 2
const chapterData = introChaptersData.chapters.find(ch => ch.id === 2);
const chapterCards = cardsData.chapters.find(ch => ch.id === 2)?.cards || []; 

const videoSource = new URL(`../${chapterData.videoSource}`, import.meta.url).href;
const imageSource = new URL(`../${chapterData.imageSource}`, import.meta.url).href;

const chapter = {
  ...chapterData,
  videoSource,
  imageSource,
  cards: chapterCards
};
</script>

<style scoped src="../styles/Chapter.css"></style>
