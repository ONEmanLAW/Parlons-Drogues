<template>
  <div ref="menuPage" class="menu-page">
    <button @click="goBack" class="close-button">X</button>
    
    <div class="menu-images">
      <div
        v-for="(chapter, index) in chapters"
        :key="chapter.id"
        class="menu-image"
        @click="goToChapter(chapter.id)"
      >
        <img :src="getImageSource(chapter.imageSource)" :alt="chapter.title" />
        <p :style="getTextColor(index)">{{ chapter.title }}</p>
        <p :style="getTextColor(index)">{{ chapter.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";

import chaptersData from "../data/introChapters.json";

const menuPage = ref(null);
const router = useRouter();

const chapters = ref([]);

onMounted(() => {
  gsap.fromTo(
    menuPage.value,
    { y: "-100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
  );
  
  chapters.value = chaptersData.chapters;
});


function goBack() {
  gsap.to(menuPage.value, {
    y: "-100%",
    opacity: 0,
    duration: 0.6,
    ease: "power3.in",
    onComplete: () => {
      router.back();
    },
  });
}


function goToChapter(chapterId) {
  if (chapterId === 4) {
    router.push("/advice"); 
  } else {
    router.push(`/chapter${chapterId}`); 
  }
}


function getImageSource(imagePath) {
  return new URL(`../${imagePath}`, import.meta.url).href;
}

// Function to return color for each chapter title based on index
function getTextColor(index) {
  const colors = ["blue", "green", "#AC0266", "orange"];
  return { color: colors[index] || "black" }; // Default to black if out of range
}
</script>

<style scoped>
.menu-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover {
  background-color: gray;
}

.menu-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.menu-image {
  text-align: center;
  cursor: pointer;
  width: 250px;
  height: 250px;
}

.menu-image img {
  width: 72%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.menu-image p {
  margin-top: 10px;
  font-size: 24px;
  color: black;
  font-weight: bold;
}
</style>
