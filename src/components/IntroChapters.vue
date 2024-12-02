<template>
  <div class="intro-chapter">
    <div class="background-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <img :src="imageSource" alt="Chapter Image" class="chapter-image" />
      <div class="text-content">
        <h2>{{ title }}</h2>
        <!-- <h3>{{ subtitle }}</h3>
        <p>{{ description }}</p> -->
      </div>
    </div>

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  position: relative;
}

.chapter-image {
  width: 170px;
  height: auto;
  position: absolute;
  top: 70%;
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
  padding: 0 60px 60px 60px; 
  background-color: var(--chapter-bg-color); 
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
}

.video-wrapper {
  width: 100%;
  height: 100%; 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0; 
  box-sizing: border-box;
}

.full-screen-video {
  width: 100%;
  height: calc(100% - 30px); 
  object-fit: contain;
  display: block;
  outline: none;
  border: none;
  margin: 0; 
  padding: 0;
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
