<script>

export default {
  
    data() {
        return {
            quest6:[],
            quest7:[],
            quest10:[],
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

    

// fonction pour récuperer le nombre de réponse de la questions6
    async getPieCharts() {
  try {
    var url = "http://127.0.0.1:8000/api/PieCharts";
    var res = await (await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })).json();
    if (res.status === "Done" && res.question6) {
      this.quest6 = res.question6;
      // Reste du code pour créer le diagramme
    } else {
      console.error("Erreur lors de la récupération des données ou données manquantes.");
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données :", error);
  }
},


  // Fonction pour récupérer le nombre de réponses de la question 7
    async getPieCharts7() {
      try {
        var url = "http://127.0.0.1:8000/api/PieCharts7"; // Remplacez par l'URL correcte
        var res = await (await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })).json();
        if (res.status === "Done" && res.question7) {
          this.quest7 = res.question7;
          // Reste du code pour créer le diagramme
        } else {
          console.error("Erreur lors de la récupération des données ou données manquantes.");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    },

    // Fonction pour créer le diagramme Chart.js pour myPieChart7
    createPieChart7() {
      // Données pour le diagramme en secteurs
      const data = {
        labels: ["Occulus store", "Windows store", "Viveport", "SteamVR"], // Utilisez les libellés que vous avez spécifiés
        datasets: [
          {
            data: Object.values(this.quest7), // Utilisez les valeurs de la question 7
            backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#CA6F1E"], // Couleurs des secteurs
          },
        ],
      };

      // Options du diagramme
      const options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 25, // Taille de la police des libellés
              },
            },
          },
        },
      };

      // Créer le diagramme en secteurs pour myPieChart7
      const ctx = document.getElementById("myPieChart7");
      new Chart(ctx, {
        type: "pie",
        data: data,
        options: options,
      });
    },



  // Fonction pour récupérer le nombre de réponses de la question 10
    async getPieCharts10() {
      try {
        var url = "http://127.0.0.1:8000/api/PieCharts10";
        var res = await (await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })).json();
        if (res.status === "Done" && res.question10) {
          const quest10 = res.question10;
          // Données pour le diagramme en secteurs de la question 10
          const data = {
            labels: [
              "Regarder des films",
              "Travailler, jouer en solo",
              "Regarder la TV en direct",
              "Jouer en équipe",
            ],
            datasets: [
              {
                data: Object.values(quest10),
                backgroundColor: [
                  "#FF5733",
                  "#33FF57",
                  "#5733FF",
                  "#CA6F1E",
                ],
              },
            ],
          };

          // Options du diagramme
          const options = {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 25, // Augmentez la taille de la police des labels ici
                  },
                },
              },
            },
          };

          // Créer le diagramme en secteurs
          const ctx = document.getElementById("myPieChart10");
          new Chart(ctx, {
            type: "pie",
            data: data,
            options: options,
          });
        } else {
          console.error(
            "Erreur lors de la récupération des données ou données manquantes."
          );
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    }


  },


    

   

async mounted() {
   // Diagramme pieCharts de la question 6 
  await this.getPieCharts();// Appellons la fonction async de Recuperation du nombre de réponse de la questions6
  console.log(Object.values(this.quest6));
    // Données pour le diagramme en secteurs
    const data = {
      labels:["Oculus Rift\/s",	"Windows Mixed\n Reality","Oculus Quest","Valve index","HTC Vive"], // Utilisez les clés comme labels
      datasets: [{
      data: Object.values(this.quest6), // Utilisez les valeurs comme données
      backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#CA6F1E", "#117864"] // Couleurs des secteurs

      }]
    };

    // Options du diagramme
    const options = {
      responsive: true,
        plugins: {
        legend: {
          labels: {
            font: {
              size: 25, // Augmentez la taille de la police des labels ici
             
            }
          }
        }
      }
    
    };

    // Créer le diagramme en secteurs
    const ctx = document.getElementById("myPieChart6");
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });




  // Diagramme pieCharts de la question 7   
 // Appel de la méthode pour récupérer les données de la question 7
    await this.getPieCharts7();
    console.log(Object.values(this.quest7));
    // Appel de la méthode pour créer le diagramme de myPieChart7
    this.createPieChart7();

    // Diagramme pieCharts de la question 10
    await this.getPieCharts10(); // Appel de la fonction async pour récupérer le nombre de réponses de la question 10
  
  }



};




</script>


<template>
    
<main class="d-flex">
 

    <div class="d-flex flex-column mysidebar p-3 text-white bg-dark" style="width: 280px; height: 100vh; position: fixed; left: 0;">
    <a href="dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" style="x">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Sidebar</span>
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

   <div class="d-flex flex-wrap wrapper_chart">
      <canvas id="myPieChart6" class="chart"></canvas>
      <canvas id="myPieChart7" class="chart"></canvas>
      <canvas id="myPieChart10" class="chart"></canvas>
      <canvas id="myRadarChart11_15" class="chart"></canvas>
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
  margin: 0; /* Ajoutez cette ligne pour supprimer la marge par défaut du corps */
}

.wrapper_chart {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Distribue les diagrammes horizontalement avec un espace entre eux */
  margin-left: 280px; /* Assurez-vous de laisser de l'espace pour la sidebar */
  padding: 20px; /* Ajoutez un espacement entre les diagrammes */
}

.chart {
  width: 300px !important;
  height: 300px !important;
}

</style>