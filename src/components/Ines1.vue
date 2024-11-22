<template>
  <div class="page-container">
    <div class="info-header">
      <span class="info-badge">Informations</span>
      <h1>LA SANTÉ D’INÈS EN PÉRIL</h1>
    </div>

    <div class="info-content">
      <div class="card top-card">
        <h2>900 000</h2>
        <p>
          C'est le nombre de gens qui fument du cannabis tous les jours en France. Ça fait de nous le pays numéro 1 en Europe niveau consommation.
        </p>
      </div>

      <div class="cannabis-leaf"></div>

      <div class="card bottom-card rotate">
        <h2>4,1</h2>
        <p>
          C’est le nombre de joints que les consommateurs réguliers fument par jour, soit environ 28 par semaine.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ines1",
};
</script>

<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffeef5;
  font-family: Arial, sans-serif;
  height: 100vh; 
  padding: 30px;
  box-sizing: border-box;
}


.info-header {
  text-align: center;
  margin-bottom: 20px;
}

.info-badge {
  display: inline-block;
  background-color: #fbcce0;
  color: #333;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

h1 {
  font-size: 2.5rem;
  color: #222;
  margin: 0;
}


.info-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 150px);
  gap: 50px; 
}


.card {
  background-color: #c53982;
  color: white;
  padding: 20px 30px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 2; 
}

.card h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.card p {
  font-size: 1rem;
  line-height: 1.6;
}


.top-card {
  position: relative;
  align-self: flex-start; 
}


.bottom-card {
  position: relative;
  align-self: flex-end; 
  margin-top: auto; 
}

.rotate {
  transform: rotate(-5deg); 
}


.cannabis-leaf {
  position: absolute;
  width: 750px; 
  height: 750px;
  background: url('../assets/images/canabis.png') no-repeat center;
  background-size: contain;
  top: 0%; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 1; 
}


@media (max-width: 768px) {
  .info-content {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%; 
  }

  .cannabis-leaf {
    width: 350px;
    height: 350px;
  }

  .rotate {
    transform: none;
  }
}
</style>
