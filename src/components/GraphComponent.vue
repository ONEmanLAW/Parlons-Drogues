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

    <div class="switch-container">
      <label class="switch">
        <input type="checkbox" v-model="isSurdose" @change="updateChart" />
        <span class="slider"></span>
      </label>
      <span>{{ isSurdose ? 'Surdose' : 'Dose' }}</span>
    </div>

    <div ref="chartContainer" class="chart-container"></div>

    <div class="slider-container">
      <input
        type="range"
        min="1"
        max="5"
        v-model="selectedYear"
        @input="updateChart"
      />
      <span>{{ selectedYear }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';
import effectsData from '../data/effectsData.json';

const modes = ['Fumé', 'Ingeré'];
const selectedModes = ref([]);
const selectedYear = ref(1);
const isSurdose = ref(false); 

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

  xScale = d3.scaleLinear().domain([1, 6]).range([0, width]);
  yScale = d3.scaleLinear().domain([0, 5]).range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(4));

  svg.append('g')
    .call(d3.axisLeft(yScale).ticks(5));

  updateChart();
};


const updateChart = () => {
  svg.selectAll('.line').remove();
  svg.selectAll('.emoji').remove();
  svg.selectAll('.text').remove();

  selectedModes.value.forEach(mode => {
    const modeKey = mode.toLowerCase();
    const doseKey = isSurdose.value ? 'surdose' : 'dose';

    const data = effectsData[modeKey][doseKey]["data"][selectedYear.value];
    const emojis = effectsData[modeKey][doseKey]["emojis"][selectedYear.value];

    const line = d3.line()
      .x((d, i) => xScale(i + 1))
      .y(d => yScale(d))
      .curve(d3.curveCardinal);

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', getColorForMode(mode))
      .attr('stroke-width', 2);

    svg.selectAll(`.emoji-${mode}`)
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'emoji')
      .attr('x', (d, i) => xScale(i + 1))
      .attr('y', d => yScale(d))
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .text((d, i) => emojis[i]);
  });
};


const getColorForMode = (mode) => {
  const colors = {
    "Fumé": "rgba(255, 99, 132, 1)",
    "Ingeré": "rgba(75, 192, 192, 1)"
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

watch(selectedYear, updateChart);
watch(selectedModes, updateChart);
</script>

<style scoped src="../styles/GraphComponent.css"></style>
