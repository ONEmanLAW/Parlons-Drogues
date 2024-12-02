<template>
  <Header />
  <div>

    <ChapterText :currentChapterId="4" />
    <AideComponent @retour="handleRetour" />
    
  </div>
  <Footer />
</template>



<script setup>
  
  import Header from '../components/Header.vue'; 
  import Footer from '../components/Footer.vue';
  import ChapterText from '../components/ChapterText.vue';
  import AideComponent from '../components/AideComponent.vue';
  
</script>



<style scoped src="../styles/Chapter.css"></style>
