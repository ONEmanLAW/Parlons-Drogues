<template>
  <div class="intro-chapter">
    <div class="background-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <img :src="imageSource" alt="Chapter Image" class="chapter-image" />
      <div class="text-content">
        <h2>{{ title }}</h2>
      </div>
    </div>

    <div class="video-container" :style="{ backgroundColor: chapterBackgroundColor }">
      <div class="video-wrapper">
        <video
          v-if="videoSource"
          :src="videoSource"
          ref="videoElement"
          class="full-screen-video"
          :class="{ blurred: !videoPlaying && videoHasPlayed }"
          @play="onPlay"
          @pause="onPause"
          @ended="onVideoEnded"
          @canplay="onCanPlay"
        ></video>
        <div 
          v-if="!videoPlaying && videoHasPlayed"
          class="restart-icon"
          @click="restartVideo"
        >
          🔄
        </div>
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
  chapterId: Number,
  backgroundColor: String,  
});

const videoElement = ref(null);
const videoPlaying = ref(false);
const videoHasPlayed = ref(false);

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
  videoPlaying.value = true;
};

const onPause = () => {
  document.body.style.overflow = '';
  videoPlaying.value = false;
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

const restartVideo = () => {
  const video = videoElement.value;
  video.currentTime = 0; // Rewind the video to the beginning
  video.play(); // Start the video
  videoPlaying.value = true;
  scrollToVideo(); // Center the camera on the video
};
</script>

<style scoped>
.intro-chapter {
  text-align: center;
  overflow: hidden; /* Empêche le débordement horizontal */
}

.background-container {
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw; /* S'assure que le conteneur remplit toute la largeur */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  position: relative;
}

.chapter-image {
  width: 90px;
  height: auto;
  position: absolute;
  top: 71%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-content {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}

h2, h3, p {
  margin: 25px;
  color: white;
}

.video-container {
  position: relative;
  height: 100vh;
  width: 100vw; /* S'assure que la vidéo prend toute la largeur */
  padding: 0;
  background-color: var(--chapter-bg-color);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.full-screen-video {
  width: 100vw; /* Utilise 100vw pour éviter les débordements */
  height: 100vh;
  object-fit: cover;
  display: block;
  outline: none;
  border: none;
  transition: opacity 0.3s ease;
}

.full-screen-video.blurred {
  filter: blur(10px);
  transition: filter 0.5s ease;
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

.restart-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: white;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 20px;
}

.restart-icon:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
