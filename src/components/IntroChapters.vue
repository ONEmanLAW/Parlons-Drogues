<template>
  <div class="intro-chapter">
    <img :src="imageSource" alt="Chapter Image" class="chapter-image" />
    <h2>{{ title }}</h2>
    <h3>{{ subtitle }}</h3>
    <p>{{ description }}</p>

    <video
      v-if="videoSource"
      :src="videoSource"
      ref="videoElement"
      class="full-screen-video"
      @play="onPlay"
      @pause="onPause"
      @ended="onVideoEnded"
      @canplay="onCanPlay"
    ></video>

    <button
      v-if="videoPlaying"
      @click="skipVideo"
      class="skip-button"
    >
      Skip
    </button>
  </div>
</template>



<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  videoSource: String,
  imageSource: String
});

const videoElement = ref(null);
const videoPlaying = ref(false); 
const videoHasPlayed = ref(false);

const scrollToVideo = () => {
  const video = videoElement.value;
  const videoPosition = video.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = videoPosition - (window.innerHeight / 2) + (video.clientHeight / 2);

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};


onMounted(() => {
  const video = videoElement.value;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !videoHasPlayed.value) {
        const percentageVisible = entry.intersectionRatio * 100;

        // 75% pour lancer la vidéo
        if (percentageVisible >= 75) {
          video.play();
          videoHasPlayed.value = true; 
          videoPlaying.value = true;
        }

        if (percentageVisible >= 75) {
          scrollToVideo();
        }
      }
    });
  }, { threshold: 0.75 });

  observer.observe(video);
});

const onPlay = () => {
  document.body.style.overflow = 'hidden';
};

const onPause = () => {
  document.body.style.overflow = '';
};

const onVideoEnded = () => {
  document.body.style.overflow = ''; 
  videoPlaying.value = false;
};

const onCanPlay = () => {
  
};

const skipVideo = () => {
  const video = videoElement.value;
  video.pause();
  videoPlaying.value = false;
  document.body.style.overflow = ''; 
};
</script>



<style scoped src="../styles/IntroChapters.css"></style>

