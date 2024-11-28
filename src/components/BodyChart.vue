<template>
  <div class="body-chart">
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
          <div v-if="selectedBodyPart.image" class="image-container">
            <img
              :src="`/assets/images/${selectedBodyPart.image}`"
              alt="Image of {{ selectedBodyPart.name }}"
              class="body-image"
            />
            <div class="body-title" :style="{ color: selectedBodyPart.color }">
              {{ selectedBodyPart.name }}
            </div>
          </div>

          <div v-if="selectedBodyPart.data.text" class="body-description">
            {{ selectedBodyPart.data.text }}
          </div>

          <div v-else>
            <!-- Data 1 -->
            <div v-if="selectedData === 'data1'" class="data1-container">
              <h3>{{ selectedBodyPart.data.data1.title }}</h3>
              <p>{{ selectedBodyPart.data.data1.textIntro }}</p> 
              <ul>
                <li v-for="(item, index) in selectedBodyPart.data.data1.text" :key="index">
                  {{ index + 1 }}. {{ item }}
                </li>
              </ul>
            </div>

            <!-- Data 2 -->
            <div v-if="selectedData === 'data2'" class="data2-container">
              <h3>{{ selectedBodyPart.data.data2.title }}</h3>
              <div class="pie-chart-container">
                <div ref="pieChart" class="pie-chart"></div>
              </div>
              <div class="data-text-right">
                <p>{{ selectedBodyPart.data.data2.text }}</p> 
              </div>
            </div>

            <!-- Data 3 -->
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
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: space-between; 
  width: 90%;
  align-items: center;
}

.left-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  margin-bottom: 20px;
}

.body-image {
  width: 300px;
  height: 500px;
  object-fit: contain;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 15px; 
  margin-left: 20px;
}

.body-button {
  padding: 10px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);  
  transition: background-color 0.3s;
}

.body-button:hover {
  background-color: rgba(0, 0, 0, 0.7);  
}

.right-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.page-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

.tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  gap: 5px;
}

.tab {
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background-color: #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.tab.active {
  background-color: #00aaff;
  color: white;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pie-chart-container {
  width: 250px;
  height: 250px;
}

.data-text-right {
  font-size: 16px;
  text-align: right;
  color: #333;
}

.large-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.small-text-top, .small-text-bottom {
  font-size: 14px;
  color: #555;
}
</style>
