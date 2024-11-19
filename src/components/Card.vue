<template>
  <div class="card" @click="toggleFlip" ref="cardRef">
    <div :class="['card-inner', { flipped }]">
      <div class="card-front">
        <div class="icon-container">
          <img :src="icon" alt="Icon" class="card-icon" />
        </div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>

      <div class="card-back">
        <h3>{{ title }}</h3>
        <div class="donut-chart-container" ref="donutChartContainer">
        </div>
        <div class="data-container">
          <p>{{ backDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import * as d3 from 'd3';

const props = defineProps({
  title: String,
  description: String,
  backDescription: String, 
  icon: String,
  donutPercentage: Number, 
  centerText: String, 
});

const flipped = ref(false);
const cardRef = ref(null);
const donutChartContainer = ref(null);

const toggleFlip = () => {
  flipped.value = !flipped.value;
  gsap.to(cardRef.value.querySelector('.card-inner'), {
    rotateY: flipped.value ? 180 : 0,
    duration: 0.4,
    ease: "power1.inOut",
  });
};


const drawDonutChart = (percentage) => {
  const width = 150;
  const height = 150;
  const margin = 10;
  const radius = Math.min(width, height) / 2 - margin;

  
  const svg = d3.select(donutChartContainer.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const arc = d3.arc()
    .innerRadius(radius - 20)
    .outerRadius(radius);

  const pie = d3.pie()
    .value(d => d)
    .startAngle(0)
    .endAngle(2 * Math.PI); 

  const data = [percentage, 100 - percentage];

  svg.selectAll("path")
    .data(pie(data))
    .enter().append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => i === 0 ? "#4caf50" : "#ddd");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .attr("font-size", "18px")
    .text(props.centerText ? props.centerText : `${percentage}%`);
};

onMounted(() => {
  drawDonutChart(props.donutPercentage);
});
</script>

<style scoped src="../styles/Card.css"></style>
