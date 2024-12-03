<template>
  <div :class="`chapter-${props.chapterId}`" class="chapter" ref="chapterContainer">
    <div :class="`question-label chapter-${props.chapterId}-label`">Question</div>

    <div class="chapter-header" ref="chapterHeader">
      <h2 :class="chapterTitleClass">{{ chapter.title }}</h2>
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
          <!-- Face avant -->
          <div class="card-front">
            <div class="icon-container">
              <img :src="card.icon" alt="Icon" class="card-icon" />
            </div>
            <h3 :class="cardTitleClass">{{ card.title }}</h3>
            <p class="card-text">{{ card.description }}</p>
          </div>

          <!-- Face arrière -->
          <div class="card-back">
            <div class="back-content">
              <h3 :class="cardTitleClass">Réponse</h3>
              <div class="donut-chart-container" :ref="el => setDonutContainer(el, index)"></div>
              <div class="data-container">
                <p class="card-text">{{ card.backDescription }}</p>
              </div>
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

const getChapterColor = () => {
  switch (props.chapterId) {
    case 1:
      return '#3135B7'; // Bleu
    case 2:
      return '#167540'; // Vert
    case 3:
      return '#AC0266'; // Rose
    default:
      return '#000'; // Noir par défaut
  }
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
      .attr('fill', (d, i) => (i === 0 ? getChapterColor() : '#ddd'));

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

const chapterTitleClass = computed(() => {
  switch (props.chapterId) {
    case 1:
      return 'chapter-title-blue';
    case 2:
      return 'chapter-title-green';
    case 3:
      return 'chapter-title-pink';
    default:
      return '';
  }
});

const cardTitleClass = computed(() => {
  switch (props.chapterId) {
    case 1:
      return 'card-title-blue';
    case 2:
      return 'card-title-green';
    case 3:
      return 'card-title-pink';
    default:
      return '';
  }
});
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
  font-size: 48px;
  font-weight: 800;
}

.chapter-header p {
  font-size: 24px;
  color: #555;
  font-weight: 550;
  max-width: 770px;
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

.chapter-1-label {
  background-color: #A4E1FF; 
  color: #3135B7;
}

.chapter-2-label {
  background-color: #BCFFC8; 
  color: #167540;
}

.chapter-3-label {
  background-color: #FFC9EA; 
  color: #AC0266;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 20px; /* Ajoute de l'espace entre les bords et le contenu */
  box-sizing: border-box;
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
  font-weight: 800;
}

.card-back .back-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
}

.card-back h3 {
  margin-top: 20px;
  text-align: center;
}

.card-text {
  font-size: 17px;
  color: #000; /* Noir pour le texte */
  padding: 10px;
  font-weight: 600;
}

.chapter-title-blue {
  color: #3135B7;
}

.chapter-title-green {
  color: #167540;
}

.chapter-title-pink {
  color: #AC0266;
}

.card-title-blue {
  color: #3135B7;
  font-weight: 800;
  font-size: 24px;
}

.card-title-green {
  color: #167540;
  font-weight: 800;
  font-size: 24px;
}

.card-title-pink {
  color: #AC0266;
  font-weight: 800;
}

</style>
