<template>
  <div class="intro-chapter">
    <div class="background-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <img :src="imageSource" alt="Chapter Image" class="chapter-image" />
      <h2>{{ title }}</h2>
      <h3>{{ subtitle }}</h3>
      <p>{{ description }}</p>
    </div>

    <!-- Conteneur vidéo avec couleur de fond spécifique -->
    <div class="video-container" :style="{ backgroundColor: chapterBackgroundColor }">
      <div class="video-wrapper">
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
      </div>
    </div>

    <button v-if="videoPlaying" @click="skipVideo" class="skip-button">
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
  imageSource: String,
  backgroundImage: String,
  chapterId: Number,  // ID du chapitre pour récupérer la couleur de fond
  backgroundColor: String,  // Couleur de fond dynamique
});

const videoElement = ref(null);
const videoPlaying = ref(false);
const videoHasPlayed = ref(false);

// Récupérer la couleur de fond depuis la prop
const chapterBackgroundColor = props.backgroundColor;

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

const skipVideo = () => {
  const video = videoElement.value;
  video.pause();
  videoPlaying.value = false;
  document.body.style.overflow = '';
};
</script>

<style scoped>
.intro-chapter {
  text-align: center;
}

.background-container {
  background-size: cover;
  background-position: center;
  height: 100vh; /* L'image de fond occupe toute la hauteur de l'écran */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.chapter-image {
  width: 300px;
  height: auto;
  margin-bottom: 20px;
}

h2, h3, p {
  margin: 10px 0;
}

/* Conteneur vidéo */
.video-container {
  position: relative;
  height: 100vh; /* Le conteneur vidéo occupe toute la hauteur de l'écran */
  padding: 0 60px 60px 60px; /* Pas de padding en haut, mais 30px sur les côtés et en bas */
  background-color: var(--chapter-bg-color); /* Couleur de fond spécifique pour chaque chapitre */
  box-sizing: border-box; /* Le padding ne dépasse pas la taille du conteneur */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligner la vidéo au top du conteneur */
  align-items: center;
}

/* Conteneur interne de la vidéo */
.video-wrapper {
  width: 100%;
  height: 100%; /* La vidéo doit occuper toute la hauteur de son conteneur */
  position: absolute;
  top: 0; /* Coller la vidéo au haut du conteneur */
  left: 0;
  right: 0;
  padding: 0; /* Pas de padding dans ce conteneur */
  box-sizing: border-box;
}

/* Assurez-vous que la vidéo est collée en haut du conteneur */
.full-screen-video {
  width: 100%;
  height: calc(100% - 30px); /* La vidéo occupe toute la hauteur moins 30px (pour le padding en bas) */
  object-fit: contain; /* La vidéo s'adapte sans déformation */
  display: block;
  outline: none;
  border: none;
  margin: 0; /* Aucune marge autour de la vidéo */
  padding: 0; /* Aucune marge interne */
  transition: opacity 0.3s ease;
}

.skip-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  z-index: 10;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.skip-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>







