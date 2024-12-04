<template>
  <div
    class="chapter-text-container"
    :class="['chapter-' + currentChapterId]"
    ref="chapterContainer"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div ref="chapterTitle" class="chapter-title">
      {{ chapterTitleType }}
    </div>

    <div class="chapter-text" ref="textElement">
      <p>{{ chapterText }}</p>
    </div>

    <div v-if="chapterImage" class="chapter-image-container">
      <img ref="chapterImageEl" :src="chapterImage" alt="Illustration du chapitre" class="chapter-image" />
      
      <p v-if="chapterCharacterName" class="character-name">{{ chapterCharacterName }}</p>
    </div>

    <div v-for="(buttonImage, index) in buttonImages.play" :key="'play-' + index">
      <div
        v-if="currentChapterId === index + 1"
        class="pause-play-button"
        :style="{ top: mousePosition.y + 'px', left: mousePosition.x + 'px' }"
        @click="toggleAudio(index, 'play')"
        v-show="isAudioVisible"
      >
        <img :src="isAudioPaused[index] ? buttonImages.play[index] : buttonImages.pause[index]" alt="Play/Pause Button" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import chapterTextData from '../data/chapterText.json';

gsap.registerPlugin(TextPlugin);

const props = defineProps({
  currentChapterId: {
    type: Number,
    required: true
  }
});

const chapterInfo = computed(() => {
  return chapterTextData.chapters.find(chapter => chapter.id === props.currentChapterId) || {};
});

const chapterText = computed(() => chapterInfo.value.text || '');
const chapterTitleType = computed(() => chapterInfo.value.titleType || '');
const chapterImage = computed(() => {
  return chapterInfo.value.image ? chapterInfo.value.image : '';
});
const chapterCharacterName = computed(() => chapterInfo.value.characterName || '');

const audioFile = computed(() => {
  if (chapterInfo.value.audio) {
    return new URL(`../assets/audios/${chapterInfo.value.audio}`, import.meta.url).href;
  }
  return '';
});

const buttonImages = {
  play: [
    '/images/playElena.png',
    '/images/playRaph.png',
    '/images/playInes.png', 
    '/images/playConclu.png',
  ],
  pause: [
    '/images/pauseElena.png',
    '/images/pauseRaph.png',
    '/images/pauseInes.png',
    '/images/pauseConclu.png',
  ]
};

let audio = null;
const isAudioPaused = ref([true, true, true, true]);
const isAudioVisible = ref(false);
const mousePosition = ref({ x: 0, y: 0 });
const textElement = ref(null);
const chapterContainer = ref(null);
const chapterTitle = ref(null);
const chapterImageEl = ref(null);
let isAnimationComplete = ref(false);

const startAnimation = () => {
  if (textElement.value && !isAnimationComplete.value) {
    gsap.fromTo(
      textElement.value,
      { opacity: 0, visibility: "hidden", y: 20 },
      {
        opacity: 1,
        visibility: "visible",
        y: 0,
        text: chapterText.value,
        duration: 5,
        ease: "none",
        stagger: 0.1,
        onComplete: () => {
          isAnimationComplete.value = true;
        }
      }
    );
  }
};

const startAudio = (index) => {
  if (audioFile.value && !audio) {
    audio = new Audio(audioFile.value);
    audio.play();
    isAudioPaused.value[index] = false;
  }
};

const stopAudio = (index) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    isAudioPaused.value[index] = true;
  }
};

const toggleAudio = (index, type) => {
  if (audio) {
    if (isAudioPaused.value[index]) {
      audio.play();
      isAudioPaused.value[index] = false;
    } else {
      audio.pause();
      audio.currentTime = 0;
      isAudioPaused.value[index] = true;
    }
  } else {
    startAudio(index);
  }
};

const handleMouseMove = (event) => {
  if (chapterContainer.value) {
    const rect = chapterContainer.value.getBoundingClientRect();
    mousePosition.value.x = event.clientX - rect.left;
    mousePosition.value.y = event.clientY - rect.top;
    isAudioVisible.value = true;
  }
};

const handleMouseLeave = () => {
  isAudioVisible.value = false;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          startAnimation();
          animateTitleAndImage();
        }
      });
    },
    { threshold: 0.2 }
  );

  if (chapterContainer.value) {
    observer.observe(chapterContainer.value);
  }
});

onBeforeUnmount(() => {
  stopAudio();
});

watch(() => props.currentChapterId, () => {
  stopAudio();
  isAnimationComplete.value = false;
});

const animateTitleAndImage = () => {
  if (chapterTitle.value) {
    gsap.fromTo(
      chapterTitle.value,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }

  if (chapterImageEl.value) {
    gsap.fromTo(
      chapterImageEl.value,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }
};
</script>

<style scoped>
.chapter-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.chapter-1 {
  background-color:  #E6F5FF;
  color: #3135B7;
}

.chapter-2 {
  background-color: #ECFFF4;
  color: #167540;
}

.chapter-3 {
  background-color: #FFEDF8;
  color:  #AC0266;
}

.chapter-4 {
  background-color: #FF7424;
  color: black;
}

.chapter-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: bold;
}


.chapter-1 .chapter-title {
  background-color: #A4E1FF;
  color: #3135B7;
}

.chapter-2 .chapter-title {
  background-color: #BCFFC8;
  color: #167540;
}

.chapter-3 .chapter-title {
  background-color: #FFC9EA;
  color: #AC0266;
}

.chapter-4 .chapter-title {
  background-color: #FFD6AB;
  color: #FF7424;
}

.chapter-image-container {
  margin-top: 20px;
  text-align: center;
}

.chapter-image {
  max-width: 125px;
  height: auto;
  border-radius: 8px;
}

.character-name {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}

.chapter-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.6;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.chapter-text p {
  margin: 0;
  padding: 0;
}

.pause-play-button {
  position: absolute;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease-in-out;
}

.pause-play-button img {
  width: 40px;
  height: 40px;
}
</style>
