<script>
export default {
   inject: ['toaster'],
    data() {
        return {
            question: [],
        }
    },

    methods: {
        async getQuestion()  {
      var url = "http://127.0.0.1:8000/api/questionList";
      var res = await(await fetch(url, {
         method: "GET",
        headers: { "Content-Type": "application/json" },
      }) 
      ).json();
       if (res.status == "Done") {
             this.question = res.data; // Recuperation de toute les infos dans la table Question depuis l'api.
          }
    },


    //Function pour la déconnexion de l'admin
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
            this.$router.push("/"); // Redirection vers la route "welcome.vue"
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },



    },



 mounted() {
   this.getQuestion(); 
},

}
</script>

<template>
    <main class="d-flex " >

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
          <a
            href="/Dashboard"
            class="nav-link text-white "
            aria-current="page"
          >
            <i class="fa-solid fa-house"></i>
          <span class="text-disap font_nav_bar " > Accueil</span>  
          </a>
        </li>
        <li>
          <a href="/DashboardQuestion" class="nav-link text-white active">
            <i class="fa-solid fa-square-poll-horizontal "></i
            >
           <span class="text-disap font_nav_bar"> Questionnaire</span> 
          </a>
        </li>
        <li>
          <a href="/DashboardResponse" class="nav-link text-white">
            <i class="fa-solid fa-voicemail"></i>
          <span class="text-disap font_nav_bar"> Réponses </span>  
          </a>
        </li>
      </ul>
      <hr />

      <button @click="logout()" class="btn text-white"><i class="fa-solid fa-right-from-bracket"></i> <span class="text-disap font_nav_bar"> Se déconnecter</span> </button>
    </div>


  <div class="content p-3" style="margin-left: 280px;"> 
     <h3 class="display-5 mb-4  text-center text-black ">Liste des questions</h3>
     <div class="table-responsive">
    <table class="table table table-hover table-dark table-bordered">
  <thead>
    <tr>
      <th scope="col" class="tt_title">Numéro de la question</th>
      <th scope="col"  class="tt_title"> Corps de la question</th>
      <th scope="col"  class="tt_title"> Type de la question</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="q in question" :key="q.id">
      <td class="td_texte"> {{q.id}} </td>
      <td  class="td_texte">  {{q.question_body}} </td>
      <td  class="td_texte"> {{q.question_type}} </td>
    </tr>
  </tbody>
</table>
</div>


  </div>

   </main>
   
</template>

<style>


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
  font-family:"n-bold" ;
}


.font_nav_bar {
  font-family: "n-bold";
}

.nav-pills .nav-link.active {
  background-color:#4d1ef7 ;
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