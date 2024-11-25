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

    <div
      v-if="isAudioVisible"
      class="pause-play-button"
      :style="{ top: mousePosition.y + 'px', left: mousePosition.x + 'px' }"
      @click="toggleAudio"
    >
      <img :src="isAudioPaused ? playImage : pauseImage" alt="Play/Pause Button" />
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
  return chapterInfo.value.image ? new URL(chapterInfo.value.image, import.meta.url).href : '';
});
const chapterCharacterName = computed(() => chapterInfo.value.characterName || '');

const audioFile = computed(() => {
  if (chapterInfo.value.audio) {
    return new URL(`../assets/audios/${chapterInfo.value.audio}`, import.meta.url).href;
  }
  return '';
});

const pauseImage = computed(() => new URL('../assets/images/elena.png', import.meta.url).href);
const playImage = computed(() => new URL('../assets/images/raph.png', import.meta.url).href);

const textElement = ref(null);
const chapterContainer = ref(null);
const chapterTitle = ref(null);
const chapterImageEl = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
let audio = null;
let isAudioPaused = ref(true);
const isAudioVisible = ref(false);
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

const startAudio = () => {
  if (audioFile.value && !audio) {
    audio = new Audio(audioFile.value);
    audio.play();
    isAudioPaused.value = false;
  }
};

const stopAudio = () => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    isAudioPaused.value = true;
  }
};

const toggleAudio = () => {
  if (audio) {
    if (isAudioPaused.value) {
      audio.play();
      isAudioPaused.value = false;
    } else {
      audio.pause();
      isAudioPaused.value = true;
    }
  } else {
    startAudio();
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

.chapter-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
  z-index: 10;
}

.chapter-image-container {
  margin-top: 20px;
  text-align: center;
}

.chapter-image {
  max-width: 150px;
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
  line-height: 1.6;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.chapter-1 {
  background-color: #d8ebff;
}

.chapter-1 .chapter-text p {
  color: #1e90ff;
}

.chapter-2 {
  background-color: #d5f4e6;
}

.chapter-2 .chapter-text p {
  color: #2e8b57;
}

.chapter-3 {
  background-color: #f8e3e6;
}

.chapter-3 .chapter-text p {
  color: #ff69b4;
}

.chapter-4 {
  background-color: #ffe3a3;
}

.chapter-4 .chapter-text p {
  color: #ff9100;
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
