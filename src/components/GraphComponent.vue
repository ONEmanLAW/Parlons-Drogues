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
  const chartWidth = window.innerWidth * 0.9;  // Utilisation de 90% de la largeur de l'écran
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', chartWidth)  // La largeur du graphique est maintenant ajustée
    .attr('height', chartHeight)  // La hauteur est aussi ajustée
    .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`) // Utilisation de viewBox pour une meilleure réactivité
    .attr('preserveAspectRatio', 'xMidYMid meet')  // Garde l'aspect du graphique
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const timePoints = [0, 10, 30, 60, 120, 360, 720];  // Points horaires
  const numPoints = timePoints.length;

  // Créer une échelle linéaire pour une distribution uniforme des points
  xScale = d3
    .scaleLinear()
    .domain([0, numPoints - 1])  // Crée une échelle pour les indices des points
    .range([0, width]);

  yScale = d3
    .scalePoint()
    .domain(['null', 'faible', 'modéré', 'forte', 'très forte'])
    .range([height, 0]);

  svg.append('g').attr('transform', `translate(0,${height})`).call(
    d3.axisBottom(xScale)
      .tickValues(d3.range(numPoints))  // Affichage des ticks pour les indices
      .tickFormat((d) => `${timePoints[d]} min`)  // Formatage des ticks avec les valeurs réelles
  );
  svg.append('g').call(d3.axisLeft(yScale));

  updateChart();
};

const updateChart = () => {
  // Supprimer les éléments uniquement pour les modes qui sont désactivés
  modes.forEach((mode) => {
    if (!selectedModes.value.includes(mode)) {
      svg.selectAll(`.line-${mode}`).remove();
      svg.selectAll(`.point-${mode}`).remove();
    }
  });

  // Ajouter des éléments graphiques uniquement pour les modes activés
  selectedModes.value.forEach((mode) => {
    const modeKey = mode.toLowerCase();
    const data = effectsData[modeKey].data["1"];

    if (!data || data.length === 0) {
      console.warn(`Pas de données pour le mode : ${mode}`);
      return;
    }

    const scaledData = data.map((d, i) => ({
      x: i,  // Utilisation de l'index pour les points (répartis uniformément)
      y: d.intensité,
    }));

    // Vérifier si la ligne existe déjà, sinon l'animer
    if (svg.selectAll(`.line-${mode}`).empty()) {
      const line = d3.line()
        .x((d) => xScale(d.x))  // Utiliser l'échelle linéaire
        .y((d) => yScale(d.y))
        .curve(d3.curveCardinal);

      const path = svg.append('path')
        .datum(scaledData)
        .attr('class', `line-${mode}`)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 4) 
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
      .attr('cx', (d) => xScale(d.x))  // Utiliser l'échelle linéaire
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 8) 
      .attr('fill', 'blue')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 0) // Les points commencent invisibles
      .transition() // Applique l'animation
      .duration(1500) // Durée de l'animation
      .attr('opacity', 1); // Rendre les points visibles progressivement
  });
};

const getColorForMode = (mode) => {
  // Nous avons directement assigné la couleur bleue dans updateChart, donc on n'a plus besoin de cette fonction
  return 'blue';
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
