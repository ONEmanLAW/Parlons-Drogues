<template>
  <div class="container">
    <h2>Jeu de risques cumulés</h2>

    <!-- Personnage -->
    <div class="character" :style="{ backgroundColor: currentColor }"></div>

    <!-- Boutons de substances -->
    <div class="buttons">
      <button v-for="substance in substances" 
              :key="substance.name" 
              :class="{ active: activeSubstances.includes(substance) }"
              @click="toggleSubstance(substance)">
        {{ substance.name }}
      </button>
    </div>

    <!-- Graphiques de données -->
    <div class="data-display">
      <div v-for="(value, key) in dataEffects" :key="key" class="data-item">
        <p>{{ key }}</p>
        <svg class="circle-chart" width="50" height="50" :data-value="value">
          <circle class="circle-background" cx="25" cy="25" r="20"></circle>
          <circle class="circle-foreground" cx="25" cy="25" r="20"
                  :style="{ strokeDasharray: circleCircumference, strokeDashoffset: calculateOffset(value) }">
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import * as d3 from 'd3';


import substancesData from '../data/substances.json';
import '../styles/InteractiveCharacter.css';

const activeSubstances = reactive([]);
const dataEffects = reactive({
  somnolence: 0,
  tristesse: 0,
  bonheur: 0,
  anxiete: 0
});

const substances = ref(substancesData.substances);

function toggleSubstance(substance) {
  const index = activeSubstances.indexOf(substance);
  if (index >= 0) {
    activeSubstances.splice(index, 1);
  } else {
    activeSubstances.push(substance);
  }
  updateEffects();
}

const currentColor = computed(() => {
  if (activeSubstances.length === 0) return 'grey';
  return d3.interpolateRgbBasis(activeSubstances.map(s => s.color))(0.5);
});

function updateEffects() {
  dataEffects.somnolence = 0;
  dataEffects.tristesse = 0;
  dataEffects.bonheur = 0;
  dataEffects.anxiete = 0;

  activeSubstances.forEach(substance => {
    const effects = substance.effects;
    dataEffects.somnolence += effects.somnolence;
    dataEffects.tristesse += effects.tristesse;
    dataEffects.bonheur += effects.bonheur;
    dataEffects.anxiete += effects.anxiete;
  });
}


const circleRadius = 20;
const circleCircumference = 2 * Math.PI * circleRadius;


function calculateOffset(value) {
  const percentage = Math.min(value, 100) / 100;
  return circleCircumference * (1 - percentage);
}

onMounted(() => {
  updateEffects();
});
</script>