<script>
export default {
  data() {
    return {
      answers: [],
      showScrollTopButton: false, // J'utilise cette variable pour afficher ou masquer le bouton de retour en haut
    };
  },

  methods: {
    // J'utilise cette fonction pour récupérer les réponses depuis l'API
    async getResponse() {
      var url = "http://127.0.0.1:8000/api/responseList";
      var res = await (await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).json();
      console.log("Réponse de l'API :", res); // Je débogue la réponse de l'API
      if (res.status === "Done") {
        this.answers = res.data; // Je récupère les réponses groupées par utilisateur
        console.log("Données traitées :", this.answers); // Je débogue les données traitées
      }
    },

    // J'utilise cette fonction pour déconnecter l'administrateur
    async logout() {
      var url = "http://127.0.0.1:8000/api/logout";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((Response) => {
          return Response.json();
        })
        .then((res) => {
          console.log(res);
          if (res.status == "Done") {
            alert("Vous avez été déconnecté en tant qu'administrateur.");
            this.$router.push("/"); // Je redirige vers la route "welcome.vue"
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
  <main class="d-flex">

     <div
    
      class="d-flex flex-column mysidebar p-3 text-white bg-dark"
      
      style="width: 280px; height: 100vh; position: fixed; left:0"
    >
      <a
        href="dashboard"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        style="x"
      >
       <img src="img/capsule_616x353.jpg" alt="logo" style="height:20px;width:50px;">
        <span class="fs-4 text-disap"> &nbsp; Bigscreen</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            href="/Dashboard"
            class="nav-link text-white "
            aria-current="page"
          >
            <i class="fa-solid fa-house"></i>
          <span class="text-disap"> Accueil</span>  
          </a>
        </li>
        <li>
          <a href="/DashboardQuestion" class="nav-link text-white ">
            <i class="fa-solid fa-square-poll-horizontal "></i
            >
           <span class="text-disap"> Questionnaire</span> 
          </a>
        </li>
        <li>
          <a href="/DashboardResponse" class="nav-link text-white active">
            <i class="fa-solid fa-voicemail"></i>
          <span class="text-disap"> Réponses </span>  
          </a>
        </li>
      </ul>
      <hr />

      <button @click="logout()" class="btn text-white"><i class="fa-solid fa-right-from-bracket"></i> <span class="text-disap"> Se déconnecter</span> </button>
    </div>

    <div  class="content p-3" style="margin-left: 280px;">
      <div v-for="(userResponses, userId) in answers" :key="userId">
        <h2 class="text-white">Utilisateur : {{ userResponses.responses[0].user_response }}</h2> <!-- Je numérote l'utilisateur par l'e-mail -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Numéro de la question</th>
              <th scope="col">Corps de la question</th>
              <th scope="col">Réponse de la question</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="response in userResponses.responses" :key="response.response_id">
              <td>{{ response.response_id }}</td>
              <td>{{ response.question_body }}</td>
              <td>{{ response.user_response }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Bouton de retour en haut -->
      <button @click="scrollToTop" class="btn btn-primary btn-scroll-top" v-show="showScrollTopButton">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  </main>
</template>

<style >
body {
    background-color: #172438;
    font-family: Arial, sans-serif;
background-image: url(img/display-top.webp); 
  height: 100vh;
    background-position: center;
    background-size: cover;
}

/* Affichage pour écrans de taille moyenne */
@media screen and (max-width: 600px) {

body {
   font-size: 12px !important;
   
}
.content {
  margin: 0px !important;
  padding: 5px !important;
  margin: 5px !important;
 
}

.text-disap {
  display: none !important;
}

  .mysidebar {
    width: 70% !important;
    height:auto  !important;
    position: relative !important;
    display: block !important;
  }

}
</style>
