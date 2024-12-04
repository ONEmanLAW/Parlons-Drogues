<template>
  <div class="body-chart">
    <div class="main-title">
      <h2>Graphique</h2>
      <h1>Les effets du cannabis à long terme</h1>
      <p>Sur le long terme, le cannabis peut avoir un impact sur ton cerveau et ton corps. Ce diagramme te montre les différents effets qu'il peut provoquer, que ce soit sur ta santé mentale ou physique.</p>
    </div>

    <div class="container">
      <div class="left-container">
        <div class="image-container">
          <img
            v-if="selectedBodyPart && selectedBodyPart.bodyImage" 
            :src="`/assets/images/${selectedBodyPart.bodyImage}`" 
            alt="Image du corps humain"
            class="body-image"
          />
        </div>

        <div class="buttons-container">
          <button
            v-for="(part) in bodyParts"
            :key="part.id"
            @click="selectBodyPart(part)"
            class="body-button"
          >
            {{ part.name }}
          </button>
        </div>
      </div>

      <div class="right-container" v-if="selectedBodyPart">
        <div class="page-header">
          <div class="tabs" v-if="!selectedBodyPart.data.text">
            <div
              class="tab"
              :class="{ active: selectedData === 'data1' }"
              @click="selectData('data1')"
            >
              Data 1
            </div>
            <div
              class="tab"
              :class="{ active: selectedData === 'data2' }"
              @click="selectData('data2')"
            >
              Data 2
            </div>
            <div
              class="tab"
              :class="{ active: selectedData === 'data3' }"
              @click="selectData('data3')"
            >
              Data 3
            </div>
          </div>
        </div>

        <div class="chart-container">
          <div v-if="selectedBodyPart.image && selectedBodyPart.name !== 'Autre Risques'" class="image-container">
            <div class="body-title" :style="{ color: selectedBodyPart.color }">
              {{ selectedBodyPart.name }}
            </div>
            <img
              v-if="selectedBodyPart.image"  
              :src="`/assets/images/${selectedBodyPart.image}`"
              alt="Image of {{ selectedBodyPart.name }}"
              class="body-image"
            />
          </div>

          <div v-if="selectedBodyPart.name === 'Autre Risques'" class="body-description">
            <div class="body-title" :style="{ color: selectedBodyPart.color }">
              {{ selectedBodyPart.name }}
            </div>
            {{ selectedBodyPart.data.text }}
          </div>

          <div v-else>
            <div v-if="selectedData === 'data1'" class="data1-container">
              <h3>{{ selectedBodyPart.data.data1.title }}</h3>
              <ul>
                <li v-for="(item, index) in selectedBodyPart.data.data1.text" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedData === 'data2'" class="data2-container">
              <h3>{{ selectedBodyPart.data.data2.title }}</h3>
              <div class="pie-chart-container" ref="pieChart"></div>
            </div>

            <div v-if="selectedData === 'data3'" class="data3-container">
              <div class="small-text-top">{{ selectedBodyPart.data.data3.smallTextTop }}</div>
              <div class="large-text">{{ selectedBodyPart.data.data3.largeText }}</div>
              <div class="small-text-bottom">{{ selectedBodyPart.data.data3.smallTextBottom }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as d3 from 'd3';
import bodyData from '../data/bodyData.json';

const bodyParts = bodyData.bodyParts;
const selectedBodyPart = ref(null); 
const selectedData = ref("data1"); 
const pieChart = ref(null); 


const selectBodyPart = (part) => {
  selectedBodyPart.value = part;
  selectedData.value = "data1"; 
  if (!selectedBodyPart.value.data.text) updatePieChart(); 
};


const selectData = (dataType) => {
  selectedData.value = dataType;
  if (selectedData.value === "data2") updatePieChart();
};

const updatePieChart = () => {
  nextTick(() => {
    const pieContainer = d3.select(pieChart.value);
    pieContainer.selectAll("*").remove();

    const percentage = selectedBodyPart.value.data[selectedData.value].percentage;
    if (percentage === undefined) return;

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = pieContainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(0) 
      .endAngle((percentage / 100) * 2 * Math.PI); 

    svg.append("circle")
      .attr("r", radius)
      .attr("fill", "#e0e0e0");

    svg.append("path")
      .datum({}) 
      .attr("d", arc) 
      .attr("fill", "#AC0266"); 

    svg.append("circle")
      .attr("r", radius - 20)
      .attr("fill", "white");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(`${Math.round(percentage)}%`);
  });
};

onMounted(() => {
  selectedBodyPart.value = bodyParts.find(part => part.name === "Cerveau");

  if (selectedBodyPart.value) updatePieChart();
});
</script>


<style scoped>

.body-chart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.body-title {
  text-align: center;
}

.main-title {
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.main-title h2 {
  font-size: 14px;
  background-color: #FFC9EA;
  display: inline-block;
  padding: 5px 10px;
  margin: 0;
  color:  #AC0266;
  border-radius: 5px;
  margin-top: 5px;
}

.main-title h1 {
  font-size: 35px;
  margin: 10px 0;
}

.main-title p {
  font-size: 22px;
  color: black;
  margin-top: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}


.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  height: 70vh;
  border: none;  
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  border-radius: 10px; 
  background-color: white; 
}


.left-container {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 40%;
}

.body-image {
  width: 195px;
  height: auto;
  object-fit: contain;
}


.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center; 
}

.body-button {
  padding: 12px 24px; 
  background-color: #FFC9EA;
  color: #AC0266;
  border-radius: 5px;
  font-size: 16px; 
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box; 
}

.body-button:hover {
  background-color: #FF5A5F;
  color: white;
  border: 2px solid #FF33A1;
  transform: scale(1.05);
}

.body-button:active {
  transform: scale(0.98);
}

.right-container {
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page-header {
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  gap: 20px;
  margin-top: 40px;
}

.tab {
  padding: 12px 24px;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease; 
  border: 2px solid transparent;
}

.tab:hover {
  background-color: #FF5A5F;
  color: white;
  border-color: #FF33A1; 
  transform: scale(1.05); 
}

.tab.active {
  background-color: #FF33A1; 
  color: white; 
  border-color: #FF33A1; 
}

/* Contenu dynamique */
.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  height: 100%; 
  width: 100%;
}

.data1-container, .data2-container, .data3-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
}

.data1-container h3,
.data2-container h3,
.data3-container h3 {
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
}

.data1-container ul,
.data2-container ul {
  list-style-type: none;
  padding-left: 0;
  font-size: 14px;
  text-align: center;
}

.data-text-right {
  font-size: 14px;
  color: #555;
  text-align: right;
}

.pie-chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.data3-container .small-text-top,
.data3-container .small-text-bottom {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.data3-container .large-text {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .left-container, .right-container {
    width: 100%;
    align-items: center;
  }

  .body-image {
    width: 200px;
  }

  .body-button {
    font-size: 14px;
    padding: 10px 20px;
  }

  .tabs .tab {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .body-chart {
    padding: 10px;
  }

  .main-title h2 {
    font-size: 16px;
  }

  .main-title h1 {
    font-size: 20px;
  }

  .main-title p {
    font-size: 14px;
  }

  .body-button {
    padding: 8px 16px;
    font-size: 12px; 
  }

  .body-image {
    width: 180px;
  }
}

@media (max-width: 480px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .left-container {
    flex-direction: column;
    align-items: center;
  }

  .body-image {
    width: 150px;
  }

  .body-button {
    font-size: 10px;
    padding: 6px 10px;
  }

  .tabs {
    flex-direction: column;
    gap: 10px;
  }

  .tab {
    padding: 8px 16px;
  }
}

</style>
