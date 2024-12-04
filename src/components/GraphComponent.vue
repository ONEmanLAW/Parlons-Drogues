<template>
  <div class="chapter3">
    <!-- Texte au-dessus du titre -->
    <div class="info-badge">Graphique</div>
    
    <!-- Titre principal -->
    <h2>Les effets du cannabis à court terme</h2>

    <!-- Texte explicatif -->
    <p class="description">
      Les effets du cannabis, c’est pas toujours pareil, ça change selon les moments. Quand tu consommes, il y a plusieurs phases par lesquelles tu passes. Ce schéma te montre comment l’intensité évolue avec le temps, pour mieux comprendre ce qui se passe dans ton corps.
    </p>

    <!-- Section des boutons -->
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

    <!-- Curseur avec 5 phases -->
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

    <!-- Graphique -->
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
const selectedPhase = ref('default'); // Phase par défaut
const chartContainer = ref(null);

// Variables D3
let svg, xScale, yScale;

const initializeChart = () => {
  // Réduire la taille du graphique
  const chartWidth = 900; // Largeur du graphique réduite
  const chartHeight = 500; // Hauteur du graphique réduite
  const margin = { top: 20, right: 30, bottom: 80, left: 100 }; // Marges plus larges pour l'espace
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const timePoints = [0, 10, 30, 120, 240, 360, 600, 720];

  xScale = d3
    .scalePoint()
    .domain(timePoints)
    .range([0, width]);

  yScale = d3
    .scalePoint()
    .domain(['absent', 'faible', 'modéré', 'forte', 'très forte'])
    .range([height, 0]);

  // Ajouter les axes avec les labels
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickValues(timePoints).tickFormat((d) => (d === 0 ? '0' : `${d} min`)))
    .selectAll('text')
    .style('fill', 'blue') // Couleur bleue pour le texte de l'axe des x
    .style('font-size', '14px') // Taille du texte
    .style('font-weight', 'bold'); // Texte en gras

  svg.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('text')
    .style('fill', 'blue')
    .style('font-size', '14px') 
    .style('font-weight', 'bold');

  svg.selectAll('.domain') 
    .style('stroke', 'blue') 
    .style('stroke-width', 3); 

  svg.selectAll('.tick line') 
    .style('stroke', 'blue')
    .style('stroke-width', 2); 

  svg.selectAll('.tick text') 
    .style('fill', 'blue')
    .style('font-size', '14px') 
    .style('font-weight', 'bold');

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 10)
    .attr('text-anchor', 'middle')
    .style('fill', 'blue')
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .text('Durée (en min)');

  svg.append('text')
    .attr('x', -height / 2) 
    .attr('y', -margin.left + 10) 
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .style('fill', 'blue')
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .text('Intensité');

  updateChart();
};



const updateChart = () => {
  svg.selectAll('.point').remove();
  svg.selectAll('.line').remove();
  svg.selectAll('.image').remove(); // Ajouter cette ligne pour supprimer les anciennes images

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
        y: d.intensité
      }))
      .filter(d => !isNaN(xScale(d.x)) && yScale(d.y) !== undefined);

    const filteredData = filterDataByPhase(cleanedData);

    // Tracer la ligne si les données sont présentes
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
        .attr('stroke-width', 4) // Augmenter l'épaisseur de la ligne du graphique
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

    // Tracer les points
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

  // Ajouter l'image en fonction de la phase sélectionnée
  addImageForPhase();
};

const addImageForPhase = () => {
  let imageUrl = '';
  
  switch (selectedPhase.value) {
    case 'phase1':
      imageUrl = '/assets/images/phase1.png';
      break;
    case 'phase2':
      imageUrl = '/assets/images/phase2.png';
      break;
    case 'phase3':
      imageUrl = '/assets/images/phase3.png';
      break;
    case 'phase4':
      imageUrl = '/assets/images/phase4.png';
      break;
    default:
      imageUrl = ''; // Pas d'image en phase "default"
      break;
  }

  if (imageUrl) {
    svg.append('image')
      .attr('class', 'image')
      .attr('x', 400) // Position X de l'image (ajuste selon tes besoins)
      .attr('y', -100) // Position Y de l'image (ajuste selon tes besoins)
      .attr('width', 375) // Ajuste la taille de l'image ici
      .attr('height', 375) // Ajuste la taille de l'image ici
      .attr('xlink:href', imageUrl); // Lien vers l'image
  }
};

const getColorForMode = (mode) => {
  const colors = {
    Fumé: 'rgba(0, 0, 255, 1)',
    Ingeré: 'rgba(75, 192, 192, 1)',
  };
  return colors[mode] || 'black';
};

// Fonction de filtrage des données selon la phase
const filterDataByPhase = (data) => {
  switch (selectedPhase.value) {
    case 'default':
      return data; // Affiche tous les points
    case 'phase1':
      return data.slice(0, 2); // Affiche les points 1 et 2
    case 'phase2':
      return data.slice(1, 3); // Affiche les points 2 et 3
    case 'phase3':
      return data.slice(2, 4); // Affiche les points 3 et 4
    case 'phase4':
      return data.slice(3, 5); // Affiche les points 4 et 5
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
  updateChart(); // Redessine le graphique à chaque changement de phase
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
  display: flex;
  justify-content: center;  /* Centre horizontalement */
  align-items: center;  /* Centre verticalement */
  width: 70%;  /* Réduit la taille du conteneur pour plus de visibilité */
  height: 60vh;  /* Réduit la hauteur du conteneur */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
}

.chart-container {
  display: flex;
  justify-content: center;  /* Centre le contenu horizontalement */
  align-items: center;  /* Centre le contenu verticalement */
  width: 100%;
  height: 100%;
}

button {
  padding: 12px 24px;
  margin: 5px;
  background-color: #3f51b5; /* Couleur bleue par défaut */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease; /* Transition pour un effet fluide */
}

/* Style lorsque le bouton est actif */
button.active {
  background-color: #1e3d8e; /* Couleur bleue plus foncée */
  box-shadow: 0 4px 8px rgba(30, 61, 142, 0.6); /* Ombre pour indiquer que le bouton est enfoncé */
  transform: translateY(2px); /* Légère translation pour simuler l'enfoncement */
}

/* Effet au survol */
button:hover {
  background-color: #2c478d; /* Un bleu intermédiaire quand on survole */
}

/* Effet au focus (quand le bouton reçoit le focus avec le clavier) */
button:focus {
  outline: none; /* Supprimer le contour par défaut */
  box-shadow: 0 0 8px rgba(30, 61, 142, 0.7); /* Ombre plus intense au focus */
}



.cursor-controls {
  margin-bottom: 30px; /* Augmenter l'espacement en bas */
  font-size: 18px; /* Taille du texte légèrement plus grande pour plus de lisibilité */
  font-weight: bold;
  color: blue;
  display: flex;
  flex-direction: column; /* Pour empiler le texte et le select */
  gap: 10px; /* Espacement entre le texte et le select */
}

select {
  padding: 12px 20px;  /* Augmenter le padding pour plus d'espace à l'intérieur */
  font-size: 16px;
  border: 2px solid #3f51b5; /* Bordure bleue */
  border-radius: 6px;  /* Bordure légèrement plus arrondie */
  background-color: #fff; /* Fond blanc */
  color: #3f51b5; /* Couleur du texte */
  cursor: pointer;
  transition: all 0.3s ease; /* Effet de transition */
}

select:focus {
  outline: none; /* Supprime le contour par défaut */
  border-color: #1e3d8e; /* Bordure bleue plus foncée au focus */
  box-shadow: 0 0 5px rgba(30, 61, 142, 0.5); /* Ombre autour au focus */
}

select:hover {
  background-color: #f1f1f1; /* Changement de couleur au survol */
}


.info-badge {
  display: inline-block;
  background-color: #A4E1FF;
  color: #3135B7;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin: 15px 0 20px;
  text-align: center; /* Centrer le texte */
  max-width: 80%; /* Limiter la largeur du paragraphe */
}

</style>
