<template>
  <div class="body-chart">
    <div class="main-title">
      <h2>Graphiques</h2>
      <h1>Les effets du cannabis à long terme</h1>
      <p>Sur le long terme, le cannabis peut avoir un impact sur ton cerveau et ton corps. Ce diagramme te montre les différents effets qu'il peut provoquer, que ce soit sur ta santé mentale ou physique.</p>
    </div>

    <div class="container">
      <div class="left-container">
        <div class="image-container">
          <img
            :src="`../assets/images/persoInes.png`"
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
          <div v-if="selectedBodyPart.image && selectedBodyPart.name !== 'Foie'" class="image-container">
            <div class="body-title" :style="{ color: selectedBodyPart.color }">
              {{ selectedBodyPart.name }}
            </div>
            <img
              :src="`/assets/images/${selectedBodyPart.image}`"
              alt="Image of {{ selectedBodyPart.name }}"
              class="body-image"
            />
          </div>

          <div v-if="selectedBodyPart.name === 'Foie'" class="body-description">
            <div class="body-title" :style="{ color: selectedBodyPart.color }">
              {{ selectedBodyPart.name }}
            </div>
            {{ selectedBodyPart.data.text }}
          </div>

          <div v-else>
            <div v-if="selectedData === 'data1'" class="data1-container">
              <h3>{{ selectedBodyPart.data.data1.title }}</h3>
              <p>{{ selectedBodyPart.data.data1.textIntro }}</p> 
              <ul>
                <li v-for="(item, index) in selectedBodyPart.data.data1.text" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedData === 'data2'" class="data2-container">
              <h3 class="graph2-text">{{ selectedBodyPart.data.data2.title }}</h3>
              <div class="pie-chart-container">
                <div ref="pieChart" class="pie-chart"></div>
              </div>
              <div class="data-text-right">
                <p>{{ selectedBodyPart.data.data2.text }}</p> 
              </div>
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

    const data = selectedBodyPart.value.data[selectedData.value].data;
    if (!data) return;

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = pieContainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const data_ready = pie(data);

    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        const i = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          d
        );
        return function(t) {
          return arc(i(t));
        };
      });

    svg
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.label);
  });
};

onMounted(() => {
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
  font-size: 20px;
  background-color: #ff5a5f;
  display: inline-block;
  padding: 5px 10px;
  margin: 0;
  color: white;
  border-radius: 5px;
}

.main-title h1 {
  font-size: 28px;
  margin: 10px 0;
}

.main-title p {
  font-size: 16px;
  color: #555;
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
  height: 80vh;
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
  width: 230px;
  height: auto;
  object-fit: contain;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.body-button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.body-button:hover {
  background-color: #ddd;
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
}

.tab {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tab:hover {
  background-color: #ddd;
}

.tab.active {
  background-color: #ff5a5f;
  color: white;
}

/* Contenu dynamique */
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data1-container h3 {
  font-size: 20px;
  margin-bottom: 10px;
}
.data1-container ul {
  list-style-type: none;
  padding-left: 0;
  font-size: 14px;
}

.graph2-text {
  text-align: center;
}

.data-text-right {
  text-align: right;
  font-size: 14px;
  color: #555;
}

.pie-chart-container {
  width: 200px;
  height: 200px;
}

/* Texte Data 3 */
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

/* Media Queries */
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
    font-size: 12px;
    padding: 8px 16px;
  }

  .section-title h2 {
    font-size: 20px;
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
    padding: 6px 12px;
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
