<script>
export default {
   inject: ['toaster'],
  data() {
    return {
      answers: [],
      currentPage: 1, // Page courante
      itemsPerPage: 1, // Nombre de tableaux par page
      showScrollTopButton: false, // J'utilise cette variable pour afficher ou masquer le bouton de retour en haut
    };
  },

  computed: {
  paginatedAnswers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.answers.slice(startIndex, endIndex);
  },
  totalPages() {
    return Math.ceil(this.answers.length / this.itemsPerPage);
  },
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
            this.toaster.showSuccess(res.message);
            sessionStorage.clear();
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

     nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
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
        <img src="img/bigscreen_logowith.png" alt="logo" style="height:30px;width:100%;">
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="/Dashboard" class="nav-link text-white">
            <i class="fa-solid fa-house"></i>
            <span class="text-disap font_nav_bar"> Accueil</span>
          </a>
        </li>
        <li>
          <a href="/DashboardQuestion" class="nav-link text-white">
            <i class="fa-solid fa-square-poll-horizontal"></i>
            <span class="text-disap font_nav_bar"> Questionnaire</span>
          </a>
        </li>
        <li>
          <a href="/DashboardResponse" class="nav-link text-white active">
            <i class="fa-solid fa-voicemail"></i>
            <span class="text-disap font_nav_bar"> Réponses </span>
          </a>
        </li>
      </ul>
      <hr />
      <button @click="logout()" class="btn text-white">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span class="text-disap font_nav_bar"> Se déconnecter</span>
      </button>
    </div>

    <div class="content p-3" style="margin-left: 280px;">
      <div v-for="(userResponses, userId) in paginatedAnswers" :key="userId">
        <h3 class="text-black text-center ">Utilisateur : <span style="color:rgba(77, 30, 247,1);">{{ userResponses.responses[0].user_response }} </span></h3>
       <div class="table-responsive">
        <table class="table table table-hover table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col" class="tt_title">Numéro de la question</th>
              <th scope="col" class="tt_title">Corps de la question</th>
              <th scope="col" class="tt_title">Réponse de la question</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="response in userResponses.responses" :key="response.response_id">
              <td class="td_texte">{{ response.response_id }}</td>
              <td class="td_texte">{{ response.question_body }}</td>
              <td class="td_texte">{{ response.user_response }}</td>
            </tr>
          </tbody>
        </table>
        </div>

      </div>

      <!-- Pagination -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="previousPage">Précédent</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Suivant</a>
          </li>
        </ul>
      </nav>

      <!-- Bouton de retour en haut -->
      <button @click="scrollToTop" class="btn btn-primary btn-scroll-top" v-show="showScrollTopButton">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  </main>
</template>


<style >

@font-face {
  font-family: "n-regular";
  src: url("/fonts/Nunito-Regular.ttf");
}
@font-face {
  font-family: "n-semi";
  src: url("/fonts/Nunito-SemiBold.ttf") format("truetype");
}
@font-face {
  font-family: "n-bold";
  src: url("/fonts/Nunito-Bold.ttf") format("truetype");
}



body {
    background-color: #fff;
}

.tt_title {
  font-family:"n-bold" ;
  font-size: 18px;
}

.td_texte {
  font-family: "n-semi";
  font-size: 18px;
}

h3 {
  font-family: "n-semi";
}

.font_nav_bar {
  font-family: "n-bold";
}


.pagination .page-item .page-link {
  color: #000; /* Couleur du texte par défaut */
  background-color: #fff; /* Couleur de fond par défaut */
  border: 1px solid #ddd; /* Bordure par défaut */
  transition: background-color 0.3s, color 0.3s; /* Transition pour un effet fluide */
}

.pagination .page-item .page-link:hover {
  background-color: #4d1ef7; /* Couleur de fond violet au survol */
  color: #fff; /* Couleur du texte au survol */
  border-color: #4d1ef7; /* Couleur de bordure au survol */
}

/* Style pour la page courante */
.pagination .page-item.active .page-link {
  background-color: #4d1ef7; /* Couleur de fond violet pour la page active */
  color: #fff; /* Couleur du texte pour la page active */
  border-color: #4d1ef7; /* Couleur de bordure pour la page active */
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
