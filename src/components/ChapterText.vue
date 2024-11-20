<template>
  <div
    class="chapter-text-container"
    :class="['chapter-' + currentChapterId]"
  >
    <div class="chapter-text" ref="textElement">
      <p>{{ chapterText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const textElement = ref(null);

const startAnimation = () => {
  if (textElement.value) {
    gsap.fromTo(
      textElement.value,
      { opacity: 0, text: '' },
      {
        opacity: 1,
        text: chapterText.value,
        duration: 3,
        ease: 'power4.out',
        stagger: 0.1,
      }
    );
  }
};


onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          startAnimation();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.6 }
  );

  if (textElement.value) {
    observer.observe(textElement.value);
  }
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
  transition: background-color 0.5s ease;
}

.chapter-text {
  max-width: 800px;
  width: 100%;
  font-family: Arial, sans-serif;
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

</style>