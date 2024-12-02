<template>
  <Header />
  <div class="chapter">
    
    <IntroChapters
      :title="chapter.title"
      :subtitle="chapter.subtitle"
      :description="chapter.description"
      :videoSource="chapter.videoSource"
      :imageSource="chapter.imageSource"
      :backgroundImage="chapter.backgroundImage"
      :backgroundColor="chapter.backgroundColor"
    />
    
    <Ines1 />
    <BodyChart />
    <Elena2 :currentChapter="3"/>
    <Card :chapterId="3" />
    <ChapterText :currentChapterId="3" />
    <ChapterTransition :currentChapter="3" chapterText="Allez au advice" />
  </div>
  <!-- <Footer /> -->
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';
import Card from '../components/Card.vue';
import ChapterText from '../components/ChapterText.vue';
import BodyChart from '../components/BodyChart.vue';

import Ines1 from '../components/Ines1.vue';
import Elena2 from '../components/Elena2.vue';

import ChapterTransition from '../components/ChapterTransition.vue';

import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';

// Récupération des données du chapitre 3
const chapterData = introChaptersData.chapters.find(ch => ch.id === 3);
const chapterCards = cardsData.chapters.find(ch => ch.id === 3).cards;


const chapter = {
  ...chapterData,
  videoSource: new URL(`../${chapterData.videoSource}`, import.meta.url).href,
  imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
  backgroundImage: new URL(`../${chapterData.backgroundImage}`, import.meta.url).href,
  cards: chapterCards
};
</script>

<style scoped src="../styles/Chapter.css"></style>
