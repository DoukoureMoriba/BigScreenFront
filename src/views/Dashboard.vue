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
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Bigscreen</span>
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
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <button @click="logout()" class="btn">Se deconnecter</button>
      </ul>
    </div>
  </div>

   </main>
</template>

<style>



</style>