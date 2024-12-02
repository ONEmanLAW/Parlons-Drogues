<template>
  <div class="chapter-transition" :style="{ backgroundColor: chapterBackgroundColor }">
    <div class="background">
      <img :src="chapterImage" alt="Chapter Image" />
    </div>
    <p class="text">{{ chapterText }}</p>
    
    <!-- Dynamically add class for button color based on current chapter -->
    <button class="next-chapter-button" :class="nextChapterButtonClass" @click="navigateToChapter">
      Aller au chapitre suivant
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import raphImage from '../assets/images/raph.gif';
import inesImage from '../assets/images/ines.gif';
import elenaImage from '../assets/images/conclusion.png';

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
  1: '#ECFFF4',  
  2: '#FFEDF8',
  3: '#FF7424',  
};

// Dynamically determine button color class based on chapter
const chapterButtonClasses = {
  1: 'button-green',  
  2: 'button-pink',    
  3: 'button-orange',  
};

const chapterImage = chapterImages[props.currentChapter];
const chapterBackgroundColor = chapterBackgroundColors[props.currentChapter];
const nextChapterButtonClass = chapterButtonClasses[props.currentChapter];

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
  height: 400px; 
  overflow: hidden;
}

.chapter-transition .background img {
  width: 280px;
  height: auto;
}

.chapter-transition .text {
  font-size: 2rem;  
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

.next-chapter-button {
  padding: 10px 20px;
  background-color: white;
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

/* Define the button text colors based on chapters */
.button-green {
  color: #167540;
}

.button-pink {
  color: #AC0266;
}

.button-orange {
  color: #FF7424;
}
</style>
