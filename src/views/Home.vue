<template>
  <div class="home">
    <h1>Bienvenue sur Parlons Drogues</h1>
    <p>Voici des informations importantes.</p>

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

    <div class="interactive-section">
      <InteractiveCharacter />
    </div>

    <div class="quiz-section">
      <Quiz />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';
import Quiz from '../components/Quiz.vue';

import cardsData from '../data/cardsData.json';

const cards = ref([]);

onMounted(() => {
  cards.value = cardsData.cards;
});
</script>

<style src="../styles/Home.css"></style>
