<template>
  <div ref="menuPage" class="menu-page">
    <button @click="goBack" class="close-button">X</button>
    <h1>Menu</h1>
    
    <div class="menu-images">
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="menu-image"
        @click="goToChapter(chapter.id)"
      >
        <img :src="getImageSource(chapter.imageSource)" :alt="chapter.title" />
        <p>{{ chapter.title }}</p>
        <p>{{ chapter.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";

// La on récup les images, les titre ect
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
    router.push("/advice");  // Pour la page Conseils
  } else {
    router.push(`/chapter${chapterId}`);  // Pour les chapitres 1, 2, et 3
  }
}


function getImageSource(imagePath) {
  return new URL(`../${imagePath}`, import.meta.url).href;
}
</script>

<style scoped>
.menu-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #167540;
  color: white;
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
  background-color: white;
  color: #167540;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover {
  background-color: #f0f0f0;
}

.menu-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.menu-image {
  text-align: center;
  cursor: pointer;
  width: 150px;
  height: 150px;
}

.menu-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.menu-image p {
  margin-top: 10px;
  font-size: 16px;
  color: white;
  font-weight: bold;
}
</style>
