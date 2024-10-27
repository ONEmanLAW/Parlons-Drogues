<template>
  <div class="home">
    <h1>Bienvenue sur Parlons Drogues</h1>
    <p>Voici des informations importantes.</p>
    
    <!-- Section avec les cartes -->
    <div class="card-container">
      <Card title="Carte 1" description="Description de la carte 1" />
      <Card title="Carte 2" description="Description de la carte 2" />
      <Card title="Carte 3" description="Description de la carte 3" />
    </div>

    <!-- Section avec le composant InteractiveCharacter -->
    <div class="interactive-section">
      <InteractiveCharacter />
    </div>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue';
import InteractiveCharacter from '../components/InteractiveCharacter.vue';
</script>

<style src="../styles/Home.css"></style>
