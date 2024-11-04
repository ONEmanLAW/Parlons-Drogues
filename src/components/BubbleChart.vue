<template>
  <div ref="chartContainer" class="bubble-chart"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import bubbleData from '../data/bubbleData.json';

const chartContainer = ref(null);

onMounted(() => {
  createBubbleChart();
});

function createBubbleChart() {
  const data = bubbleData.bubbles;

  const width = 600;
  const height = 400;

  const svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const maxRadius = 80;

  const scaleRadius = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.value)])
    .range([10, maxRadius]);

  const centerX = width / 2;
  const centerY = height / 2;
  const angleStep = (2 * Math.PI) / data.length;

  data.forEach((d, i) => {
    const angle = i * angleStep;
    const radius = scaleRadius(d.value);

    const x = centerX + Math.cos(angle) * (maxRadius + 10);
    const y = centerY + Math.sin(angle) * (maxRadius + 10);

    svg
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', radius)
      .attr('fill', d3.schemeCategory10[i % 10]);

    svg
      .append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', '12px')
      .attr('fill', '#fff')
      .text(d.label);
  });
}
</script>

<style src="../styles/BubbleChart.css"></style>
