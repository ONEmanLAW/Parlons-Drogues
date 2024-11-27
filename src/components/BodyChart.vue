<template>
  <div class="body-chart">
    <div class="body-container">
      <div class="image-container">
        <img
          :src="`../assets/images/persoInes.png`"
          alt="Image du corps humain"
          class="body-image"
        />

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
    </div>

    <div class="page-container" v-if="selectedBodyPart">
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
          <div v-if="selectedData === 'data1'" class="data1-container">
            <h3>{{ selectedBodyPart.data.data1.title }}</h3>
            <p>{{ selectedBodyPart.data.data1.textIntro }}</p> 
            <ul>
              <li v-for="(item, index) in selectedBodyPart.data.data1.text" :key="index">
                {{ index + 1 }}. {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="selectedData === 'data2'" class="data2-container">
            <h3>{{ selectedBodyPart.data.data2.title }}</h3>
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
  justify-content: flex-start;
  padding: 20px;
}

.body-container {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.image-container {
  position: relative;
}

.body-image {
  width: 300px;
  height: 500px;
  object-fit: contain;
}

.buttons-container {
  position: absolute;
  top: 50%;  
  left: 10%;  
  transform: translateY(-50%);  
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.body-button {
  padding: 10px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);  
  border-radius: 5px;
  transition: background-color 0.3s;
}

.body-button:hover {
  background-color: rgba(0, 0, 0, 0.7);  
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
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
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.tab.active {
  background-color: #333;
  color: white;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.data1-container, .data2-container, .data3-container {
  width: 100%;
}

.data-text-right {
  font-size: 16px;
  text-align: right;
}

.pie-chart-container {
  width: 250px;
  height: 250px;
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
