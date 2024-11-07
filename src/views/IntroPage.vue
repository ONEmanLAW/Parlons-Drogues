<template>
  <div class="intro">
    <button v-if="!videoStarted" @click="startVideo">Start</button>

    <div v-if="videoStarted">
      <video 
        ref="introVideo"
        :src="videoSource" 
        class="video" 
        @ended="onVideoEnded"
        autoplay
        controls
      >
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
      
      <button @click="skipVideo" class="skip-button">Skip</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const videoSource = new URL('../assets/videos/video2.mp4', import.meta.url).href;

const router = useRouter();


const videoStarted = ref(false);


const startVideo = () => {
  videoStarted.value = true;
};

const onVideoEnded = () => {
  router.push('/home');
};

const skipVideo = () => {
  router.push('/home');
};
</script>

<style scoped>
.intro {
  text-align: center;
  position: relative;
}

.video {
  width: 100%;
  max-width: 800px;
  height: auto;
}

.skip-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
