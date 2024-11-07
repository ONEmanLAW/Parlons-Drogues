<!-- views/Chapter1.vue -->
<template>
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
  </div>
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import Quiz from '../components/Quiz.vue';
import introChaptersData from '../data/introChapters.json';


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
