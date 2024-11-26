<template>
  <div class="interactive-character">
    <div class="card">
      <div class="title-container">
        <h2>Jeu de risques cumulés</h2>
        <p class="description">Découvrez les effets cumulés des différentes substances sur le personnage.</p>
      </div>

      <div class="character-container">
        <div class="character">
          <img v-if="!activeSubstance" :src="currentImage" alt="Image de base" />
          <img v-if="activeSubstance" :src="currentImage" alt="Substance Image" />
        </div>

        <div class="buttons-container">
          <button
            v-for="substance in substancesToDisplay"
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
              cy="30" r="25"
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "../styles/InteractiveCharacter.css";
import substancesData from "../data/substances.json";

const substances = ref(substancesData.substances);
const activeSubstance = ref(null);
const baseSubstance = computed(() => substances.value.find(substance => substance.name === "Image de base"));
const substancesToDisplay = computed(() => {
  return substances.value.filter(substance => substance.name !== "Image de base");
});

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 80%;
  max-width: 1100px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.title-container {
  text-align: center;
}

h2 {
  font-size: 36px;
  color: #167540;
  font-weight: bold;
  margin: 0;
}

.description {
  font-size: 18px;
  color: #555;
  margin-top: 5px;
}

.character-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.character {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-width: 250px;
}

.character img {
  width: 300px;
  height: auto;
  border-radius: 10px;
}


.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;  
}

.buttons-container button {
  margin: 0;
  background-color: white;
  color: #167540;
  font-weight: bold;
  padding: 15px 30px;
  font-size: 18px;
  border: 2px solid #167540;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.buttons-container button.active {
  background-color: #167540;
  color: white;
}

.data-display {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  flex-wrap: nowrap;
  overflow-y: auto;
  max-height: 200px;
}

.data-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 180px;
}

.data-title {
  font-size: 18px;
  margin: 0;
  word-wrap: break-word;
  white-space: normal;
  max-width: 120px;
  height: 40px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.circle-chart {
  transform: rotate(0deg);
}

.circle-background {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 6;
}

.circle-foreground {
  fill: none;
  stroke-width: 6;
  transition: stroke-dashoffset 0.3s ease;
}
</style>
