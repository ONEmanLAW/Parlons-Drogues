<template>
  <footer>
    <p>&copy; 2024/2025 Parlons Drogues. Tous droits réservés.</p>
    <button class="source-button" @click="openPDF">Source</button>
  </footer>
</template>

<script setup>
function openPDF() {
  window.open('../assets/Sources.pdf', '_blank');
}
</script>

<style scoped src="../styles/Footer.css"></style>
