<template>
  <header>
    <img src="../assets/images/logo-noir.png" alt="Logo" class="logo" />
    <router-link to="/menu" class="menu-button" @click="toggleMenu">
      <div :class="['bar', { 'open': menuOpen }]"></div>
      <div :class="['bar', { 'open': menuOpen }]"></div>
      <div :class="['bar', { 'open': menuOpen }]"></div>
    </router-link>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  z-index: 10;
}

.menu-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30px;
  height: 24px;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
}

.bar {
  width: 30px;
  height: 4px;
  background-color: #a8a8a8;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.menu-button:hover .bar {
  background-color: #7a7a7a;
}

.menu-button .bar.open:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.menu-button .bar.open:nth-child(2) {
  opacity: 0;
}

.menu-button .bar.open:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

.logo {
  width: 150px;
  height: auto;
}
</style>
