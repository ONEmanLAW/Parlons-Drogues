<template>
  <div class="intro">
    <button v-if="!videoStarted" @click="startVideo">Start</button>

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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';


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

<style scoped>

.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
}


button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}


.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.video-fullscreen {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}


.skip-button {
  position: absolute;
  bottom: 50px; 
  left: 30px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  z-index: 10;
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}

.skip-button::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 1s ease;
}

.skip-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
