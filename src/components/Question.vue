<script>
export default {
  data() {
    return {
      question: [],
      index: 0,
      currentQuestion: {}, // J'ai ajouté cette propriété pour stocker la question actuelle
      answers: [], // J'utilise ce tableau pour stocker les réponses de l'utilisateur
      A: "",
      B: "",
      C: "",
      showNextButton: true, // Par défaut, j'affiche le bouton "Next Question"
      showFinalizeButton: false, // J'affiche le bouton "Finalisez" à la fin du sondage
      link_url: "", // Je stocke l'URL ici
    };
  },

  methods: {
    // J'utilise cette fonction pour récupérer la liste des questions dès que l'utilisateur charge la page.
    async getQuestion() {
      var url = "http://127.0.0.1:8000/api/questionList";
      var res = await (await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).json();
      if (res.status == "Done") {
        this.question = res.data; // Je récupère toutes les informations de la table Question depuis l'API.
      }
    },

    // J'utilise cette fonction pour soumettre les réponses de l'utilisateur.
    async submitResp() {
      var url = "http://127.0.0.1:8000/api/submitResponses";
      if (this.answers.length > 0) {
        var responseArray = this.answers.map((response) => {
          return {
            questionId: response.questionId,
            userResponse: response.userResponse,
          };
        });

        console.log("J'envoie les réponses :", responseArray);

        var res = await (
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: this.answers[0].userResponse, // J'utilise la première réponse pour l'e-mail
              responses: responseArray, // J'envoie un tableau d'objets réponse
            }),
          })
        ).json();

        console.log("Réponse de l'API :", res);

        if (res.status == "Done") {
          console.log("Réponses enregistrées avec succès !");
          // Je réinitialise les réponses après les avoir enregistrées avec succès
          this.answers = [];
          this.A = "";
          this.B = "";
          this.C = "";
          this.link_url = res.data.url;
          this.nextQuestion();
        } else {
          console.log("Une erreur s'est produite lors de l'enregistrement des réponses.");
        }
      } else {
        // Je gère le cas où this.answers est vide
        console.log("Aucune réponse n'a été enregistrée.");
      }
    },

    // J'utilise cette fonction pour afficher la question actuelle.
    displayCurrentQuestion() {
      if (this.index >= 0 && this.index < this.question.length) {
        this.currentQuestion = this.question[this.index];
      } else {
        this.currentQuestion = {}; // Je réinitialise la question si la liste est vide
      }
    },

    // J'utilise cette fonction pour passer à la question suivante.
    nextQuestion() {
      if (this.index < this.question.length - 1) {
        this.index++;
        this.displayCurrentQuestion();
        this.showNextButton = true;
        this.showFinalizeButton = false;
      } else {
        // Si je suis à la dernière question, j'affiche le bouton "Finalisez"
        this.showNextButton = false;
        this.showFinalizeButton = true;
      }
    },

    // J'utilise cette fonction pour revenir à la question précédente.
    previousQuestion() {
      if (this.index > 0) {
        console.log(this.answers[this.currentQuestion.id-2]);
        this.A=this.answers[this.currentQuestion.id-2].userResponse;
         this.B=this.answers[this.currentQuestion.id-2].userResponse;
          this.C=this.answers[this.currentQuestion.id-2].userResponse;
        this.index--; // Je décrémente l'index pour revenir à la question précédente
        this.displayCurrentQuestion();
        this.showNextButton = true; // Je réaffiche le bouton "Next Question"
        this.showFinalizeButton = false; // Je masque le bouton "Finalisez"
      } else {
        // Si je suis déjà sur la première question, je peux gérer cela comme je le souhaite, par exemple, afficher un message d'erreur.
        console.log("Je suis déjà sur la première question.");
      }
    },

    // J'utilise cette fonction pour sauvegarder la réponse de l'utilisateur.
    saveResponse() {
      // Je crée un objet pour stocker la réponse de l'utilisateur
      const response = {
        questionId: this.currentQuestion.id, // L'ID de la question actuelle (j'ai ajouté une propriété ID à vos questions si ce n'était pas déjà fait)
        userResponse: "",
      };

      // Je stocke la réponse dans l'objet answers en fonction du type de question
      if (this.currentQuestion.question_type === "A") {
        response.userResponse = this.A;
      } else if (this.currentQuestion.question_type === "B") {
        response.userResponse = this.B;
      } else if (this.currentQuestion.question_type === "C") {
        response.userResponse = this.C;
      }


    function isNumber(str) {
    return !isNaN(str) && str.trim() !== '';
}
      // Cette condition permet de remplir obligatoirement la champ vide avant de continuer 
      if (response.userResponse=='') {
         alert('Remplissez la case vide pour continuer pour continuez');
        return
      }

    if(this.currentQuestion.id==2){
        if (!isNumber(response.userResponse)) {
          alert('Entrez votre age en chiffre');
          return
        }
    }

      // Maintenant, je peux sauvegarder cet objet de réponse où je le souhaite, par exemple en le stockant dans un tableau
      this.answers.push(response);
      console.log(this.answers);

      // Je réinitialise les champs de réponse pour la prochaine question
      this.A = "";
      this.B = "";
      this.C = "";

      // J'utilise une promesse pour appeler nextQuestion une fois la réponse sauvegardée.
      this.continuerVersQuestionSuivante().then(() => {
        this.nextQuestion();
      });
    },

    // J'utilise cette promesse pour appeler nextQuestion une fois la réponse sauvegardée.
    continuerVersQuestionSuivante() {
      return new Promise((resolve) => {
        resolve();
      });
    },
  },

  async created() {
    await this.getQuestion(); // J'attends que la requête soit terminée
    this.displayCurrentQuestion(); // Ensuite, j'affiche la première question une fois que les données sont disponibles
    await this.submitResp(); // J'attends que la requête soit terminée
  },
};
</script>

<template>
  <header>
    <a href="question" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img src="img/bigscreen_logowith.png" alt="logo" style="height: 40px;">
    </a>
  </header>

  <!-- Début du sondage! -->
  <div class="container-question">
    <div class="question_header text-black">
      <h2 class="text-center title_question"> {{ currentQuestion.title }} </h2>
      <h4 class="text-center mt-3 body_question">{{ currentQuestion.question_body }}</h4>
    </div>

    <div class="question_main">
      <center>
        <!-- Question de type A -->
        <div style="list-style: none" class="containerTypeA" v-if="currentQuestion.question_type == 'A'">
          <li v-for="index in currentQuestion.propositions" :key="index">
            <input type="radio" v-model="A" :value="index">{{ index }}
          </li>
        </div>
      </center>

      <!-- Question de type B -->
      <center>
        <div class="containerTypeB p-3" v-if="currentQuestion.question_type == 'B'">
          
          <div class="input-container">
  <input type="text" id="input" v-model="B">
  <label for="input" class="label">Entrez votre réponse</label>
  <div class="underline"></div>
</div>

        </div>
      </center>

      <!-- Question de type C -->
      <center>
        <div class="containerTypeC p-3" v-if="currentQuestion.question_type == 'C'">
          <li style="list-style: none" v-for="index in [1,2,3,4,5]" :key="index">
            <input type="radio" v-model="C" :value="index">{{ index }}
          </li>
        </div>
      </center>
    </div>

    <div class="question_footer p-3">
      <button class="arrow-prev " @click="previousQuestion">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button class="arrow-next" @click="saveResponse" v-if="showNextButton">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <!-- Bouton pour afficher la fenêtre modale -->
      <button type="submit" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="showFinalizeButton" @click.prevent="submitResp">
        Finalisez
      </button>
    </div>

    <p></p>
  </div>
  <!-- Fin du sondage! -->

  <!-- Fenêtre modale pour afficher le pop-up -->
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Merci d'avoir participé à ce sondage</h1>
          <button type="button" class="btn-welc" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Toute l'équipe de Bigscreen vous remercie pour votre engagement. Grâce à votre investissement, nous préparons une application toujours plus facile à utiliser, que ce soit en solo ou en famille. Si vous désirez consulter vos réponses ultérieurement, vous pouvez le faire à cette adresse : <router-link :to="`/checkoutresponse/${link_url}`">https://www.Bigscreen.com/{{link_url}}</router-link> </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin de la fenêtre modale pour afficher le pop-up -->
</template>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: black;
}

body {
  background-image: url(img/display-oled.webp);
  height: 100vh;
  background-position: center;
  background-size: cover;
}

/* Début Style pour le input */

.input-container {
  position: relative;
  margin: 50px auto;
  width: 200px;
}

.input-container input[type="text"] {
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 0;
  left: 0;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type="text"]:focus ~ .label,
.input-container input[type="text"]:valid ~ .label {
  top: -20px;
  font-size: 16px;
  color: #333;
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #333;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-container input[type="text"]:focus ~ .underline,
.input-container input[type="text"]:valid ~ .underline {
  transform: scaleX(1);
}


/* Fin Style pour le input */

.container-question {
  position: relative;
  padding: 15px;
  background-color: white;
  height: 453px;
  width: 650px;
  border-radius: 10px;
  margin: 50px auto;
}

.arrow-next i {
  color: #fff;
}

.arrow-next {
  background-color: #000;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  top: 400px;
  left: 90%;
}

.arrow-prev i {
  color: #fff;
}

.arrow-prev {
  background-color: #000;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  top: 400px;
  right: 90%;
}

/*Bouton de l'accueil*/

.btn-welc{
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-family: "n-semi";
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #4d1ef7;
  box-shadow: 0px 15px 20px rgba(77, 30, 247,0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}

/** Affichage pour les écrans de taille moyenne (mobile) */
@media (max-width: 767px) {
  .container-question {
    display: block;
    height: 320px;
    width: 350px;
  }

  .arrow-next {
    background-color: #000;
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    top: 250px;
    left: 80%;
  }

  .arrow-prev {
    background-color: #000;
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    top: 250px;
    right: 80%;
  }
}
</style>
