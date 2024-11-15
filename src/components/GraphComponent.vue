<template>
  <div class="chapter3">
    <h2>Graphique des Effets par Mode de Consommation</h2>

    <!-- Boutons pour sélectionner les modes de consommation -->
    <div class="buttons">
      <button
        v-for="mode in modes"
        :key="mode"
        @click="toggleMode(mode)"
        :class="{ active: selectedModes.includes(mode) }"
      >
        {{ mode }}
      </button>
    </div>

    <!-- Zone du graphique -->
    <div ref="chartContainer" class="chart-container"></div>

    <!-- Curseur pour sélectionner l'année (1-10 ans) -->
    <div class="slider-container">
      <input
        type="range"
        min="1"
        max="10"
        v-model="selectedYear"
        @input="updateChart"
      />
      <span>{{ selectedYear }} ans</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';
import effectsData from '../data/effectsData.json';

const modes = ['Fumé', 'Vapoté', 'Ingeré'];
const selectedModes = ref([]);
const selectedYear = ref(1); // Année sélectionnée par défaut

const chartContainer = ref(null);
let svg, xScale, yScale, lineGenerator;

// Fonction pour initialiser le graphique D3
const initializeChart = () => {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  svg = d3.select(chartContainer.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Échelle pour l'axe des X (minutes)
  xScale = d3.scaleLinear()
    .domain([0, 180]) // 0 à 180 minutes
    .range([0, width]);

  // Échelle pour l'axe des Y (effets)
  yScale = d3.scaleLinear()
    .domain([0, 50]) // ajustable en fonction des données max
    .range([height, 0]);

  // Générateur de ligne
  lineGenerator = d3.line()
    .x((d, i) => xScale([0, 15, 45, 90, 180][i]))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  // Ajout de l'axe des X
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  // Ajout de l'axe des Y
  svg.append('g')
    .call(d3.axisLeft(yScale));

  updateChart();
};

// Fonction pour mettre à jour le graphique en fonction des modes sélectionnés et de l'année
const updateChart = () => {
  // Effacer les lignes existantes
  svg.selectAll('.line').remove();

  // Ajouter une ligne pour chaque mode sélectionné
  selectedModes.value.forEach(mode => {
    const data = effectsData[mode.toLowerCase()][selectedYear.value];

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', getColorForMode(mode))
      .attr('stroke-width', 2);
  });
};

// Fonction pour obtenir une couleur spécifique pour chaque mode
const getColorForMode = (mode) => {
  const colors = {
    "Fumé": "rgba(255, 99, 132, 1)",
    "Vapoté": "rgba(54, 162, 235, 1)",
    "Ingeré": "rgba(75, 192, 192, 1)"
  };
  return colors[mode] || 'black';
};

// Fonction pour ajouter ou retirer un mode de consommation sélectionné
const toggleMode = (mode) => {
  const index = selectedModes.value.indexOf(mode);
  if (index === -1) {
    selectedModes.value.push(mode);
  } else {
    selectedModes.value.splice(index, 1);
  }
  updateChart();
};

onMounted(() => {
  initializeChart();
});

watch(selectedYear, updateChart); // Mettre à jour le graphique lorsque l'année change
watch(selectedModes, updateChart); // Mettre à jour le graphique lorsque les modes changent
</script>

<style scoped>
.chapter3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.buttons button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}

.buttons button.active {
  background-color: #999;
  color: #fff;
}

.chart-container {
  width: 600px;
  height: 300px;
  margin-bottom: 20px;
}

.slider-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  width: 200px;
  appearance: none;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #555;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #555;
  border-radius: 50%;
  cursor: pointer;
}
</style>
