<template>
  <div class="quiz">
    <h2>Quiz sur les drogues</h2>

    <div v-if="currentQuestionIndex < questions.length">
      <p>{{ questions[currentQuestionIndex].question }}</p>
      <button class="true-button" @click="answerQuestion(true)">Vrai</button>
      <button class="false-button" @click="answerQuestion(false)">Faux</button>
    </div>
    
    <div v-else>
      <h3>Résultats</h3>
      <div ref="chartContainer" class="chart-container"></div>
      <button @click="restartQuiz" class="restart-button">Recommencer</button>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as d3 from 'd3';
import questionsData from '../data/questions.json';


const questions = questionsData.questions;
const currentQuestionIndex = ref(0);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);


const chartContainer = ref(null);


const answerQuestion = (userAnswer) => {
  const correctAnswer = questions[currentQuestionIndex.value].correctAnswer;
  if (userAnswer === correctAnswer) {
    correctAnswers.value++;
  } else {
    incorrectAnswers.value++;
  }

  currentQuestionIndex.value++;
  if (currentQuestionIndex.value >= questions.length) {
    nextTick(() => createPieChart());
  }
};


const createPieChart = () => {
  const data = [
    { label: "Correct", value: correctAnswers.value },
    { label: "Incorrect", value: incorrectAnswers.value }
  ];

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  
  d3.select(chartContainer.value).selectAll("*").remove();


  const svg = d3.select(chartContainer.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(["#4caf50", "#f44336"]);

  const pie = d3.pie().value(d => d.value);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

 
  svg.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.label))
    .attr("stroke", "#fff")
    .style("stroke-width", "2px");


  svg.selectAll("text")
    .data(pie(data))
    .enter()
    .append("text")
    .text(d => `${d.data.label}: ${d.data.value}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#fff"); 
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  correctAnswers.value = 0;
  incorrectAnswers.value = 0;
};
</script>



<style scoped src="../styles/Quiz.css"></style>
