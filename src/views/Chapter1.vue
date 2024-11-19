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

    <h2>Chapitre 1 - Quiz</h2>
    <Quiz />
    <InteractiveCharacter />
    <GraphComponent />
    <BodyChart />
  </div>
  <Footer />
</template>

<script setup>
import IntroChapters from '../components/IntroChapters.vue';
import Quiz from '../components/Quiz.vue';
import BodyChart from '../components/BodyChart.vue';
import introChaptersData from '../data/introChapters.json';
import cardsData from '../data/cardsData.json';  // Importation des cartes

import GraphComponent from '../components/GraphComponent.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';

import Header from '../components/Header.vue'; 
import Footer from '../components/Footer.vue';

import Card from '../components/Card.vue';

// Récupération des données du chapitre 1
const chapterData = introChaptersData.chapters.find(ch => ch.id === 1);
const chapterCards = cardsData.chapters.find(ch => ch.id === 1).cards;  // Cartes du chapitre 1

const videoSource = new URL(`../${chapterData.videoSource}`, import.meta.url).href;
const imageSource = new URL(`../${chapterData.imageSource}`, import.meta.url).href;

const chapter = {
  ...chapterData,
  videoSource,
  imageSource,
  cards: chapterCards  // Ajout des cartes du chapitre
};
</script>

<style scoped src="../styles/Chapter.css"></style>
