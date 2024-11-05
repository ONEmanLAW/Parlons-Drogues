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

<style scoped>
.intro-chapter {
  text-align: center;
  padding: 20px;
}
.icon img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
h2 {
  font-size: 24px;
  font-weight: bold;
}
h3 {
  font-size: 20px;
  font-weight: semi-bold;
  margin-bottom: 10px;
}
p {
  font-size: 16px;
  color: #666;
}
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
}
video {
  width: 100%;
  border-radius: 8px;
  outline: none;
}
</style>
