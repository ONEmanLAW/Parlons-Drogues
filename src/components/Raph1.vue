<template>
  <div class="interactive-character">
    <div class="title-container">
      <!-- Badge d'information au-dessus du titre -->
      <div class="info-badge">Graphique</div>
      
      <h2>Les conséquences de la dépendance au cannabis</h2>
      
      <p class="description">
        Être accro, ça peut détruire tes études, semer la pagaille en famille, t'éloigner de tes amis et ruiner ton boulot. Au final, c’est toute ta vie qui part en vrille.
      </p>
    </div>

    <div class="card-container">
      <div class="card">
        <div class="character-container">
          <div class="character">
            <img v-if="!activeSubstance" :src="currentImage" alt="Image de base" />
            <img v-if="activeSubstance" :src="currentImage" alt="Substance Image" />
          </div>

          <div class="buttons-container">
            <button
              v-for="substance in substancesToDisplay"
              :key="substance.name"
              :class="{ active: activeSubstance === substance }"
              @click="selectSubstance(substance)"
            >
              {{ substance.name }}
            </button>
          </div>
        </div>

        <div class="data-display">
          <div v-for="(effect, index) in currentEffects" :key="index" class="data-item">
            <!-- Cercle visuel -->
            <div class="circle-container">
              <div class="outer-circle" :style="{ width: calculateOuterSize(effect.value), height: calculateOuterSize(effect.value) }"></div>
              <div class="inner-circle">
                <span class="percentage">{{ effect.value }}%</span>
              </div>
            </div>

            <!-- Texte explicatif -->
            <p class="data-title">{{ effect.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import "../styles/InteractiveCharacter.css";
import substancesData from "../data/substances.json";

const substances = ref(substancesData.substances);
const activeSubstance = ref(null);
const baseSubstance = computed(() =>
  substances.value.find((substance) => substance.name === "Image de base")
);
const substancesToDisplay = computed(() => {
  return substances.value.filter((substance) => substance.name !== "Image de base");
});

const baseImage = baseSubstance.value.image;
function resolveImagePath(path) {
  return new URL(path, import.meta.url).href;
}

const currentImage = computed(() => {
  return activeSubstance.value ? resolveImagePath(activeSubstance.value.image) : resolveImagePath(baseImage);
});

const currentEffects = computed(() => {
  return activeSubstance.value ? activeSubstance.value.effects : baseSubstance.value.effects;
});

function selectSubstance(substance) {
  activeSubstance.value = activeSubstance.value === substance ? null : substance;
}

// Calcul des tailles de cercles
function calculateOuterSize(value) {
  const baseSize = 100; // Taille de base (px)
  const scalingFactor = 0.5; // Augmente de 0.5px par pourcentage
  const maxSize = 100; // Taille maximale (100%)
  
  // Si la valeur dépasse 100%, on limite la taille du cercle à la taille de base (100%)
  return `${Math.min(baseSize + value * scalingFactor, baseSize + maxSize * scalingFactor)}px`;
}
</script>

<style scoped>
/* Structure principale */
.interactive-character {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.info-badge {
  display: inline-block;
  background-color: #BCFFC8;
  color: #167540;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

/* Titre avec un max-width et retour à la ligne si nécessaire */
h2 {
  font-size: 2rem;
  color: #167540;
  font-weight: bold;
  margin: 0;
  max-width: 100%;  /* Limite la largeur */
  word-wrap: break-word; /* Permet au texte de se couper et passer à la ligne */
  white-space: normal; /* Autorise les retours à la ligne */
  text-align: center;  /* Centre le texte */
}

.description {
  font-size: 1.2rem;
  color: #555;
  margin-top: 5px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  overflow: hidden;
  flex-grow: 1;
}

.card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1100px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

/* Séparateurs de caractère et bouton */
.character-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
}

.character {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
}

.character img {
  width: 100%;
  height: auto;
  max-width: 265px;
  border-radius: 10px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.buttons-container button {
  margin: 0;
  background-color: white;
  color: #167540;
  font-weight: bold;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: 2px solid #167540;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.buttons-container button.active {
  background-color: #167540;
  color: white;
}

/* Affichage des données */
.data-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  max-height: 220px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  overflow-y: hidden;
}

.data-display::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.data-display::-webkit-scrollbar-thumb {
  background-color: #167540;
  border-radius: 10px;
}

.data-display::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  border-radius: 10px;
}

.data-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%;
  height: 230px;
  padding: 18px;
  box-sizing: border-box;
}

.data-title {
  font-size: 1.1rem;
  margin: 20px 0 0 0;
  word-wrap: break-word;
  white-space: normal;
  max-width: 200px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
}

/* Cercles */
.circle-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px; /* Taille de base */
  height: 120px;
  
}

.outer-circle {
  position: absolute;
  border: 8px solid #BCFFC8; /* Couleur verte pâle */
  border-radius: 50%;
  box-sizing: border-box;
  transition: width 0.3s ease, height 0.3s ease;
  z-index: 1; /* Cercle extérieur sous le texte */
 
}

.inner-circle {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #ECFFF4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

/* Déplacement du texte au-dessus de tout, y compris les cercles */
.percentage {
  position: absolute;
  top: -40px;  /* Décalage du chiffre vers le haut pour qu'il soit bien visible */
  font-size: 1.2rem;
  font-weight: bold;
  color: #167540;
  text-align: center;
  width: 100%;
  z-index: 2;  /* Assurer que le texte soit au-dessus des cercles */
}
</style>
