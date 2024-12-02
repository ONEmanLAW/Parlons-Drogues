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

    <Raph1 />
    <InteractiveCharacter />
    <Elena2 :currentChapter="2"/>
    <Card :chapterId="2" />
    <ChapterText :currentChapterId="2" />
    <ChapterTransition :currentChapter="2"/>

  </div>
  <!-- <Footer /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import IntroChapters from '../components/IntroChapters.vue';
import ChapterText from '../components/ChapterText.vue';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';

import ChapterTransition from '../components/ChapterTransition.vue';

import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';

import Elena2 from '../components/Elena2.vue';
import Raph1 from '../components/Raph1.vue';

// Récupération des données du chapitre 2
const chapterData = introChaptersData.chapters.find(ch => ch.id === 2);
const chapterCards = cardsData.chapters.find(ch => ch.id === 2)?.cards || []; 



const chapter = {
  ...chapterData,
  videoSource: new URL(`../${chapterData.videoSource}`, import.meta.url).href,
  imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
  backgroundImage: new URL(`../${chapterData.backgroundImage}`, import.meta.url).href,
  cards: chapterCards
};
</script>

<style scoped src="../styles/Chapter.css"></style>
