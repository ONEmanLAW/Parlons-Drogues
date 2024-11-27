<template>
  <div v-if="currentChapterData" :class="`container`" :style="{ backgroundColor: currentChapterData.color }">
    <div :class="`text-section`">
      <div
        :class="`info-text`"
        :style="{ color: currentChapterData.infoTextColor, backgroundColor: currentChapterData.infoBackgroundColor }"
      >
        Informations
      </div>
      <h1>
        {{ currentChapterData.title.split(',')[0] }},<br />
        <span :style="{ color: currentChapterData.highlightOrange }">{{ currentChapterData.title.split(',')[1] }}</span>
      </h1>
      <p>
        {{ currentChapterData.paragraph }}
      </p>
    </div>
    <div :class="`image-section`">
      <img class="main-image" :src="currentChapterData.image" alt="Illustration" />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chapters from "../data/test.json";

export default {
  name: "Elena2",
  props: {
    currentChapter: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const currentChapterData = computed(() =>
      chapters.chapters.find((chapter) => chapter.id === props.currentChapter)
    );

    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".info-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });

      gsap.from(".text-section h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });

      gsap.from(".text-section p", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });

      gsap.from(".main-image", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });
    });

    return {
      currentChapterData
    };
  }
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #e6f0ff;
  padding: 2% 5%;
  box-sizing: border-box;
  gap: 20px;
  flex-wrap: wrap;
}

.text-section {
  flex: 1;
  max-width: 650px;
  min-width: 280px;
  padding-right: 20px;
  margin-bottom: 30px;
}

.info-text {
  display: inline-block;
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  font-weight: bold;
  color: #ffffff;
  background-color: #5eafef;
  padding: 5px 15px;
  border-radius: 20px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.text-section h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  line-height: 1.4;
  color: #2e2f85;
  margin: 0;
  font-weight: bold;
}

.text-section h1 .highlight-orange {
  color: #ff6d00;
}

.text-section h1 .highlight-blue {
  color: #2e2f85;
}

.text-section p {
  margin-top: 20px;
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: #333333;
}

.text-section p .highlight {
  color: #2e2f85;
  font-weight: bold;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
}

.main-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .text-section {
    padding-right: 0;
    margin-bottom: 0;
  }

  .image-section {
    margin-top: 20px;
    width: 100%;
    max-width: 100%;
  }
}
</style>
