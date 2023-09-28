<script>
export default {
    data() {
        return {
            
        }
    },


    methods: {
        

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

    

}


</script>


<template>
    
<main>
  <h1 class="visually-hidden">Sidebars examples</h1>

  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px; height:100vh;">
    <a href="dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img src="img/capsule_616x353.jpg" alt="logo" style="height:20px;width:50px;">
      <span class="fs-4">  &nbsp; Bigscreen</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/Dashboard" class="nav-link  text-white active" aria-current="page">
          <i class="fa-solid fa-house"><use xlink:href="#home"/></i>
          Acceuil
        </a>
      </li>
      <li>
        <a href="/DashboardQuestion" class="nav-link text-white">
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

  <div class="d-flex">
  <canvas id="myChart"></canvas>
  <canvas id="myChart"></canvas>
</div>






   </main>
</template>

<style>

body {
    background-color: #172438;
    font-family: Arial, sans-serif;
background-image: url(img/display-top.webp);   height: 100vh;
    background-position: center;
    background-size: cover;
}


</style>