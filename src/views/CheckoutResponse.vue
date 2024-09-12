<script>
export default {
  data() {
    return {
      answer: [], // Je stocke les réponses récupérées de l'API
      showScrollTopButton: false, // J'utilise cette variable pour afficher ou masquer le bouton de retour en haut
    };
  },
  methods: {
    // Cette fonction me permet de récupérer les réponses depuis l'API en fonction du paramètre de route "code"
    async getResponse() {
      var url = "http://127.0.0.1:8000/api/getResponse/" + this.$route.params.code;
      var res = await (await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).json();
      if (res.status == "Done") {
        this.answer = res.data; // Récupération de toutes les informations dans la table Réponses depuis l'API
        console.log(this.answer);
      }
    },



 // J'utilise cette méthode pour faire défiler vers le haut de la page
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // J'utilise cette méthode pour afficher/masquer le bouton de retour en haut en fonction de la position de défilement
    handleScroll() {
      if (window.scrollY > 100) {
        this.showScrollTopButton = true;
      } else {
        this.showScrollTopButton = false;
      }
    },

  },

   


  mounted() {
    this.getResponse();


    // J'ajoute un gestionnaire d'événements de défilement pour afficher/masquer le bouton de retour en haut
    window.addEventListener('scroll', this.handleScroll);
  },

  // J'utilise cette fonction pour supprimer l'écouteur d'événements lorsque le composant est détruit
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  
    
  },


  
};
</script>

<template>


  


 <center> 
  <h2 class="big_title text-white" >Vérifiez vos réponses sur cette page.</h2>
 <br>
 
  <div class="card" v-for="a in answer" :key="a.id">
 
  <p class="title_card">Question {{ a.response_id + 0 }}/20</p>
  <p class="description_card">{{ a.question_body }}  </p>
  <p class="response_card"><br> Réponse donnée : <span style="color:rgba(77, 30, 247,1);"> {{ a.user_response }}</span> </p>
</div>


<!-- Bouton de retour en haut -->
      <button @click="scrollToTop" class="btn btn-primary btn-scroll-top" v-show="showScrollTopButton">
        <i class="fa-solid fa-chevron-up"></i>
      </button>

  </center>
</template>

<style>


@font-face {
    font-family: 'n-regular';
    src: url("/fonts/Nunito-Regular.ttf");
}
@font-face {
    font-family: 'n-semi';
    src:  url("/fonts/Nunito-SemiBold.ttf") format('truetype');
}
@font-face {
    font-family: 'n-bold';
    src: url("/fonts/Nunito-Bold.ttf") format('truetype');
}

* {
    margin:0;
    padding: 0;
}


body {
   background-color: #151515;
   }


/** début modification de la card */

.card {
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 13px;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 20px rgba(77, 30, 247,0.6);
}



.title_card {
  font-family: 'n-bold';
  font-size: 1.5em;
  font-weight: 800;
  color: rgb(26, 26, 26);
}

.description_card {
  font-family: 'n-semi';
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  color: rgb(99, 99, 99);
}

.response_card {
  font-family: 'n-regular';
   text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: rgb(99, 99, 99);
}
/*fin modification card*/

</style>
