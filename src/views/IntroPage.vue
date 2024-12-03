<template>
  <div class="logo-container">
    <!-- Logo en haut à gauche -->
    <img src="../assets/images/logo-noir.png" alt="Logo" class="logo" />
  </div>

  <div class="intro-page">
    <!-- Contenu texte et image avant la vidéo -->
    <div class="text-and-image" v-if="!videoStarted">
      <!-- Texte à gauche -->
      <div class="text-container">
        <h1 class="intro-title">Les Dangers du Cannabis</h1>
        <p>
          Découvre les vrais impacts du cannabis sur ta santé, ton avenir et tes choix.
          S'informer, c'est se protéger.
        </p>
        <button @click="startVideo" class="start-button">Découvrir</button>
      </div>

      <!-- Image à droite -->
      <div class="image-container">
        <img src="../assets/images/persosaccueil.gif" alt="Dangers du Cannabis" />
      </div>
    </div>

    <!-- Vidéo en plein écran -->
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

// Vidéo de début
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
/* Page principale */
.intro-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
  flex-wrap: wrap;
}

/* Conteneur texte + image (avant la vidéo) */
.text-and-image {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}

/* Conteneur texte */
.text-container {
  flex: 0 0 40%; /* 40% pour le texte */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  text-align: left;
  z-index: 10;
}

/* Titre */
.intro-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 800;
}

/* Paragraphe */
.text-container p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

/* Bouton "Découvrir" */
.start-button {
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 15px;
  font-size: 25px;
  padding: 15px 30px;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
  width: 220px;
  align-self: center;
}

.start-button:hover {
  background-color: black;
  color: white;
  transform: scale(1.05);
}



/* Image à droite */
.image-container {
  flex: 0 0 60%; /* 60% pour l'image */
  height: 100%; /* Prend toute la hauteur */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-container img {
  width: 100%; /* Prend toute la largeur disponible */
  height: 100%; /* Prend toute la hauteur disponible */
  object-fit: contain; /* Contient l'image sans la découper */
  object-position: center; /* Centrer l'image pour éviter la perte de visibilité */
  position: absolute;
}

/* Logo en haut à gauche */
.logo-container {
  position: absolute;
  top: 10px; /* Espacement depuis le haut de la page */
  left: 10px; /* Espacement depuis la gauche */
  z-index: 100; /* Assurer que le logo soit au-dessus des autres éléments */
}

.logo {
  width: 150px; /* Ajuster la taille du logo selon vos besoins */
  height: auto;
}

/* Vidéo plein écran */
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
  object-fit: cover; /* Remplir tout l'écran */
}

/* Bouton Skip */
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

/* Media Query pour les petits écrans (responsive) */
@media (max-width: 768px) {
  /* Sur les petits écrans, les éléments sont empilés verticalement */
  .text-and-image {
    flex-direction: column;
  }

  /* Ajuster la taille du texte et de l'image */
  .text-container {
    flex: 0 0 40%; /* 40% pour le texte */
    height: 40vh; /* Texte prend 40% de la hauteur */
    padding: 20px;
    justify-content: center;
    text-align: center;
  }

  .image-container {
    flex: 0 0 60%; /* 60% pour l'image */
    height: 60vh; /* Image prend 60% de la hauteur */
  }

  /* Centrer l'image et ne pas la zoomer */
  .image-container img {
    object-fit: contain; /* Assurer que l'image est contenue sans être coupée */
    width: 100%;
    height: 100%;
  }

  /* Bouton "Découvrir" : ajustement de taille pour les petits écrans */
  .start-button {
    font-size: 18px;
    padding: 12px 24px;
    width: 180px;
  }
}
</style>
