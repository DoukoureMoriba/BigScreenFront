<script>
export default {
  data() {
    return {
      loading: true, // Je définis l'état initial du chargement sur true
    };
  },
  mounted() {
    // J'utilise setTimeout pour simuler un chargement de 2 secondes
    setTimeout(() => {
      this.loading = false; // Lorsque le chargement est terminé, je définis loading sur false
    }, 3000); // 3000 millisecondes équivalent à 3 secondes
  },
};
</script>

<template>
  <div>
    <!-- J'affiche le loader si loading est true -->
    <div v-if="loading" class="loading-overlay">
      <!-- Vous pouvez personnaliser le contenu de votre loader ici -->
      <div class="loading-wave">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>

    <!-- J'affiche le contenu de la page lorsque loading est false -->
    <div v-else>
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img src="img/bigscreen_logo_black.png" alt="logo" style="height: 40px;">
      </a>
      <header id="showCase">
        <h1>Bienvenue sur BigScreen</h1>
        <p>Bigscreen est une entreprise qui développe une application VR permettant aux utilisateurs de regarder <mark>des films, émissions TV et jeux vidéos, en réalité virtuelle </mark> (VR) sur un écran géant virtuel, seul ou à plusieurs</p>
        <router-link to="/question">
          <button class="learn-more">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Voir sondage</span>
          </button>
        </router-link>
      </header>
    </div>
  </div>
</template>

<style>
/* Styles CSS restent inchangés */
</style>
