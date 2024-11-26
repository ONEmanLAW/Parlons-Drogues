<template>
  <div class="body-chart">
    <div class="body-buttons">
      <button
        v-for="part in bodyParts"
        :key="part.id"
        :style="{ backgroundColor: part.color }"
        @click="selectBodyPart(part)"
        class="body-button"
      >
        {{ part.name }}
      </button>
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
          <img :src="`/assets/images/${selectedBodyPart.image}`" alt="" class="body-image" />
          <div class="body-title" :style="{ color: selectedBodyPart.color }">
            {{ selectedBodyPart.name }}
          </div>
        </div>

        <div v-if="selectedBodyPart.data.text" class="body-description">
          {{ selectedBodyPart.data.text }}
        </div>
        
        <div v-else>
          <div class="body-name" :style="{ color: selectedBodyPart.color }">
            {{ selectedBodyPart.name }}
          </div>
          <div ref="pieChart" class="pie-chart"></div>
        </div>
      </div>

      <div v-if="!selectedBodyPart.data.text" class="progress-bar-container">
        <div class="progress-bar-background">
          <div
            class="progress-bar-fill"
            :style="{
              width: progressBarWidth + '%',
              backgroundColor: selectedBodyPart.color
            }"
          >
            <span class="progress-label">{{ progressBarWidth }}%</span>
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
const selectedDataByPart = ref({});
const selectedData = ref("data1");
const pieChart = ref(null);
const progressBarWidth = ref(0);

const selectBodyPart = (part) => {
  selectedBodyPart.value = part;
  selectedData.value = selectedDataByPart.value[part.id] || 'data1';

  if (!selectedBodyPart.value.data.text) {
    updatePieChart();
    updateProgressBar();
  }
};

const selectData = (dataType) => {
  if (selectedBodyPart.value) {
    selectedData.value = dataType;
    selectedDataByPart.value[selectedBodyPart.value.id] = dataType;

    updatePieChart();
    updateProgressBar();
  }
};

const updatePieChart = () => {
  nextTick(() => {
    const pieContainer = d3.select(pieChart.value);
    pieContainer.selectAll("*").remove();

    if (!selectedBodyPart.value || !selectedBodyPart.value.data) return;
    const data = selectedBodyPart.value.data[selectedData.value];
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
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(i(t));
        };
      });
  });
};

const updateProgressBar = () => {
  if (selectedBodyPart.value && selectedBodyPart.value.data && selectedData.value) {
    const data = selectedBodyPart.value.data[selectedData.value];
    if (data && data[0] && data[0].value !== undefined) {
      progressBarWidth.value = data[0].value;
    } else {
      progressBarWidth.value = 0;
    }
  }
};

onMounted(() => {
  updatePieChart();
});
</script>

<style scoped>
/* Styles similaires aux précédents */
.body-chart {
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

.body-buttons {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.body-button {
  padding: 10px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
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
  justify-content: center;
}

.body-description {
  font-size: 16px;
  text-align: center;
  color: #555;
  margin-bottom: 20px;
}

.body-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.body-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.body-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.pie-chart {
  margin-bottom: 20px;
}

.progress-bar-container {
  width: 100%;
  background-color: #eee;
  border-radius: 5px;
  height: 20px;
  margin-top: 10px;
}

.progress-bar-background {
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 1s ease-out;
}

.progress-label {
  color: white;
  font-weight: bold;
  font-size: 14px;
}
</style>
