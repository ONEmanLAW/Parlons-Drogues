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

    
    <Card :chapterId="1" />

    <InteractiveCharacter />
    <GraphComponent />
    <Elena1 />
    <Raph1 />
    <Ines1 />

    <Elena2 :currentChapter="1"/>
    <BodyChart />
    <ChapterText :currentChapterId="1" />
    <ChapterTransition :currentChapter="1" chapterText="Allez au chapitre 2" />
  </div>
  <Footer />
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import ChapterText from '../components/ChapterText.vue';
import BodyChart from '../components/BodyChart.vue';
import GraphComponent from '../components/GraphComponent.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';
import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';
import Card from '../components/Card.vue';
import cardsData from '../data/cardsData.json';

import Elena1 from '../components/Elena1.vue';
import Raph1 from '../components/Raph1.vue';
import Ines1 from '../components/Ines1.vue';

import Elena2 from '../components/Elena2.vue';

import ChapterTransition from '../components/ChapterTransition.vue';

import introChaptersData from '../data/introChapters.json';

const chapterData = introChaptersData.chapters.find((ch) => ch.id === 1);
const chapterCards = cardsData.chapters.find(ch => ch.id === 1)?.cards || []; 

const chapter = {
  ...chapterData,
  videoSource: new URL(`../${chapterData.videoSource}`, import.meta.url).href,
  imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
  backgroundImage: new URL(`../${chapterData.backgroundImage}`, import.meta.url).href,
  cards: chapterCards
};
</script>
