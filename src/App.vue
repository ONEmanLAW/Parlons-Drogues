<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push('/');

  const clickSound = new Audio('/assets/sounds/clicksound.mp3');

  const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  window.addEventListener('click', playClickSound);

  onBeforeUnmount(() => {
    window.removeEventListener('click', playClickSound);
  });
});
</script>

<style>

</style>
