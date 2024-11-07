<template>
  <div class="home">
    <h1>Bienvenue sur Parlons Drogues</h1>
    <p>Explorez les chapitres avec les boutons suivants :</p>

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
        <h2 v-if="index === currentIndex">{{ chapter.title }}</h2>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import introChaptersData from '../data/introChapters.json';


const router = useRouter();

const chapters = introChaptersData.chapters.map((chapterData) => ({
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
  if (position === 0) {
    angle = 0;
  } else if (position === 1 || position === -totalChapters + 1) {
    angle = 45;
  } else if (position === -1 || position === totalChapters - 1) {
    angle = -45;
  } else {
    return { opacity: 0, pointerEvents: "none" };
  }

  const translateZ = Math.cos(angle * Math.PI / 180) * radius;
  const translateX = Math.sin(angle * Math.PI / 180) * radius;
  const scale = position === 0 ? 1 : 0.8;

  return {
    transform: `rotateY(${angle}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
    transition: "transform 0.5s ease-in-out",
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
