<template>
  <div class="logo-container">
    <img src="../assets/images/logo-noir.png" alt="Logo" class="logo" />
  </div>

  <div class="intro-page">
    <div class="text-and-image" v-if="!videoStarted">
      <div class="text-container">
        <h1 class="intro-title">Les Dangers du Cannabis</h1>
        <p>
          Découvre les vrais impacts du cannabis sur ta santé, ton avenir et tes choix.
          S'informer, c'est se protéger.
        </p>
        <button @click="startVideo" class="start-button">Découvrir</button>
      </div>

      <div class="image-container">
        <img src="../assets/images/persosaccueil.gif" alt="Dangers du Cannabis" />
      </div>
    </div>

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

const videoSource = new URL('../assets/videos/intro.mp4', import.meta.url).href;
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
.intro-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
  flex-wrap: wrap;
}

.text-and-image {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}

.text-container {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  text-align: left;
  z-index: 10;
  align-items: flex-start;
}

.intro-title {
  font-size: 48px;
  font-weight: 700;
  color: black;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 800;
  max-width: 400px;
}

.text-container p {
  font-size: 24px;
  color: black;
  font-weight: 500;
  max-width: 550px;
}

.start-button {
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 8px;
  font-size: 24px;
  padding: 8px;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
  width: 170px;
  align-self: flex-start;
  margin-bottom: 8px;
}

.start-button:hover {
  background-color: black;
  color: white;
  transform: scale(1.05);
}

.image-container {
  flex: 0 0 60%;
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%; 
  object-fit: contain; 
  object-position: center;
  position: absolute;
}

.logo-container {
  position: absolute;
  top: 10px; 
  left: 10px; 
  z-index: 100; 
}

.logo {
  width: 150px;
  height: auto;
}

.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 12px 24px;
  background: #333;
  color: #fff; 
  border: 1px solid #555; 
  cursor: pointer;
  font-size: 16px;
  font-weight: 500; 
  border-radius: 6px;
  z-index: 10;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.skip-button::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #fff; 
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.4s ease-out;
}

.skip-button:hover {
  background: #444;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.skip-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.skip-button:active {
  background: #222;
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .text-and-image {
    flex-direction: column;
  }

  .text-container {
    flex: 0 0 40%;
    height: 40vh; 
    padding: 20px;
    justify-content: center;
    text-align: center;
  }

  .image-container {
    flex: 0 0 60%;
    height: 60vh;
  }

  .image-container img {
    object-fit: contain; 
    width: 100%;
    height: 100%;
  }

  .start-button {
    font-size: 18px;
    padding: 12px 24px;
    width: 180px;
  }

  .video-fullscreen {
    width: 100%;
    height: auto;
  }

  .video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
} 
</style>