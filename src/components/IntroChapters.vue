<template>
  <div class="intro-chapter">
    <img :src="imageSource" alt="Chapter Image" class="chapter-image" />
    <h2>{{ title }}</h2>
    <h3>{{ subtitle }}</h3>
    <p>{{ description }}</p>
    <video v-if="videoSource" :src="videoSource" controls></video>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  videoSource: String,
  imageSource: String
});
</script>

<style scoped src="../styles/IntroChapters.css"></style>