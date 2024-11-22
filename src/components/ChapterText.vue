<template>
  <div
    class="chapter-text-container"
    :class="['chapter-' + currentChapterId]"
    ref="chapterContainer"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="chapter-text" ref="textElement">
      <p>{{ chapterText }}</p>
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
import { ref, computed, onMounted, watch } from 'vue';
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
const mousePosition = ref({ x: 0, y: 0 });
let audio = null;
let isAudioPaused = ref(true);
const isAudioVisible = ref(false);

const startAnimation = () => {
  if (textElement.value) {
    gsap.fromTo(
      textElement.value,
      { opacity: 0, text: '' },
      {
        opacity: 1,
        text: chapterText.value,
        duration: 5, 
        ease: "none", 
        stagger: 0.1,
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
        }
      });
    },
    { threshold: 0.2 }
  );

  if (chapterContainer.value) {
    observer.observe(chapterContainer.value);
  }
});

watch(() => props.currentChapterId, () => {
  stopAudio();
});

</script>

<style scoped>
.chapter-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.chapter-text {
  max-width: 800px;
  width: 100%;
  font-family: Montserrat;
  font-size: 24px;
  line-height: 1.6;
  text-align: center;
  opacity: 0;
}

.chapter-1 {
  background-color: #6fa8dc;
}

.chapter-1 .chapter-text p {
  color: #034c8c;
}

.chapter-2 {
  background-color: #66c266;
}

.chapter-2 .chapter-text p {
  color: #255c25;
}

.chapter-3 {
  background-color: #d87a9c;
}

.chapter-3 .chapter-text p {
  color: #6c1e3a;
}

.chapter-4 {
  background-color: #d6b670;
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
