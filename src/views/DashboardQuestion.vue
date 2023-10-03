<script>
export default {
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
            alert("Utilisateur déconnecté");
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

  <div class="d-flex flex-column mysidebar p-3 text-white bg-dark"
      style="width: 280px; height: 100vh; position: fixed; overflow-y: auto;">
    <a href="dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img src="img/capsule_616x353.jpg" alt="logo" style="height:20px;width:50px;">
      <span class="fs-4">  &nbsp; Bigscreen</span>
    </a>
    <hr>
    
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/Dashboard" class="nav-link text-white " aria-current="page">
          <i class="fa-solid fa-house"><use xlink:href="#home"/></i>
          Acceuil
        </a>
      </li>
      <li>
        <a href="/DashboardQuestion" class="nav-link text-white active">
          <i class="fa-solid fa-square-poll-horizontal"></i><use xlink:href="#speedometer2"/>
          Questionnaire
        </a>
      </li>
      <li>
        <a href="/DashboardResponse" class="nav-link text-white">
          <i class="fa-solid fa-voicemail"></i><use xlink:href="#table"/>
          Réponses
        </a>
      </li>
      
    </ul>

    <hr>


    <button @click="logout()" class="btn text-white">Se deconnecter</button>

    

  </div>


  <div class="content p-3" style="margin-left: 280px;"> 
     <h1 class="display-4 mb-4  text-white ">Liste des questions</h1>
     <div class="table-responsive">
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Numéro de la question</th>
      <th scope="col"> Corps de la question</th>
      <th scope="col"> Type de la question</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="q in question" :key="q.id">
      <td> {{q.id}} </td>
      <td>  {{q.question_body}} </td>
      <td> {{q.question_type}} </td>
    </tr>
  </tbody>
</table>
</div>


  </div>

   </main>
   
</template>

<style>


body {
    background-color: #172438;
    font-family: Arial, sans-serif;
background-image: url(img/display-top.webp); 
  height: 100vh;
    background-position: center;
    background-size: cover;
}


/* Style pour les écrans de petite taille (mobile) */

</style>