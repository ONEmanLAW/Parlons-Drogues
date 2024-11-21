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

    <ChapterText :currentChapterId="1" />

    <Card :chapterId="1" />

   

    <h2>Chapitre 1 - Quiz</h2>
    <Quiz />
    <InteractiveCharacter />
    <GraphComponent />
    <Elena1 />
    <BodyChart />
    <ChapterTransition :currentChapter="1" chapterText="Allez au chapitre 2" />
    
  </div>
  <Footer />
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import ChapterText from '../components/ChapterText.vue';
import Quiz from '../components/Quiz.vue';
import BodyChart from '../components/BodyChart.vue';
import GraphComponent from '../components/GraphComponent.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';
import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';
import Card from '../components/Card.vue';

import Elena1 from '../components/Elena1.vue';


import ChapterTransition from '../components/ChapterTransition.vue';

import introChaptersData from '../data/introChapters.json';


// Récupération des données du chapitre 1
const chapterData = introChaptersData.chapters.find((ch) => ch.id === 1);

const chapter = {
  ...chapterData,
  videoSource: new URL(`../${chapterData.videoSource}`, import.meta.url).href,
  imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
};
</script>

<style scoped src="../styles/Chapter.css"></style>
