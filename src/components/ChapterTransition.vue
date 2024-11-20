<template>
  <div class="chapter-transition" :style="{ backgroundColor: chapterBackgroundColor }">
    <div class="background">
      <img :src="chapterImage" alt="Chapter Image" />
    </div>
    <p class="text">{{ chapterText }}</p>
    
    <button class="next-chapter-button" @click="navigateToChapter">Aller au chapitre suivant</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


import raphImage from '../assets/images/raph.png';
import inesImage from '../assets/images/ines.png';
import elenaImage from '../assets/images/elena.png';

const props = defineProps({
  currentChapter: {
    type: Number,
    required: true,
  },
  chapterText: {
    type: String,
    required: true,
  },
});

const router = useRouter();


const chapterImages = {
  1: raphImage,   
  2: inesImage,   
  3: elenaImage, 
};


const chapterBackgroundColors = {
  1: 'green',  
  2: 'pink',
  3: 'orange',  
};


const chapterImage = chapterImages[props.currentChapter];


const chapterBackgroundColor = chapterBackgroundColors[props.currentChapter];


const navigateToChapter = () => {
  const nextChapter = props.currentChapter + 1;
  if (nextChapter <= 3) {
    router.push(`/chapter${nextChapter}`).then(() => {
      window.scrollTo(0, 0);
    });
  } else {
    router.push('/advice').then(() => {
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped>
.chapter-transition {
  position: relative;
  width: 100%;
  height: 100vh; 
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
}

.chapter-transition .background {
  width: 100%;
  height: 300px; 
  overflow: hidden;
}

.chapter-transition .background img {
  width: 300px;
  height: auto;
}

.chapter-transition .text {
  font-size: 2rem;  
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

/* Style pour le bouton */
.next-chapter-button {
  padding: 10px 20px;
  background-color: white;
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-chapter-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
