<template>
  <div class="page-container">
    <div class="info-header">
      <span class="info-badge">Informations</span>
      <h1>RAPH FACE À L'ADDICTION</h1>
    </div>

    <div class="info-sections">

      <div class="card main-card">
        <div class="card-content">
          <h2>DÉPENDANCE</h2>
          <p>
            C'est quand t’as tout le temps besoin de fumer du cannabis, même si ça commence à détruire des trucs dans ta vie, genre tes potes, tes études, ton taf ou ta santé. C’est comme si t’arrivais plus à t’arrêter, même en sachant que ça peut te causer des problèmes.
          </p>
        </div>
        <div class="main-card-image"></div>
      </div>

      <div class="secondary-cards">
        <div class="card secondary-card rotate-left">
          <div class="image-container">
            <div class="image-icon"></div>
          </div>
        </div>
        <div class="card secondary-card rotate-right">
          <h2>50%</h2>
          <p>C’est le risque de devenir accro si tu fumes du cannabis tous les jours.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Raph1",
};
</script>

<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ECFFF4;
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
  background-color: #BCFFC8;
  color: #167540;
  font-weight: bold;
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


.info-sections {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card {
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #167540;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}


.main-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px; 
  height: 250px; 
}

.main-card .card-content {
  flex: 1; 
}

.main-card h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #BCFFC8;
}

.main-card p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}


.main-card-image {
  width: 200px;
  height: 200px;
  background: url('../assets/images/raph-boulet.png') no-repeat center;
  background-size: contain;
  flex-shrink: 0; 
}


.secondary-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.secondary-card {
  background-color: #167540;
  color: white;
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  position: relative;
  overflow: hidden; 
}


.rotate-left {
  transform: rotate(-5deg);
}

.rotate-right {
  transform: rotate(5deg);
}

.secondary-card h2 {
  font-size: 2rem;
  margin: 0 0 10px;
}

.secondary-card p {
  font-size: 1rem;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-icon {
  width: 220px; 
  height: 220px;
  position: absolute;
  top: -30px; 
  left: 50%; 
  transform: translateX(-50%);
  background: url('../assets/images/raph-joint.png') no-repeat center;
  background-size: contain;
}


@media (max-width: 768px) {
  .main-card {
    flex-direction: column;
    height: auto;
    text-align: center;
  }

  .main-card .card-content {
    text-align: center; 
    margin-bottom: 20px; 
  }

  .main-card-image {
    margin-top: 20px;
    width: 180px;
    height: 180px;
  }

  .secondary-cards {
    flex-direction: column;
  }

  .rotate-left,
  .rotate-right {
    transform: none; 
  }

  .image-icon {
    width: 180px; 
    height: 180px;
  }
}
</style>
