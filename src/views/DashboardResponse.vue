<script>
export default {
    data() {
        return {
            answers: [],
        }
    },

    methods: {

        
async getResponse() {
  var url = "http://127.0.0.1:8000/api/responseList";
  var res = await (await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })).json();
  console.log("Réponse de l'API :", res); // Déboguer la réponse de l'API
  if (res.status === "Done") {
    this.answers = res.data; // Récupération des réponses groupées par utilisateur
    console.log("Données traitées :", this.answers); // Déboguer les données traitées
  }
},



    },



 mounted() {
   this.getResponse(); 
},

}
</script>

<template>
    <main class="d-flex" >

  <div class="d-flex flex-column mysidebar p-3 text-white bg-dark" style="width: 280px; height:100vh;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Bigscreen</span>
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
        <a href="/DashboardQuestion" class="nav-link text-white ">
          <i class="fa-solid fa-square-poll-horizontal"></i><use xlink:href="#speedometer2"/>
          Questionnaire
        </a>
      </li>
      <li>
        <a href="/DashboardResponse" class="nav-link text-white active">
          <i class="fa-solid fa-voicemail"></i><use xlink:href="#table"/>
          Réponses
        </a>
      </li>
      
    </ul>

    <hr>


    <button @click="logout()" class="btn text-white">Se deconnecter</button>

    

  </div>

  <div class="content p-3">
      <div v-for="(userResponses, userId) in answers" :key="userId">
        <h2 class="text-white">Utilisateur : {{ userResponses.responses[0].user_response }}</h2> <!-- numérotation de l'utilisateur par l'e-mail !-->
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
    </div>


   </main>
   
</template>

<style>


body {
    background-color: #172438;
}


main, .content {
    width: 100%;
    height: 100%;
}

</style>