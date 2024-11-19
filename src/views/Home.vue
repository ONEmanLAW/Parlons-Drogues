<template>
  <div class="home">
    <div class="chapter-container">
      <div
        v-for="(chapter, index) in chapters"
        :key="index"
        class="chapter-slide"
        :style="getChapterStyle(index)"
      >
        <img
          :src="chapter.imageSource"
          :alt="chapter.title"
          class="chapter-image"
          @click="goToChapter(index)"
          :class="{ clickable: isClickable(index), disabled: !isClickable(index) }"
        />

        <div v-if="index === currentIndex" class="chapter-info">
          <h3 class="chapter-number">&#183; Chapitre {{ index + 1 }} &#183;</h3>
          <h2>{{ chapter.title }}</h2>
          <p>{{ chapter.description }}</p>
        </div>
      </div>
    </div>

    <div class="chapter-indicators">
      <span
        v-for="index in totalChapters"
        :key="index"
        class="indicator"
        :class="{ active: index - 1 === currentIndex }"
      ></span>
    </div>

    <div class="navigation-buttons">
      <button @click="previousChapter">Previous</button>
      <button @click="nextChapter">Next</button>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import homeChaptersData from '../data/homeChapters.json';

const router = useRouter();

const chapters = homeChaptersData.chapters.map((chapterData) => ({
  ...chapterData,
  imageSource: new URL(`../${chapterData.imageSource}`, import.meta.url).href,
}));

const currentIndex = ref(0);
const totalChapters = chapters.length;
const radius = 300;

const chapterSound = new Audio(new URL('../assets/sounds/sound.wav', import.meta.url).href);

const getChapterStyle = (index) => {
  const position = (index - currentIndex.value + totalChapters) % totalChapters;
  let angle;
  let scale = 1;

  if (position === 0) {
    // Immage au centre
    angle = 0;
    scale = 1.2;
  } else if (position === 1 || position === -totalChapters + 1) {
    // Image a droite
    angle = 45;
    scale = 0.8;
  } else if (position === -1 || position === totalChapters - 1) {
    // Image a gauche
    angle = -45;
    scale = 0.8;
  } else {
    angle = 90;
    
  }

  const translateZ = Math.cos(angle * Math.PI / 180) * radius;
  const translateX = Math.sin(angle * Math.PI / 180) * radius;

  return {
    transform: `rotateY(${angle}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
    transition: "transform 0.8s ease-in-out",
    zIndex: position === 0 ? 1 : 0,
    opacity: 1,
  };
};

const nextChapter = () => {
  currentIndex.value = (currentIndex.value + 1) % totalChapters;
  chapterSound.play();
};

const previousChapter = () => {
  currentIndex.value = (currentIndex.value - 1 + totalChapters) % totalChapters;
  chapterSound.play();
};

const goToChapter = (index) => {
  if (index === currentIndex.value) {
    const chapterPath = `/chapter${index + 1}`;
    router.push(chapterPath);
    chapterSound.play();
  }
};

const isClickable = (index) => {
  return index === currentIndex.value;
};
</script>



<style scoped src="../styles/Home.css"></style>