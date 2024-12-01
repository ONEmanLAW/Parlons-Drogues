<template>
  <div class="chapter3">
    <h2>Graphique des Effets par Mode de Consommation</h2>

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

    <div class="chart-card">
      <div ref="chartContainer" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';
import effectsData from '../data/effectsData.json';

// Modes disponibles
const modes = ['Fumé', 'Ingeré'];
const selectedModes = ref([]);
const chartContainer = ref(null);

// Variables D3
let svg, xScale, yScale;

const initializeChart = () => {
  // Dimensions de la carte et du graphique
  const cardHeight = window.innerHeight * 0.8; // 80% de la hauteur de la fenêtre
  const chartHeight = cardHeight * 0.65; // 65% de la hauteur de la carte
  const chartWidth = 1500; // Largeur fixe pour permettre le scroll si nécessaire
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Initialisation du SVG
  svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Définir les échelles
  xScale = d3
    .scaleLinear()
    .domain([0, 720])
    .range([0, width]);

  yScale = d3
    .scalePoint()
    .domain(['null', 'faible', 'modéré', 'forte', 'très forte'])
    .range([height, 0]);

  // Axe X
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(
      d3.axisBottom(xScale)
        .tickValues([0, 10, 30, 60, 120, 360, 720])
        .tickFormat((d) => (d === 0 ? '0' : `${d} min`))
    );

  // Axe Y
  svg.append('g').call(d3.axisLeft(yScale));

  // Mettre à jour le graphique
  updateChart();
};

const updateChart = () => {
  // Supprimer les anciens graphiques
  svg.selectAll('.line').remove();
  svg.selectAll('.point').remove();

  // Pour chaque mode sélectionné, afficher les données
  selectedModes.value.forEach((mode) => {
    const modeKey = mode.toLowerCase();
    const data = effectsData[modeKey].data["1"];

    if (!data || data.length === 0) {
      console.warn(`Pas de données pour le mode : ${mode}`);
      return;
    }

    // Mapper les données pour correspondre aux axes
    const scaledData = data.map((d) => ({
      x: d.durée,
      y: d.intensité,
    }));

    // Ajouter une ligne continue
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveCardinal);

    svg
      .append('path')
      .datum(scaledData)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', getColorForMode(mode))
      .attr('stroke-width', 2);

    // Ajouter des points
    svg
      .selectAll(`.point-${mode}`)
      .data(scaledData)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', getColorForMode(mode))
      .attr('stroke', '#000')
      .attr('stroke-width', 1);
  });
};

const getColorForMode = (mode) => {
  const colors = {
    Fumé: 'rgba(255, 99, 132, 1)',
    Ingeré: 'rgba(75, 192, 192, 1)',
  };
  return colors[mode] || 'black';
};

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

watch(selectedModes, updateChart);
</script>

<style scoped>
.chapter3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  justify-content: center; /* Centré verticalement */
}

.chart-card {
  width: 90%; /* 90% de la largeur de l'écran */
  height: 80vh; /* 80% de la hauteur de la fenêtre */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden; /* Cache les débordements verticaux */
}

.chart-container {
  width: 100%; /* Occupe toute la largeur de la carte */
  height: 65%; /* 65% de la hauteur de la carte */
  overflow-x: auto; /* Active le défilement horizontal si nécessaire */
  overflow-y: hidden; /* Pas de défilement vertical */
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
</style>
