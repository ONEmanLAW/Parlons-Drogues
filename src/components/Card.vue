<template>
  <div class="chapter" ref="chapterContainer">
    <div 
      class="question-label" 
      :style="getBackgroundColor"
    >
      Question
    </div>

    <div class="chapter-header" ref="chapterHeader">
      <h2>{{ chapter.title }}</h2>
      <p>{{ chapter.description }}</p>
    </div>

    <div class="card-container" ref="cardContainer">
      <div
        v-for="(card, index) in chapter.cards"
        :key="index"
        class="card"
        @click="toggleFlip(index)"
        :ref="el => setCard(el, index)"
      >
        <div :class="['card-inner', { flipped: flippedStates[index] }]">
          <div class="card-front">
            <div class="icon-container">
              <img :src="card.icon" alt="Icon" class="card-icon" />
            </div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>

          <div class="card-back">
            <h3>{{ card.title }}</h3>
            <div class="donut-chart-container" :ref="el => setDonutContainer(el, index)"></div>
            <div class="data-container">
              <p>{{ card.backDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import * as d3 from 'd3';
import cardsData from '../data/cardsData.json';

const props = defineProps({
  chapterId: Number,
});

const chapter = ref({});
const flippedStates = ref([]);
const donutChartContainers = ref([]);
const chapterHeader = ref(null);
const cardContainer = ref(null);
const cards = ref([]);
const chapterContainer = ref(null);


onMounted(() => {
  const selectedChapter = cardsData.chapters.find((ch) => ch.id === props.chapterId);
  if (selectedChapter) {
    chapter.value = selectedChapter;
    flippedStates.value = Array(selectedChapter.cards.length).fill(false);
  }
  observeScroll();
});


const getBackgroundColor = computed(() => {
  const chapterId = props.chapterId;
  if (!chapterId) return { backgroundColor: '#999' };

  switch (chapterId) {
    case 1:
      return { backgroundColor: '#007BFF' };
    case 2:
      return { backgroundColor: '#28A745' }; 
    case 3:
      return { backgroundColor: '#FF69B4' }; 
    default:
      return { backgroundColor: '#999' }; 
  }
});

const setCard = (el, index) => {
  if (el) {
    cards.value[index] = el;
  }
};

const setDonutContainer = (el, index) => {
  if (el) {
    donutChartContainers.value[index] = el;
  }
};

const toggleFlip = (index) => {
  flippedStates.value[index] = !flippedStates.value[index];
  const cardElement = document.querySelectorAll('.card-inner')[index];
  gsap.to(cardElement, {
    rotateY: flippedStates.value[index] ? 180 : 0,
    duration: 0.4,
    ease: 'power1.inOut',
  });
};

const drawDonutCharts = () => {
  chapter.value.cards.forEach((card, index) => {
    const container = donutChartContainers.value[index];
    if (!container) return;

    d3.select(container).selectAll('*').remove();

    const width = 150;
    const height = 150;
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius);

    const pie = d3.pie().value((d) => d);
    const data = [card.donutPercentage, 100 - card.donutPercentage];

    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => (i === 0 ? '#4caf50' : '#ddd'));

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .text(card.centerText || `${card.donutPercentage}%`);
  });
};

onMounted(async () => {
  await nextTick();
  drawDonutCharts();
});

const animateElements = () => {
  gsap.from(chapterHeader.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power1.out',
  });


  gsap.from(cards.value, {
    opacity: 0,
    x: -100,
    stagger: 0.2,
    duration: 1,
    ease: 'power1.out',
  });
};

const observeScroll = () => {
  const options = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.4,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElements();
        observer.disconnect();
      }
    });
  }, options);

  if (chapterContainer.value) {
    observer.observe(chapterContainer.value);
  }
};
</script>

<style scoped src="../styles/Card.css"></style>
