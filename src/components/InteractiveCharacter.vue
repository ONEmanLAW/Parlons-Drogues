<template>
  <div class="interactive-character">
    <div class="title-container">
      <h2>Les conséquences de la dépendance au cannabis</h2>
      <p class="description">Être accro, ça peut détruire tes études, semer la pagaille en famille, t'éloigner de tes amis et ruiner ton boulot. Au final, c’est toute ta vie qui part en vrille.</p>
    </div>

    <div class="card-container">
      <div class="card">
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
            <svg class="circle-chart" width="70" height="70" :data-value="effect.value">
              <circle class="circle-background" cx="35" cy="35" r="30"></circle>
              <circle
                class="circle-foreground"
                cx="35"
                cy="35" r="30"
                :style="{
                  strokeDasharray: circleCircumference,
                  strokeDashoffset: calculateOffset(effect.value),
                  stroke: getSolidGreen(effect.value)
                }"
              ></circle>
              <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="18" fill="#167540" font-weight="bold">
                {{ effect.value }}%
              </text>
            </svg>

            <p class="data-title">{{ effect.name }}</p>
          </div>
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

const circleRadius = 30;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
}

.title-container {
  text-align: center;
  margin-bottom: 20px; /* Ajoute un petit espace entre le titre et la carte */
  max-width: 90%; /* Optionnel : Limiter la largeur du titre */
}

h2 {
  font-size: 2rem;
  color: #167540;
  font-weight: bold;
  margin: 0;
}

.description {
  font-size: 1.2rem;
  color: #555;
  margin-top: 5px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  overflow: hidden; /* Evite que le contenu dépasse */
  flex-grow: 1;
}

.card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1100px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.character-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
}

.character {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
}

.character img {
  width: 100%;
  height: auto;
  max-width: 280px;
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
  font-size: 1.2rem;
  border: 2px solid #167540;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.buttons-container button.active {
  background-color: #167540;
  color: white;
}

.data-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  max-height: 200px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  overflow-y: hidden;
}

.data-display::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.data-display::-webkit-scrollbar-thumb {
  background-color: #167540;
  border-radius: 10px;
}

.data-display::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  border-radius: 10px;
}

.data-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.data-title {
  font-size: 1.1rem;
  margin: 10px 0 0 0;
  word-wrap: break-word;
  white-space: normal;
  max-width: 200px;
  line-height: 1.3;
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

/* Responsive Design Adjustments */
@media (max-width: 1024px) {
  .data-item {
    width: 48%;
  }

  .data-display {
    overflow-y: auto;
  }
}

@media (max-width: 768px) {
  .data-item {
    width: 100%;
  }

  .card {
    padding: 20px;
    width: 100%;
    max-width: none;
  }

  .character-container {
    flex-direction: column;
    gap: 30px;
  }

  .buttons-container {
    flex-direction: column;
    gap: 10px;
  }

  .buttons-container button {
    padding: 12px 20px;
    font-size: 1rem;
  }

  .character img {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .data-item {
    width: 100%;
  }

  .character img {
    width: 100%;
    max-width: 200px;
  }

  .data-title {
    font-size: 0.9rem;
  }

  .buttons-container button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}

</style>
