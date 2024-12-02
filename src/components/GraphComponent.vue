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
  const cardHeight = window.innerHeight * 0.8;
  const chartHeight = cardHeight * 0.65;
  const chartWidth = 1500;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const timePoints = [0, 10, 30, 60, 120, 360, 720];
  xScale = d3
    .scaleLinear()
    .domain([0, d3.max(timePoints)])
    .range([0, width]);

  yScale = d3
    .scalePoint()
    .domain(['null', 'faible', 'modéré', 'forte', 'très forte'])
    .range([height, 0]);

  svg.append('g').attr('transform', `translate(0,${height})`).call(
    d3.axisBottom(xScale).tickValues(timePoints).tickFormat((d) => (d === 0 ? '0' : `${d} min`))
  );
  svg.append('g').call(d3.axisLeft(yScale));

  updateChart();
};

const updateChart = () => {
  // Supprimer les anciens graphiques (lignes et points) seulement pour les modes non sélectionnés
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

    const scaledData = data.map((d) => ({
      x: d.durée,
      y: d.intensité,
    }));

    // Vérifier si la ligne existe déjà, sinon l'animer
    if (svg.selectAll(`.line-${mode}`).empty()) {
      const line = d3.line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveCardinal);

      const path = svg.append('path')
        .datum(scaledData)
        .attr('class', `line-${mode}`)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', getColorForMode(mode))
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', function () {
          const length = this.getTotalLength();
          return length;
        })
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength();
        })
        .transition()
        .duration(1500)
        .attr('stroke-dashoffset', 0); // Fait apparaître la ligne
    }

    // Ajouter des points avec animation
    svg
      .selectAll(`.point-${mode}`)
      .data(scaledData)
      .enter()
      .append('circle')
      .attr('class', `point-${mode}`)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', getColorForMode(mode))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 0) // Les points commencent invisibles
      .transition() // Applique l'animation
      .duration(1500) // Durée de l'animation
      .attr('opacity', 1); // Rendre les points visibles progressivement
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
    // Si le mode est activé, l'ajouter à la liste des modes sélectionnés
    selectedModes.value.push(mode);
  } else {
    // Si le mode est désactivé, le retirer de la liste des modes sélectionnés
    selectedModes.value.splice(index, 1);
  }
  updateChart(); // Met à jour le graphique après avoir modifié l'état des modes sélectionnés
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
  height: 100vh;
  justify-content: center;
}

.chart-card {
  width: 90%;
  height: 80vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 65%;
  overflow-x: auto;
  overflow-y: hidden;
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
