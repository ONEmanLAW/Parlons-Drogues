<template>
  <div class="home">
    <h1>Bienvenue sur Parlons Drogues</h1>
    <p>Voici des informations importantes.</p>

    <!-- Section avec les cartes -->
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

    <!-- Section interactive avec le personnage -->
    <div class="interactive-section">
      <InteractiveCharacter />
    </div>

    <!-- Section du quiz -->
    <div class="quiz-section">
      <Quiz />
    </div>

    <!-- Section du graphique de bulles -->
    <div class="bubble-chart-section">
      <BubbleChart />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';
import Quiz from '../components/Quiz.vue';
import BubbleChart from '../components/BubbleChart.vue';


import cardsData from '../data/cardsData.json';

const cards = ref([]);

onMounted(() => {
  cards.value = cardsData.cards;
});
</script>

<style src="../styles/Home.css"></style>
