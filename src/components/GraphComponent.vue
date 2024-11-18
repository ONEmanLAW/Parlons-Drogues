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

    <div ref="chartContainer" class="chart-container"></div>

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
import effectsData from '../data/effectsData.json'; // Charger le JSON séparé

const modes = ['Fumé', 'Vapoté', 'Ingeré'];
const selectedModes = ref([]);
const selectedYear = ref(1);

const chartContainer = ref(null);
let svg, xScale, yScale;

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

  xScale = d3.scaleLinear()
    .domain([0, 180]) // Durée en minutes
    .range([0, width]);

  yScale = d3.scaleLinear()
    .domain([0, 50]) // Effets max
    .range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => `${d} min`));

  svg.append('g')
    .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));

  updateChart();
};

const updateChart = () => {
  svg.selectAll('.line').remove();
  svg.selectAll('.emoji').remove();
  svg.selectAll('.text').remove(); // Enlever les textes précédents

  selectedModes.value.forEach(mode => {
    const data = effectsData[mode.toLowerCase()][selectedYear.value];

    // Dessiner une ligne continue (sans pointillés)
    const line = d3.line()
      .x((d, i) => xScale([0, 15, 45, 90, 180][i]))
      .y(d => yScale(d))
      .curve(d3.curveCardinal); // Courbes naturelles

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', getColorForMode(mode))
      .attr('stroke-width', 2); // Traité avec un trait plus large, continu

    // Ajouter des emojis comme points individuels
    svg.selectAll(`.emoji-${mode}`)
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'emoji')
      .attr('x', (d, i) => xScale([0, 15, 45, 90, 180][i]))
      .attr('y', d => yScale(d)) // Emoji aligné sur la courbe
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .text((d, i) => getEmojiForPoint(mode, i)); // Emoji différent pour chaque point

    // Ajouter des textes sous chaque emoji pour afficher le pourcentage de l'effet
    svg.selectAll(`.text-${mode}`)
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'text')
      .attr('x', (d, i) => xScale([0, 15, 45, 90, 180][i]))
      .attr('y', d => yScale(d) + 20) // Position sous l'emoji
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => `${d}%`); // Affichage du pourcentage d'effet sous l'emoji
  });
};

const getColorForMode = (mode) => {
  const colors = {
    "Fumé": "rgba(255, 99, 132, 1)",
    "Vapoté": "rgba(54, 162, 235, 1)",
    "Ingeré": "rgba(75, 192, 192, 1)"
  };
  return colors[mode] || 'black';
};

// Emoji spécifique pour chaque point, selon l'indice
const getEmojiForPoint = (mode, index) => {
  const emojis = {
    "Fumé": ["💨", "🔥", "💨", "☁️", "🌬️"], // Différents emojis pour chaque point
    "Vapoté": ["💨", "🍃", "🌀", "🌬️", "🌫️"],
    "Ingeré": ["🍽️", "🥄", "🍒", "🍍", "🍉"]
  };
  return emojis[mode] && emojis[mode][index] || '❓'; // Retourne un emoji spécifique pour chaque point
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

watch(selectedYear, updateChart);
watch(selectedModes, updateChart);
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

.line {
  stroke-dasharray: none; /* Traité sans pointillé */
}

.emoji {
  font-family: Arial, sans-serif;
}

.text {
  font-family: Arial, sans-serif;
  fill: #333;
}
</style>
