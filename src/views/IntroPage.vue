<template>
  <div class="intro">
    <h1 class="intro-title">Bienvenue sur notre vidéo d'introduction</h1>
    
    <button v-if="!videoStarted" @click="startVideo" class="start-button">Start</button>

    <div v-if="videoStarted" ref="videoContainer" class="video-container">
      <video 
        ref="introVideo"
        :src="videoSource" 
        class="video-fullscreen" 
        @ended="onVideoEnded"
        autoplay
      >
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
      
      <button @click="skipVideo" class="skip-button">Skip</button>
    </div>
  </div>
</template>



<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';

// Video de début
const videoSource = new URL('../assets/videos/video2.mp4', import.meta.url).href;
const router = useRouter();
const videoStarted = ref(false);

const startVideo = async () => {
  videoStarted.value = true;
  await nextTick();
  gsap.fromTo(
    videoContainer.value, 
    { x: '100vw', opacity: 0 },
    { x: '0', opacity: 1, duration: 1 } 
  );
};

const videoContainer = ref(null);

const onVideoEnded = () => {
  animateAndRedirect();
};

const skipVideo = () => {
  animateAndRedirect();
};

const animateAndRedirect = () => {
  gsap.to(videoContainer.value, {
    x: '-100vw', 
    opacity: 0,
    duration: 1,
    onComplete: () => {
      router.push('/home'); 
    }
  });
};
</script>



<style scoped src="../styles/IntroPage.css"></style>