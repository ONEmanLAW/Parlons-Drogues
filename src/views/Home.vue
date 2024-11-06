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
      <button @click="previousChapter" :disabled="isAtFirstChapter">Previous</button>
      <button @click="nextChapter" :disabled="isAtLastChapter">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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

const getChapterStyle = (index) => {
  const angle = (index - currentIndex.value) * (360 / totalChapters);
  const translateZ = Math.cos(angle * Math.PI / 180) * radius;
  const translateX = Math.sin(angle * Math.PI / 180) * radius;
  const scale = index === currentIndex.value ? 1 : 0.8;

  return {
    transform: `rotateY(${angle}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
    transition: "transform 0.5s ease-in-out",
    zIndex: index === currentIndex.value ? 1 : 0,
  };
};

const nextChapter = () => {
  if (currentIndex.value < totalChapters - 1) {
    currentIndex.value++;
  }
};

const previousChapter = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToChapter = (index) => {
  if (index === currentIndex.value) {
    const chapterPath = `/chapter${index + 1}`;
    router.push(chapterPath);
  }
};

const isClickable = (index) => {
  return index === currentIndex.value;
};

const isAtFirstChapter = computed(() => currentIndex.value === 0);
const isAtLastChapter = computed(() => currentIndex.value === totalChapters - 1);

onMounted(() => {});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  perspective: 1000px;
}

.chapter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
}

.chapter-slide {
  position: absolute;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease, z-index 0.5s ease;
}

.chapter-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.chapter-image.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.chapter-image.clickable {
  opacity: 1;
}

.navigation-buttons {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
}

.chapter-indicators {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #333;
}
</style>
