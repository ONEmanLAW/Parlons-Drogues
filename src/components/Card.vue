<template>
  <div class="card" @click="toggleFlip" ref="cardRef">
    <div :class="['card-inner', { flipped }]">
      <div class="card-front">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="card-back">
        <h3>Face Arrière</h3>
        <p>{{ backContent }}</p>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  title: String,
  description: String,
  backContent: String
});

const flipped = ref(false);
const cardRef = ref(null);

const toggleFlip = () => {
  flipped.value = !flipped.value;
  gsap.to(cardRef.value.querySelector('.card-inner'), {
    rotateY: flipped.value ? 180 : 0,
    duration: 0.4,
    ease: "power1.inOut",
  });
};
</script>



<style scoped src="../styles/Card.css"></style>
