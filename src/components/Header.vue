<template>
  <header>
    <h1>Parlons Drogues</h1>
    <nav>
      <ul>
        <li><router-link to="/">Intro</router-link></li>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/chapter1">Chapitre 1</router-link></li>
        <li><router-link to="/chapter2">Chapitre 2</router-link></li>
        <li><router-link to="/chapter3">Chapitre 3</router-link></li>
        <li><router-link to="/advice">Conseils</router-link></li>
      </ul>
    </nav>
    <router-link to="/menu" class="menu-button">Menu</router-link>
  </header>
</template>

<script setup>
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #167540;
  color: white;
}

nav ul {
  display: flex;
  gap: 15px;
  list-style: none;
}

nav ul li a {
  text-decoration: none;
  color: white;
}

.menu-button {
  background-color: white;
  color: #167540;
  border: 2px solid #167540;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menu-button:hover {
  background-color: #167540;
  color: white;
}
</style>
