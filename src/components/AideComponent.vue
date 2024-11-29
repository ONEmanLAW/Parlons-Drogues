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
  justify-content: space-between; 
  height: 100vh;
  padding: 20px;
  background-color: #FFF2E5;
  font-family: Montserrat;
  color: #333;
  box-sizing: border-box;
}



.aide-label {
  display: inline-block;
  background-color:  #FFD6AB;
  color: #FF7424;
  font-weight: bold;
  padding: 5px 35px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center; 
  flex-wrap: wrap;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 20px;
  flex-grow: 1; 
  height: 100%; 
}

.info-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 460px;
  min-height: 500px;
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
}

.card-content {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-content li {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  margin-bottom: 25px;
  align-items: center;
}

.card-content li .text {
  font-size: 22px;
}

.card-content li .text strong {
  font-size: 22px;
  display: block;
  margin-bottom: 10px;
}

.card-content li .text p {
  font-size: 20px;
  margin: 0;
}

.card-content a {
  text-decoration: none;
  font-size: 20px;
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

.retour-container {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.retour-button {
  background-color: #fff;
  color: #FF7424;
  border: 3px solid #FF7424;
  border-radius: 25px;
  padding: 20px 40px;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  width: auto;
  margin: 0 auto;
}

.retour-button:hover {
  background-color: #FF7424;
  color: #fff;
}
</style>
