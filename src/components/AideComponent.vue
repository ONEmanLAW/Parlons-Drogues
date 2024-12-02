<template>
  <div class="aide-container">
    <div class="aide-label">Aide</div>

    <div class="cards-container">
      <div class="info-card">
        <h2 class="card-title">DROGUES INFO SERVICE</h2>
        <ul class="card-content">
          <li>
            <img class="icon" src="../assets/images/icone1orange.png" alt="Site" />
            <div class="text">
              <a href="https://drogues-info-service.fr" target="_blank">
                drogues-info-service.fr
              </a>
            </div>
          </li>
          <li>
            <img class="icon" src="../assets/images/icone2orange.png" alt="Téléphone" />
            <div class="text">
              <strong>0 800 23 13 13</strong>
              <p>Appel gratuit et anonyme disponible 7j/7 de 8h à 2h</p>
            </div>
          </li>
          <li>
            <img class="icon" src="../assets/images/icone3orange.png" alt="Chat" />
            <div class="text">
              <strong>Chat en ligne</strong>
              <p>
                Discuter avec des professionnels disponible de 14h à minuit du
                lundi au vendredi et de 14h à 20h le weekend.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="info-card">
        <h2 class="card-title">GROUPE D’ENTRAIDE ET FORUM</h2>
        <ul class="card-content">
          <li>
            <img class="icon" src="../assets/images/icone4orange.png" alt="Forum" />
            <div class="text">
              <strong>Narcotiques Anonymes</strong>
              <p>
                Propose des réunions anonymes pour les consommateurs souhaitant
                se libérer de leur addiction :
                <a
                  href="https://www.narcotiquesanonymes.org/"
                  target="_blank"
                >
                  www.narcotiquesanonymes.org
                </a>
              </p>
            </div>
          </li>
          <li>
            <img class="icon" src="../assets/images/icone5orange.png" alt="Forum" />
            <div class="text">
              <strong>Forum Addict’AIDE</strong>
              <p>
                Cet espace anonymisé permet aux consommateurs ou à leurs proches
                de partager leurs expériences et de recevoir un soutien entre
                pairs :
                <a href="https://www.addictaide.fr/" target="_blank">
                  www.addictaide.fr
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

     <router-link to="/home" class="retour-button">
      Retour aux chapitres
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AideComponent",
  methods: {
    retourChapitres() {
      this.$emit("retour");
    },
  },
};
</script>

<style scoped>
.aide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Alignement au haut */
  min-height: 100vh; /* Couvrir la hauteur de l'écran */
  padding: 20px;
  background-color: #FFF2E5;
  font-family: Montserrat, sans-serif;
  color: #333;
  box-sizing: border-box;
  overflow-x: hidden; /* Empêche le débordement horizontal */
}

.aide-label {
  display: inline-block;
  background-color: #FFD6AB; /* Fond coloré sous "Aide" */
  color: #FF7424;
  font-weight: bold;
  padding: 5px 35px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  max-width: 1100px; /* Limite la largeur maximale */
  justify-content: space-between;
  align-items: flex-start; /* Alignement des cartes en haut */
  margin-bottom: 20px;
  margin-top: 20px;
}

.info-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: calc(50% - 20px); /* Deux cartes côte à côte sur grands écrans */
  min-height: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
  text-transform: uppercase;
  text-align: center;
}

.card-content {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-content li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card-content li .text {
  font-size: 18px;
  word-wrap: break-word; /* Gère les longs textes */
}

.card-content li .text strong {
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
}

.card-content li .text p {
  font-size: 16px;
  margin: 0;
}

.card-content a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: black;
  position: relative;
}

.card-content a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease-in-out;
}

.card-content a:hover::after {
  width: 100%;
}

.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.retour-button {
  background-color: #fff;
  color: #FF7424;
  border: 3px solid #FF7424;
  border-radius: 25px;
  padding: 20px 40px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 20px;
}

.retour-button:hover {
  background-color: #FF7424;
  color: #fff;
}

/* MEDIA QUERIES */
@media (max-width: 1024px) {
  .info-card {
    width: 100%; /* Les cartes s'étendent sur toute la largeur */
  }
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column; /* Les cartes s'empilent verticalement */
    gap: 20px;
    align-items: center; /* Centrer les cartes */
  }

  .info-card {
    width: 90%; /* Adapte la largeur des cartes */
    min-height: auto; /* Pas de hauteur minimale */
  }

  .card-title {
    font-size: 20px;
  }

  .card-content li .text {
    font-size: 16px;
  }

  .card-content li .text strong {
    font-size: 16px;
  }

  .card-content a {
    font-size: 16px;
  }

  .retour-button {
    font-size: 16px;
    padding: 15px 30px;
  }
}

@media (max-width: 480px) {
  .aide-container {
    padding: 10px;
  }

  .aide-label {
    font-size: 12px;
    padding: 5px 20px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-content li {
    flex-direction: column; /* Empile les éléments de chaque ligne */
    gap: 10px;
    align-items: flex-start; /* Texte aligné à gauche */
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .retour-button {
    font-size: 14px;
    padding: 10px 20px;
  }
}

</style>
