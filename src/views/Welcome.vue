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
      setTimeout(() => {
        this.loading = false; // Lorsque le chargement est terminé, je définis loading sur false.
      }, 3000); // Durée de l'animation fade-out (ajustez si nécessaire)
   })
   },
};

</script>

<template>
  <div>

    <div v-if="loading" class="loading-overlay">
      <!-- Vous pouvez personnaliser le contenu de votre loader ici -->
      <div class="traffic-loader"></div>
    </div>


    <!-- J'affiche le contenu de la page lorsque loading est false -->
    <div v-else>
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img src="img/bigscreen_logo_black.png" alt="logo" style="height: 40px;">
      </a>
      <header id="showCase">
        <h1 class="welcome-ttl my-3 animate__animated animate__fadeInUp ">Bienvenue sur notre sondage !</h1>
        <p class="welcome-txt animate__animated animate__fadeInLeft ">Votre avis compte ! Participez à notre sondage et contribuez à l'amélioration de nos produits.</p>
        <router-link to="/question"> 
           <button class="btn-welc my-3 animate__animated animate__fadeInDown">Participer au sondage <i class="fa-solid fa-arrow-right"></i> </button>
        </router-link>
        
      </header>
    </div>
  </div>
</template>



<style>

@font-face {
    font-family: 'n-regular';
    src: url("public/fonts/Nunito-Regular.ttf");
}
@font-face {
    font-family: 'n-semi';
    src:  url("public/fonts/Nunito-SemiBold.ttf") format('truetype');
}
@font-face {
    font-family: 'n-bold';
    src: url("public/fonts/Nunito-Bold.ttf") format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/*Textes de l'accueil*/

.welcome-ttl{
    font-family: "n-bold";
    font-size: 50px;
    color: white;
    letter-spacing: 1.5px;
}
.welcome-txt{
    font-family: "n-semi";
    font-size: 35px;
    color: #757B7D;
    text-align: center;
}

/*Bouton de l'accueil*/

.btn-welc{
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-family: "n-semi";
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #4d1ef7;
  box-shadow: 0px 15px 20px rgba(77, 30, 247,0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}

/*animations titres pour l'accueil*/

.animate__animated.animate__fadeInLeft {
  --animate-duration: 3s;
}
.animate__animated.animate__fadeInDown{
  --animate-duration: 4s;
}


/* Style pour le loader */
.loading-overlay{
  position: fixed; /* Assure que l'overlay couvre toute la page */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #151515; /* Optionnel : ajoute un fond semi-transparent */
  z-index: 1000; /* Assure que l'overlay est au-dessus de tout autre contenu */
}

.traffic-loader {
  width: 50px;
  height: 50px;
  --c: radial-gradient(farthest-side, #fff 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 10px 10px;
  background-repeat: no-repeat;
  animation: s8 1s infinite;
  position: relative;
}

.traffic-loader::before {
  content: "";
  position: absolute;
  inset: 0;
  margin: 3px;
  background: repeating-conic-gradient(#0000 0 35deg, #fff 0 90deg);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
  border-radius: 50%;
}

@keyframes s8 {
  100% {
    transform: rotate(0.5turn);
  }
}

/**fin style loader */


/*style pour l'image de fond */
#showCase {
    background-color: #151515;
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
/* POUR LES MOBILES (Écrans ≤ 767px) */
@media (max-width: 767px) {
  /* Header */
  #showCase {
    padding: 10px; /* Ajout d'un padding pour éviter que le contenu touche les bords */
    height: 100vh; /* Permet au contenu de s'adapter */
    justify-content: center; /* Ajuste la position des éléments */
    align-items: center;
  }

  .welcome-ttl {
    font-size: 28px; /* Réduction de la taille du titre */
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .welcome-txt {
    font-size: 18px; /* Réduction du texte descriptif */
    margin-bottom: 15px;
    text-align: center; /* Alignement pour un rendu lisible */
  }

  .btn-welc {
    font-size: 12px; /* Réduction de la taille du texte */
    padding: 10px 20px; /* Réduction du padding pour un meilleur ajustement */
  }

  img {
    width: 80%; /* Redimensionne l'image pour s'adapter à l'écran */
    max-width: 300px; /* Limite la taille maximale de l'image */
    height: auto;
  }
}

/* POUR LES TABLETTES (Écrans entre 768px et 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Header */
  #showCase {
    padding: 20px; /* Légèrement plus de padding que mobile */
    height: 100vh;
    justify-content: center;
  }

  .welcome-ttl {
    font-size: 40px; /* Ajuste le titre pour une meilleure lisibilité */
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .welcome-txt {
    font-size: 22px; /* Texte descriptif un peu plus grand que mobile */
    margin-bottom: 20px;
    text-align: justify;
  }

  .btn-welc {
    font-size: 14px; /* Taille intermédiaire */
    padding: 15px 30px; /* Padding légèrement réduit */
  }

  img {
    width: 100%; /* L'image occupe toute la largeur */
    max-width: 400px; /* Limite maximale pour éviter un rendu trop large */
    height: auto;
  }
}


    

</style>