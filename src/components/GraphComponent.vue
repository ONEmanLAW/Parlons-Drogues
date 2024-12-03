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

    <div class="cursor-controls">
      <label for="cursor-select">Choisir un mode de phase :</label>
      <select id="cursor-select" v-model="selectedPhase" @change="updatePhase">
        <option value="default">Défaut</option>
        <option value="phase1">Phase 1</option>
        <option value="phase2">Phase 2</option>
        <option value="phase3">Phase 3</option>
        <option value="phase4">Phase 4</option>
      </select>
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

const modes = ['Fumé', 'Ingeré'];
const selectedModes = ref([]);
const selectedPhase = ref('default');
const chartContainer = ref(null);

let svg, xScale, yScale;

const initializeChart = () => {
  const chartWidth = window.innerWidth * 0.7;
  const chartHeight = window.innerHeight * 0.7;
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

  const timePoints = [0, 10, 30, 120, 240, 360, 600, 720];

  xScale = d3
    .scalePoint()
    .domain(timePoints)
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
  svg.selectAll('.point').remove();
  svg.selectAll('.line').remove();

  selectedModes.value.forEach((mode) => {
    const modeKey = mode.toLowerCase();
    const data = effectsData[modeKey].data["1"];

    if (!data || data.length === 0) {
      console.warn(`Pas de données pour le mode : ${mode}`);
      return;
    }

    const cleanedData = data
      .map((d) => ({
        x: d.durée,
        y: d.intensité === "null" ? "faible" : d.intensité,
      }))
      .filter(d => !isNaN(xScale(d.x)) && yScale(d.y) !== undefined);

    const filteredData = filterDataByPhase(cleanedData);

    const line = d3.line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveCardinal);

    if (filteredData.length > 1) {
      svg.append('path')
        .datum(filteredData)
        .attr('class', `line-${mode} line`)
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
        .attr('stroke-dashoffset', 0);
    }

    svg
      .selectAll(`.point-${mode}`)
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('class', `point point-${mode}`)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', getColorForMode(mode))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .attr('opacity', 1);
  });
};

const getColorForMode = (mode) => {
  const colors = {
    Fumé: 'rgba(255, 99, 132, 1)',
    Ingeré: 'rgba(75, 192, 192, 1)',
  };
  return colors[mode] || 'black';
};

const filterDataByPhase = (data) => {
  switch (selectedPhase.value) {
    case 'default':
      return data;
    case 'phase1':
      return data.slice(0, 2);
    case 'phase2':
      return data.slice(1, 3);
    case 'phase3':
      return data.slice(2, 4); 
    case 'phase4':
      return data.slice(3, 5); 
    default:
      return data;
  }
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

const updatePhase = () => {
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
  height: 100%;
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

.cursor-controls {
  margin: 10px 0;
  font-size: 16px;
}

.cursor-controls select {
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
}
</style>
