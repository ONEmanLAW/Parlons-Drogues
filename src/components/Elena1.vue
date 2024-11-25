<template>
  <div class="page-container">
    <div class="info-header">
      <span class="info-badge">Informations</span>
      <h1>ÉLENA ET SES PREMIÈRES BOUFFÉES</h1>
    </div>
    <div class="info-cards">
      <div class="card card-left">
        <div class="card-content">
          <h2>18 MILLIONS</h2>
          <p>C'est le nombre de personnes en France qui a au moins une fois dans sa vie consommé du cannabis.</p>
        </div>
        <div class="map-icon"></div>
      </div>

      <div class="card card-right">
        <div class="card-content">
          <h2>39%</h2>
          <p>Ont déjà testé le cannabis à 17 ans.</p>
        </div>
        <div class="girl-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Elena1",
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #e6f2ff;
  font-family: Montserrat;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('../assets/images/background-image.jpg');
  background-size: cover;
  background-position: center; 
}

.info-header {
  text-align: center;
  margin-bottom: 10px;
}

.info-badge {
  display: inline-block;
  background-color: #d8ebff;
  color: #333;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}

h1 {
  font-size: 32px;
  color: #222;
  margin-bottom: 20px;
}

.info-cards {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap; 
  align-items: center;
  gap: 60px;
  position: relative;
  margin-right: 300px;
}

.card {
  background-color: #1e3a8a;
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  width: 500px;
  height: 200px;
  position: relative;
  text-align: left;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-content {
  width: 60%;
}

.card-content h2 {
  font-size: 40px;
  margin: 0 0 10px 0;
  color: #4a90e2;
}

.card-content p {
  font-size: 20px;
  line-height: 1.6;
  margin: 0;
}

.card-right {
  transform: rotate(5deg);
  margin-left: 550px;
}

.map-icon {
  width: 300px;
  height: 300px;
  background: url('../assets/images/carte-france.png') no-repeat center;
  background-size: contain;
  position: absolute;
  right: 0;
  bottom: 8px;
}

.girl-icon {
  width: 250px;
  height: 250px;
  background: url('../assets/images/elena1.png') no-repeat center;
  background-size: contain;
  position: absolute;
  right: 40px;
  bottom: 40px;
}

@media (max-width: 768px) {
  .page-container {
    background-position: top;
  }

  .info-cards {
    flex-direction: column; 
    gap: 20px;
    margin-right: 0; 
  }

  .card {
    width: 90%; 
    height: auto;
    padding: 20px;
    flex-direction: column; 
    justify-content: flex-start; 
  }

  .card-content {
    width: 100%;
    padding-bottom: 20px;
  }

  .card-right {
    transform: rotate(5deg);
    margin-left: 0;
  }

  .map-icon,
  .girl-icon {
    width: 200px;
    height: 200px;
    position: relative;
    margin-top: 20px;
  }

  .map-icon {
    margin-bottom: 20px; 
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 26px;
  }

  .card-content h2 {
    font-size: 28px;
  }

  .card-content p {
    font-size: 16px;
  }

  .map-icon,
  .girl-icon {
    width: 150px;
    height: 150px;
  }
}
</style>
