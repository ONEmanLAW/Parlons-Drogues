<template>
  <div :class="`chapter-${props.chapterId}`" class="chapter" ref="chapterContainer">
    <div 
      class="question-label" 
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

<style scoped>
.chapter {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.chapter-header {
  text-align: center;
  margin-bottom: 20px;
}

.chapter-header h2 {
  font-size: 24px;
  font-weight: bold;
}

.chapter-header p {
  font-size: 16px;
  color: #555;
}

.question-label {
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: inline-block;
}



.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 100vh;
  padding-right: 15px;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.card {
  width: 300px;
  height: 450px;
  perspective: 1000px;
  margin: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.card-front {
  background-color: #fff;
  flex-direction: column;
  text-align: center;
}

.icon-container {
  margin-bottom: 10px;
}

.card-icon {
  width: 60px;
  height: 60px;
}

.card-back {
  background-color: #f0f0f0;
  transform: rotateY(180deg);
  flex-direction: column;
  text-align: center;
}

.donut-chart-container {
  margin: 20px 0;
}

.data-container {
  margin: 20px 0;
}

.card-front h3,
.card-back h3 {
  font-size: 24px;
  font-weight: bold;
}

.card-front p,
.card-back p {
  font-size: 18px;
  color: #666;
}

@media (max-width: 1200px) {
  .card-container {
    justify-content: center;
    gap: 20px;
  }
}

@media (max-width: 800px) {
  .card-container {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .card-container {
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .card-container {
    justify-content: center;
  }
}

.chapter-1 .question-label {
  background-color: #A4E1FF;
  color: #3135B7;
}

.chapter-2 .question-label {
  background-color: #BCFFC8;
  color: #167540;
}

.chapter-3 .question-label {
  background-color: #FFC9EA;
  color: #AC0266;
}
</style>
