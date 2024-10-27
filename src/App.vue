<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer /> 
  </div>
</template>

<script setup>
import Header from './components/Header.vue'; 
import Footer from './components/Footer.vue';
</script>

<style>

</style>
