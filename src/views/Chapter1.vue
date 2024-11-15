<!-- views/Chapter1.vue -->
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

    <h2>Chapitre 1 - Quiz</h2>
    <Quiz />
    <BodyChart />
  </div>
  <Footer />
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import Quiz from '../components/Quiz.vue';
import BodyChart from '../components/BodyChart.vue';
import introChaptersData from '../data/introChapters.json';

import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';


const chapterData = introChaptersData.chapters.find(ch => ch.id === 1);


const videoSource = new URL(`../${chapterData.videoSource}`, import.meta.url).href;
const imageSource = new URL(`../${chapterData.imageSource}`, import.meta.url).href;

const chapter = {
  ...chapterData,
  videoSource,
  imageSource
};
</script>

<style scoped src="../styles/Chapter.css"></style>
