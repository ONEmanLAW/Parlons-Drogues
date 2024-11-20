<template>
  <div class="home" :style="backgroundStyle">
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
        :style="getIndicatorStyle(index)"
        :class="{ active: index - 1 === currentIndex }"
      ></span>
    </div>

    <div class="navigation-buttons">
      <button :style="buttonStyle" @click="previousChapter">Previous</button>
      <button :style="buttonStyle" @click="nextChapter">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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





// FULL CSS pour gérer les différents chapitre
const backgroundStyle = computed(() => {
  // Chapitre 1 - 2 - 3
  const backgroundColors = ['#ADD8E6', '#90EE90', '#FFB6C1'];
  const textColors = ['#6FA8DC', '#66C266', '#D87A9C']; 
  const indicatorColors = ['#6FA8DC', '#66C266', '#D87A9C']; 
  return {
    backgroundColor: backgroundColors[currentIndex.value],
    color: textColors[currentIndex.value],
    transition: "background-color 0.5s ease, color 0.5s ease",
  };
});

const buttonStyle = computed(() => {
  const buttonColors = ['#6FA8DC', '#66C266', '#D87A9C']; 
  return {
    backgroundColor: buttonColors[currentIndex.value],
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };
});

const getIndicatorStyle = (index) => {
  const indicatorColors = ['#6FA8DC', '#66C266', '#D87A9C'];
  const indicatorActiveColors = ['#2C6BB7', '#4B8C44', '#9C4178'];

  return {
    backgroundColor: index - 1 === currentIndex.value ? indicatorActiveColors[currentIndex.value] : indicatorColors[currentIndex.value],
    transition: "background-color 0.3s ease",
  };
};






const getChapterStyle = (index) => {
  const position = (index - currentIndex.value + totalChapters) % totalChapters;
  let angle;
  let scale = 1;

  if (position === 0) {
    angle = 0;
    scale = 1.2;
  } else if (position === 1 || position === -totalChapters + 1) {
    angle = 45;
    scale = 0.8;
  } else if (position === -1 || position === totalChapters - 1) {
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

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  perspective: 1000px;
  box-sizing: border-box;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.chapter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 600px;
  height: 600px;
  transform-style: preserve-3d;
  margin-bottom: 20px;
}

.chapter-slide {
  position: absolute;
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.8s ease, z-index 0.8s ease;
}

.chapter-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

.chapter-info {
  position: absolute;
  top: calc(100% + 10px);
  max-width: 400px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter-number {
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}

.chapter-info h2 {
  font-size: 16px;
}

.chapter-info p {
  font-size: 8px;
  color: inherit;
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
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

button {
  padding: 10px 20px;
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
