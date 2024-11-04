<template>
  <div>
    <h2>Chapitre 2 - Cartes</h2>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import cardsData from '../data/cardsData.json';

const cards = ref([]);

onMounted(() => {
  cards.value = cardsData.cards;
});
</script>

<style src="../styles/Chapter.css"></style>
