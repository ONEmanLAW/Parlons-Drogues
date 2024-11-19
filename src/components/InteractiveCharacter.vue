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
        <img v-if="!activeSubstance" :src="currentImage" alt="Image de base" />
        <img v-if="activeSubstance" :src="currentImage" alt="Substance Image" />
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
      <div v-for="(effect, index) in currentEffects" :key="index" class="data-item">
        <svg class="circle-chart" width="60" height="60" :data-value="effect.value">
          <circle class="circle-background" cx="30" cy="30" r="25"></circle>
          <circle
            class="circle-foreground"
            cx="30"
            cy="30"
            r="25"
            :style="{
              strokeDasharray: circleCircumference,
              strokeDashoffset: calculateOffset(effect.value),
              stroke: getSolidGreen(effect.value)
            }"
          ></circle>
          <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="16" fill="#167540" font-weight="bold">
            {{ effect.value }}%
          </text>
        </svg>

        <p class="data-title">{{ effect.name }}</p>
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
const baseSubstance = computed(() => substances.value.find(substance => substance.name === "Image de base"));
const leftSubstances = computed(() => substances.value.slice(1, Math.ceil(substances.value.length / 2)));
const rightSubstances = computed(() => substances.value.slice(Math.ceil(substances.value.length / 2)));

const baseImage = baseSubstance.value.image;
function resolveImagePath(path) {
  return new URL(path, import.meta.url).href;
}

const currentImage = computed(() => {
  return activeSubstance.value ? resolveImagePath(activeSubstance.value.image) : resolveImagePath(baseImage);
});

const currentEffects = computed(() => {
  return activeSubstance.value ? activeSubstance.value.effects : baseSubstance.value.effects;
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

function getSolidGreen(value) {
  const percentage = Math.min(value, 100);
  return `rgb(
    ${Math.floor(50 + (percentage * (255 - 50)) / 100)},
    ${Math.floor(200 + (percentage * (255 - 200)) / 100)},
    ${Math.floor(50 + (percentage * (100 - 50)) / 100)}
  )`;
}
</script>

<style scoped>
.interactive-character {
  text-align: center;
  padding: 20px;
  background-color: #ffffff; 
  border-radius: 15px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  max-width: 1100px;
  margin: 20px auto; 
}

.character-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px; 
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
  flex-wrap: wrap; 
}

.data-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100px; 
  margin: 10px;
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


.data-title {
  margin-top: 10px;
  word-wrap: break-word;
  white-space: normal; 
  max-width: 100px; 
}
</style>
