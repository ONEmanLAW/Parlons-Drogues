<template>
  <div class="interactive-character">
    <h2>Jeu de risques cumulés</h2>

    <div class="character-container">
      
      <div class="left-buttons">
        <button
          v-for="substance in leftSubstances"
          :key="substance.name"
          :class="{ active: activeSubstance === substance }"
          @click="selectSubstance(substance)"
        >
          {{ substance.name }}
        </button>
      </div>

      <div class="character">
        <img :src="currentImage" alt="Substance" />
      </div>

      <div class="right-buttons">
        <button
          v-for="substance in rightSubstances"
          :key="substance.name"
          :class="{ active: activeSubstance === substance }"
          @click="selectSubstance(substance)"
        >
          {{ substance.name }}
        </button>
      </div>
    </div>

    <div class="data-display">
      <div v-for="(value, key) in currentEffects" :key="key" class="data-item">
        <svg class="circle-chart" width="60" height="60" :data-value="value">
          <circle
            class="circle-background"
            cx="30"
            cy="30"
            r="25"
          ></circle>
          <circle
            class="circle-foreground"
            cx="30"
            cy="30"
            r="25"
            :style="{
              strokeDasharray: circleCircumference,
              strokeDashoffset: calculateOffset(value),
              stroke: getGradient(value)
            }"
          ></circle>
          <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="16" fill="#167540" font-weight="bold">
            {{ value }}%
          </text>
        </svg>

        
        <p>{{ translateKey(key) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "../styles/InteractiveCharacter.css";


import substancesData from "../data/substances.json";


const substances = ref(substancesData.substances);
const activeSubstance = ref(null);


const leftSubstances = computed(() => substances.value.slice(0, 2));
const rightSubstances = computed(() => substances.value.slice(2, 4));

function resolveImagePath(path) {
  return new URL(path, import.meta.url).href;
}


const currentImage = computed(() => {
  return activeSubstance.value
    ? resolveImagePath(activeSubstance.value.image)
    : resolveImagePath("../assets/images/image1.png");
});


const currentEffects = computed(() => {
  return activeSubstance.value ? activeSubstance.value.effects : {
    baisse_des_performances: 0,
    difficultes_concentration: 0,
    absences_repetees: 0,
    risques_abandon_scolaire: 0,
  };
});


function selectSubstance(substance) {
  activeSubstance.value = activeSubstance.value === substance ? null : substance;
}


const circleRadius = 25;
const circleCircumference = 2 * Math.PI * circleRadius;

function calculateOffset(value) {
  const percentage = Math.min(value, 100) / 100;
  return circleCircumference * (1 - percentage);
}


function translateKey(key) {
  const translations = {
    baisse_des_performances: "Baisse des performances scolaires",
    difficultes_concentration: "Difficultés de concentration",
    absences_repetees: "Absences répétées",
    risques_abandon_scolaire: "Risques d'abandon scolaire",
  };
  return translations[key] || key;
}


function getGradient(value) {
  const percentage = Math.min(value, 100);
  const lightGreen = "#b0e57c";
  const darkGreen = "#006400";  

  const green = `rgb(${Math.floor(176 + (percentage * (Math.floor(0 + (99 - 176)) / 100)))}, ${Math.floor(229 + (percentage * (Math.floor(90 + (229 - 90)) / 100)))}, ${Math.floor(124 + (percentage * (Math.floor(180 + (124 - 180)) / 100)))})`;

  return green;
}
</script>

<style scoped>
.interactive-character {
  text-align: center;
  padding: 20px;
}

.character-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.left-buttons,
.right-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.left-buttons button,
.right-buttons button {
  margin: 0;
  background-color: white;
  color: #167540;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #167540;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.left-buttons button.active,
.right-buttons button.active {
  background-color: #167540;
  color: white;
}

.character {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
}

.character img {
  width: 150px;
  height: auto;
  border-radius: 10px;
}

.data-display {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.data-item {
  text-align: center;
}

.circle-chart {
  transform: rotate(0deg); 
}

.circle-background {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 5;
}

.circle-foreground {
  fill: none;
  stroke-width: 5;
  transition: stroke-dashoffset 0.3s ease;
}


circle {
  stroke: url(#gradientGreen);
}

circle text {
  font-size: 16px;
  font-weight: bold;
  fill: #167540;
}

.data-item p {
  margin-top: 10px;
}
</style>
