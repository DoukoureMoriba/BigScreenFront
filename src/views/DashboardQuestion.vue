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


    },



 mounted() {
   this.getQuestion(); 
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


  <div  class="content p-3"> 

    <table class="table">
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