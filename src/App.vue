<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


onMounted(() => {
  router.push('/home');
});
</script>

<style>
</style>
