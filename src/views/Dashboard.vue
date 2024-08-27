<script>
export default {
  inject: ['toaster'],
  data() {
    return {
      quest6: [],
      quest7: [],
      quest10: [],
      average: [],

    };
  },

  methods: {
    // Fonction pour la déconnexion de l'admin
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

    

    // Fonction pour récupérer le nombre de réponses de la question 6
    async getPieCharts() {
      try {
        var url = "http://127.0.0.1:8000/api/PieCharts";
        var res = await (
          await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        if (res.status === "Done" && res.question6) {
          this.quest6 = res.question6;
          // Reste du code pour créer le diagramme
        } else {
          console.error(
            "J'ai rencontré une erreur lors de la récupération des données ou des données manquantes."
          );
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    },

    // Fonction pour récupérer le nombre de réponses de la question 7
    async getPieCharts7() {
      try {
        var url = "http://127.0.0.1:8000/api/PieCharts7";
        var res = await (
          await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        if (res.status === "Done" && res.question7) {
          this.quest7 = res.question7;
          // Reste du code pour créer le diagramme
        } else {
          console.error(
            "J'ai rencontré une erreur lors de la récupération des données ou des données manquantes."
          );
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    },

    // Fonction pour créer le diagramme Chart.js pour myPieChart7
    createPieChart7() {
      // Données pour le diagramme en secteurs
      const data = {
        labels: Object.keys(this.quest7), // Utilisation des libellés que j'ai spécifiés
        datasets: [
          {
            data: Object.values(this.quest7), // Utilisation des valeurs de la question 7
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
                size: 16, // Taille de ma police des libellés
              },
            },
          },
          title: {
            display: true,
            text: "Diagramme Pie Chart 7", // Mon titre du diagramme
            fontSize: 16, // Taille de la police du titre
          },
        },
      };

      // Créer le diagramme en secteurs pour myPieChart7
      // Chart.defaults.font.family = "n-bold";
      Chart.defaults.font = {
        size: 18,
        family: "n-bold",
      };
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
        var res = await (
          await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        if (res.status === "Done" && res.question10) {
          const quest10 = res.question10;
          // Données pour le diagramme en secteurs de la question 10
          const data = {
            labels: Object.keys(quest10),
            datasets: [
              {
                data: Object.values(quest10),
                backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#CA6F1E"],
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
                    size: 12, // Taille de la police des libellés
                  },
                },
              },
              title: {
                display: true,
                text: "Diagramme Pie Chart 10", // Mon titre du diagramme
                fontSize: 16, // Taille de la police du titre
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
            "J'ai rencontré une erreur lors de la récupération des données : "
          );
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    },

    // Fonction pour récupérer le nombre de réponses des questions 11 à 15

    // Fonction pour récupérer le nombre de réponses des questions 11 à 15
    async getRadarCharts() {
      try {
        var url = "http://127.0.0.1:8000/api/radarCharts";
        var res = await (
          await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        if (res.status === "Done" && res.average) {
          const average = res.average;
          // Données pour le diagramme radar
          const data = {
            labels: Object.keys(average),
            datasets: [
              {
                label: 'Radar Charts 11-15',
                data: Object.values(average),
                backgroundColor: "rgba(255, 87, 51, 0.2)",
                borderColor: "#000",
                borderWidth: 2,
              },
            ],
          };

          // Options du diagramme
          const options = {
            responsive: true,
            plugins: {
              legend: {
                // labels: {
                //   font: {
                //     size: 30, // J'augmente la taille de la police des labels ici
                //   },
                // },
              },
              title: {
                display: true,
                text: "Diagramme Radar Charts 11-15", // Mon titre du diagramme
                fontSize: 16, // Taille de la police du titre
              },
            },
            scale: {
              pointLabels: {
                font: {
                  size: 12,
                },
              },
            },
          };

          // Créer le diagramme radar
          const ctx = document.getElementById("myRadarChart11_15");
          new Chart(ctx, {
            type: "radar",
            data: data,
            options: options,
          });
        } else {
          console.error(
            "J'ai rencontré une erreur lors de la récupération des données ou des données manquantes."
          );
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    },
  },

  async mounted() {
    // Diagramme Pie Charts de la question 6
    await this.getPieCharts(); // J'appelle la fonction asynchrone pour récupérer le nombre de réponses de la question 6
    console.log(this.quest6);
    console.log(Object.values(this.quest6));
    // Données pour le diagramme en secteurs
    const data = {
      labels: Object.keys(this.quest6), // Utilisation des clés comme labels
      datasets: [
        {
          data: Object.values(this.quest6), // Utilisation des valeurs comme données
          backgroundColor: [
            "#FF5733",
            "#33FF57",
            "#5733FF",
            "#CA6F1E",
            "#117864",
          ], // Couleurs des secteurs
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
              size: 12, // Taille de ma police des libellés
            },
          },
        },
        title: {
          display: true,
          text: "Diagramme Pie Chart 6", // Mon titre du diagramme
          fontSize: 10, // Taille de la police du titre
          
        },
      },
    };

    // Créer le diagramme en secteurs
    const ctx = document.getElementById("myPieChart6");
    new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });

    // Diagramme Pie Charts de la question 7
    // Appel de la méthode pour récupérer des données de la question 7
    await this.getPieCharts7();
    console.log(Object.values(this.quest7));
    // Appel de la méthode pour créer le diagramme de myPieChart7
    this.createPieChart7();

    // Diagramme Pie Charts de la question 10
    await this.getPieCharts10(); // Appel de la fonction asynchrone pour récupérer le nombre de réponses de la question 10

    // Appel de la fonction pour les questions 11 à 15
    await this.getRadarCharts();
  },
};
</script>



<template>
  <main class="d-flex flex-column">

   

    <div
    
      class="d-flex flex-column mysidebar p-3 text-white bg-dark"
      
      style="width: 280px; height: 100vh; position: fixed; left:0"
    >
      <a
        href="dashboard"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none monlogo"
        style="x"
      >
               <img src="img/bigscreen_logowith.png" alt="logo" style="height:30px;width:100%;">

      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            href="/Dashboard"
            class="nav-link text-white active"
            aria-current="page"
          >
            <i class="fa-solid fa-house"></i>
          <span class="text-disap font_nav_bar"> Accueil</span>  
          </a>
        </li>
        <li>
          <a href="/DashboardQuestion" class="nav-link text-white">
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


  <h1 class="text-black text-end  mx-5" style="font-family:n-bold;"> Bienvenue sur la page des statistiques</h1>
    <div class="d-flex flex-wrap wrapper_chart">
      <div style="background-color: white" >
        <canvas id="myPieChart6" class="chart m-4 "> </canvas>
      </div>
      <div style="background-color: white ">
        <canvas id="myPieChart7" class="chart m-4 "></canvas>
      </div> 
      <div style="background-color: white" >
        <canvas id="myPieChart10" class="chart m-4 p-2"></canvas>
      </div>
      <div style="background-color: white">
        <canvas id="myRadarChart11_15" class="chart m-4 p-2"></canvas>
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
  height: 100vh;
  background-position: center;
  background-size: cover;
  margin: 0;
  overflow-x: hidden;
}

.wrapper_chart {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 150px;
}

.chart {
  width: 300px;
  height: 300px;
}


.font_nav_bar {
  font-family: "n-bold";
}


.nav-pills .nav-link.active {
  background-color:#4d1ef7 ;
}

.mysidebar {
  width: 220px !important;
}

/* Affichage pour écrans de taille moyenne */
@media screen and (max-width: 600px) {
  .wrapper_chart {
margin-left: 0;
justify-content: center;
  }

.text-disap {
  display: none;
}

  .mysidebar {
    width: 100% !important;
    height:auto  !important;
    position: relative !important;
    display: block !important;
  }

}

</style>
