<template>
  <div :class="['home', `chapter-${currentIndex + 1}`]">
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
          @click="handleImageClick(index)"
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
      <!-- Flèche Précédente -->
      <span
        class="arrow previous"
        :style="{ color: getArrowColor(currentIndex) }"
        @click="previousChapter"
      >
        &#8592;
      </span>
      
      <!-- Flèche Suivante -->
      <span
        class="arrow next"
        :style="{ color: getArrowColor(currentIndex) }"
        @click="nextChapter"
      >
        &#8594;
      </span>
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

const chapterSound = new Audio(new URL('../assets/sounds/sound.wav', import.meta.url).href);

const isAnimating = ref(false);

const getIndicatorStyle = (index) => {
  const indicatorColors = ['#E6F5FF', '#ECFFF4', '#FFEDF8'];
  const indicatorActiveColors = ['#3135B7', '#167540', '#AC0266'];

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

  const translateZ = Math.cos(angle * Math.PI / 180) * 300;
  const translateX = Math.sin(angle * Math.PI / 180) * 300;

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
  const chapterPath = `/chapter${index + 1}`;
  router.push(chapterPath);
  chapterSound.play();
};

const isClickable = (index) => {
  return index === currentIndex.value;
};

const handleImageClick = (index) => {
  if (index === currentIndex.value && !isAnimating.value) {
    isAnimating.value = true;
    const imageElement = document.querySelector(`.chapter-slide:nth-child(${index + 1}) .chapter-image`);
    imageElement.classList.add('clicked');

    setTimeout(() => {
      goToChapter(index); 
      imageElement.classList.remove('clicked'); 
      isAnimating.value = false;
    }, 600);
  }
};

// Nouvelle méthode pour obtenir la couleur des flèches en fonction du chapitre actuel
const getArrowColor = (index) => {
  const arrowColors = ['#3135B7', '#167540', '#AC0266']; // Couleurs pour chaque chapitre
  return arrowColors[index] || '#000'; // Retourne la couleur appropriée ou noir si l'index dépasse
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

.home.chapter-1 {
  background-color: #A4E1FF;
  color:  #3135B7;
}

.home.chapter-2 {
  background-color: #BCFFC8;
  color:  #167540;
}

.home.chapter-3 {
  background-color: #FFC9EA;
  color: #AC0266;
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
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.chapter-image.clicked {
  transform: scale(0.8);
  opacity: 0.5;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.chapter-info {
  position: absolute;
  top: calc(100% + 30px);
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
  gap: 40px;
}

.arrow {
  font-size: 50px;
  cursor: pointer;
  transition: color 0.3s ease;
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
