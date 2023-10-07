<script>
export default {
  data() {
    return {
      loading: true, // Je définis l'état initial du chargement sur true.
    };
  },
  mounted() {
    // J'utilise setTimeout pour simuler un chargement de 2 secondes.
    setTimeout(() => {
      this.loading = false; // Lorsque le chargement est terminé, je définis loading sur false.
    }, 3000); 
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

* {
    margin:0;
    padding: 0;
}

body {
    font-family: arial sans-serif;
    font-size: 17px;
    color: white;
    line-height: 1.6;
}

/* Style pour le loader */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(img/display-oled.webp);
  z-index: 999; /* Pour être au-dessus du contenu */
  height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
}

.loading-wave {
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.loading-bar {
  width: 20px;
  height: 10px;
  margin: 0 5px;
  background-color: whitesmoke;
  border-radius: 5px;
  animation: loading-wave-animation 1s ease-in-out infinite;
}

.loading-bar:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-bar:nth-child(3) {
  animation-delay: 0.2s;
}

.loading-bar:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes loading-wave-animation {
  0% {
    height: 10px;
  }

  50% {
    height: 50px;
  }

  100% {
    height: 10px;
  }
}
/**fin style loader */

/*style pour l'image de fond */
#showCase {
    background-image: url(https://i.ytimg.com/vi/tH3ZVoj8cDg/maxresdefault.jpg);
    height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    pad: 0 20px;
}

/*fin style image de fond*/

/* style pour le bouton*/
button {
 position: relative;
 display: inline-block;
 cursor: pointer;
 outline: none;
 border: 0;
 vertical-align: middle;
 text-decoration: none;
 background: transparent;
 padding: 0;
 font-size: inherit;
 font-family: inherit;
}

button.learn-more {
 width: 12rem;
 height: auto;
}

button.learn-more .circle {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: relative;
 display: block;
 margin: 0;
 width: 3rem;
 height: 3rem;
 background: #282936;
 border-radius: 1.625rem;
}

button.learn-more .circle .icon {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: absolute;
 top: 0;
 bottom: 0;
 margin: auto;
 background: #fff;
}

button.learn-more .circle .icon.arrow {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 left: 0.625rem;
 width: 1.125rem;
 height: 0.125rem;
 background: none;
}

button.learn-more .circle .icon.arrow::before {
 position: absolute;
 content: "";
 top: -0.29rem;
 right: 0.0625rem;
 width: 0.625rem;
 height: 0.625rem;
 border-top: 0.125rem solid #fff;
 border-right: 0.125rem solid #fff;
 transform: rotate(45deg);
}

button.learn-more .button-text {
 transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 padding: 0.75rem 0;
 margin: 0 0 0 1.85rem;
 color: #282936;
 font-weight: 700;
 line-height: 1.6;
 text-align: center;
 text-transform: uppercase;
}

button:hover .circle {
 width: 100%;
}

button:hover .circle .icon.arrow {
 background: #fff;
 transform: translate(1rem, 0);
}

button:hover .button-text {
 color: #fff;
}
/*fin style pour le bouton */

/* pour les écrans de mobile */
    @media (max-width: 767px) {
        a {
    font-size: 17px;
    text-decoration: none

}

body {
     font-size: 14px;
}
    }

</style>