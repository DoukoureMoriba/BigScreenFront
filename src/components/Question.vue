<script>
export default {
  
  inject: ['toaster'],// J'injecte une dépendance "toaster" pour accéder aux méthodes du toaster, comme afficher des messages d'erreur ou de succes.

  data() {
   return {
      question: [], // Je stocke ici la liste des questions récupérées depuis l'API.
      index: 0, // Cet index me permet de suivre la question actuelle.
      currentQuestion: {}, // Je stocke ici les informations de la question actuelle.
      answers: [], // Je stocke les réponses de l'utilisateur pour chaque question.
      A: "", // Je stocke la réponse de type A de l'utilisateur.
      B: "", // Je stocke la réponse de type B de l'utilisateur.
      C: "", // Je stocke la réponse de type C de l'utilisateur.
      showNextButton: true, // Je contrôle l'affichage du bouton "Next Question".
      showFinalizeButton: false, // Je contrôle l'affichage du bouton "Finalisez".
      link_url: "", // Je stocke l'URL obtenue après soumission des réponses.
    };
  },

  methods: {
    // J'utilise cette fonction pour récupérer la liste des questions dès que l'utilisateur charge la page depuis l'Api.
    async getQuestion() {
      var url = "http://127.0.0.1:8000/api/questionList";
      var res = await (
        await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      ).json();
      if (res.status == "Done") {
        this.question = res.data; // Je récupère toutes les informations de la table Question depuis l'API.
      }
    },

    
    // J'utilise cette fonction pour détecter l'appui sur la touche "Enter"
    handleKeyPress(event) {
      if (event.key === "Enter") {
        this.saveResponse(); // j'appel saveResponse lorsque l'utilisateur appuie sur "Entrer"
      }
    },


    // J'utilise cette fonction pour soumettre les réponses de l'utilisateur a l'api
    async submitResp() {
      if (this.answers.length==19) {
        this.answers.push( {
        questionId: this.currentQuestion.id, // L'ID de la question actuelle (j'ai ajouté une propriété ID à  questions)
        userResponse: this.B, // j enregistre la derniere question avant d envoyer dans la base de données.
      }
      );
      }



// Je définis l'URL de l'API où je vais envoyer les réponses des utilisateurs. 
      var url = "http://127.0.0.1:8000/api/submitResponses";
      if (this.answers.length > 0) {
        var responseArray = this.answers.map((response) => {
    // J'utilise `map` pour parcourir chaque élément du tableau `answers`.
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
        // j'affiche la réponse de l'API dans la console pour voir si la soumission a été réussie ou s'il y a eu une erreur.



        if (res.status == "Done") {
          console.log("Réponses enregistrées avec succès !");
          // Je réinitialise les réponses après les avoir enregistrées avec succès depuis l'api avec le status "Done"

          //Apres l'enregistrement des réponse, je réinitialise les variables liées aux réponses.
          this.answers = [];// Je vide le tableau `answers` pour effacer toutes les réponses précédentes.
          this.A = "";// Je réinitialise la réponse du type A.
          this.B = "";// Je réinitialise la réponse du type B
          this.C = "";// Je réinitialise la réponse du type C
          this.link_url = res.data.url;// Je récupère l'URL renvoyée par l'API et je la stocke dans `link_url`.
          this.nextQuestion(); // J'appelle la fonction pour passer a la question suivante
        } else {
          console.log(
            "Une erreur s'est produite lors de l'enregistrement des réponses."
          );
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
        // Si l'index est valide, je récupère la question correspondante et la stocke dans `currentQuestion`
      } else {
        this.currentQuestion = {}; // Je réinitialise la question si la liste est vide
      }

      // Information important : Ce code gère l'enregistrement des réponses des utilisateurs auprès d'une API, réinitialise les réponses après enregistrement, et contrôle l'affichage des questions. Les vérifications de statut et de validité des réponses permettent de gérer les erreurs et les cas où aucune réponse n'est donnée.

    },

    // J'utilise cette fonction pour passer à la question suivante.
    nextQuestion() {
      if (this.index < this.question.length - 1) {
        this.index++;
        this.displayCurrentQuestion();
        this.showNextButton = this.index < 19;
        this.showFinalizeButton = this.index >= 19;
      } else {
        // Si je suis à la dernière question, j'affiche le bouton "Finalisez"
        this.showNextButton = false;// je cache le bouton "Next Question" en le mettant à false.
        this.showFinalizeButton = true;// Et j'affiche le bouton "Finalisez" en le mettant à `true` pour indiquer que le sondage est terminé.
      }
    },

    // J'utilise cette fonction pour revenir à la question précédente.
    previousQuestion() {
      if (this.index > 0) {
        this.index--; // Je décrémente l'index pour revenir à la question précédente
        this.displayCurrentQuestion();
        this.showNextButton = true; // Je réaffiche le bouton "Next Question"
        this.showFinalizeButton = false; // Je masque le bouton "Finalisez"
      } else {
        // Si je suis déjà sur la première question, je peux gérer cela comme je le souhaite, par exemple, afficher un message d'erreur.
        console.log("Je suis déjà sur la première question.");
      }

       // Information importante : Cette fonction assure une navigation fluide entre les questions tout en adaptant l'affichage des boutons de navigation en fonction de l'état actuel du sondage.
    },

    // J'utilise cette fonction pour sauvegarder la réponse de l'utilisateur.
    saveResponse() {
      // Je crée un objet pour stocker la réponse de l'utilisateur
      const response = {
        questionId: this.currentQuestion.id, // L'ID de la question actuelle (j'ai ajouté une propriété ID à questions)
        userResponse: "",// Je vais stocker la réponse de l'utilisateur ici.
      };

      // Je stocke la réponse dans l'objet answers en fonction du type de question
      if (this.currentQuestion.question_type === "A") { 
        response.userResponse = this.A;//Je récupère la réponse de l'utilisateur depuis this.A.
      } else if (this.currentQuestion.question_type === "B") {
        response.userResponse = this.B;//Je récupère la réponse de l'utilisateur depuis this.B.
      } else if (this.currentQuestion.question_type === "C") {
        response.userResponse = this.C;//Je récupère la réponse de l'utilisateur depuis this.C`.
      }


  // Je définis une fonction isNumber pour vérifier si la réponse est un nombre valide.
      function isNumber(str) {
        return !isNaN(str) && str.trim() !== "";// Je vérifie si la chaîne est un nombre et qu'elle n'est pas vide.
      }
      // Cette condition permet de remplir obligatoirement la champ vide avant de continuer
      if (response.userResponse == "" || response.userResponse ==  undefined) {
          // Si response.userResponse est vide , j'affiche un message d'erreur avec le toaster.
        this.toaster.showError(
                    "Remplissez la case vide pour continuer pour continuez"
                );
        return;
      }

      // Je vérifie également si l'ID de la question actuelle est 2 spécifiquement pour l'age.
      if (this.currentQuestion.id == 2) {
        if (!isNumber(response.userResponse)) {
          this.toaster.showError("Entrez votre age en chiffre");// Si ce n'est pas un nombre, j'affiche un message d'erreur avec le toaster
          return;
        }

        //Infotmation importante : cette fonction assure que les réponses de l'utilisateur sont valides avant d'être sauvegardées, Car j'ai besoin de données réel et spécifique.
      }



      // Maintenant, je peux sauvegarder cet objet de réponse où je le souhaite, par exemple en le stockant dans un tableau
      const foundAnswer = this.answers.find(
        (el) => el.questionId == this.currentQuestion.id
      );

      if (foundAnswer) {
        foundAnswer.userResponse = response.userResponse; 
      }else{
        this.answers.push(response);
      }
      
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

  watch:{
    index(newIndex, oldIndex){
      console.log(newIndex);// J'affiche le nouvel index dans la console pour le suivi
      console.log(oldIndex);// J'affiche l'ancien index pour comparer avec le nouveau.
      console.log("-------------");
      
        // Je cherche dans le tableau des réponses (`this.answers`) la réponse qui correspond à l'ancienne question (ancien index).
        const foundAnswer = this.answers.find(
        (el) => el.questionId == oldIndex // Je compare l'identifiant de la question stocké dans les réponses avec l'ancien index.
      );

      if (foundAnswer) {
        // Je pré-remplis les champs A, B, et C avec la réponse déjà enregistrée pour la nouvelle question (newIndex). car cela permet à l'utilisateur de voir ce qu'il a déjà répondu si jamais il revient sur cette question.
        this.A = this.answers[newIndex]?.userResponse;
        this.B = this.answers[newIndex]?.userResponse;
        this.C = this.answers[newIndex]?.userResponse;

      }
    }

    //Information importante : ce code gère la navigation entre les questions dans le sondage en permettant à l'utilisateur de voir et modifier ses réponses précédentes. Cela assure une expérience utilisateur fluide en gardant les réponses déjà fournies accessibles et modifiables.
  },

  mounted() {
      // Ajouter l'écouteur d'événement lorsqu'on monte le composant
    window.addEventListener("keydown", this.handleKeyPress);

    
  },

   beforeDestroy() {
    // Retirer l'écouteur d'événement lorsqu'on détruit le composant
    window.removeEventListener("keydown", this.handleKeyPress);
  },

};

</script>

<template>

 <!-- commentaire pour tester mon commit!-->
  
  <header>
    <a
      href="question"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <img src="img/bigscreen_logowith.png" alt="logo" style="height: 40px" />
    </a>
  </header>

  <!-- Début du sondage! -->
  <div class="container-question">
    <div class="question_header text-white">
      <h2 class="text-center title_question">{{ currentQuestion.title }}</h2>
      <h4 class="text-center mt-3 body_question">
        {{ currentQuestion.question_body }}
      </h4>
    </div>

    <div class="question_main text-white">
      <center>
        <!-- Question de type A -->
        <div
          style="
            list-style: none;
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: fit-content;
          "
          class="containerTypeA"
          v-if="currentQuestion.question_type == 'A'"
        >
          <li
            style="list-style: none; margin: 10px; text-align: start;"
            v-for="index in currentQuestion.propositions"
            :key="index"
          >
            <input type="radio" v-model="A" :value="index" style="margin : 6px"/>
            <span>{{ index }}</span>
          </li>
        </div>
      </center>

      <!-- Question de type B -->
      <center>
        <div
          class="containerTypeB p-3"
          v-if="currentQuestion.question_type == 'B'"
        >
          <div class="input-container">
            <input
              type="text"
              id="input"
              v-model="B"
              placeholder="Entrez votre réponse"
              class="input"
            />
          </div>
        </div>
      </center>

      <!-- Question de type C -->
      <center>
        <div
          class="containerTypeC p-3"
          v-if="currentQuestion.question_type == 'C'"
        >
          <li
            style="list-style: none; margin: 10px ; "
            v-for="index in [1, 2, 3, 4, 5]"
            :key="index"
          >
            <input type="radio" v-model="C" :value="index"  />
            <span class="mx-2">{{ index }} </span>
          </li>
        </div>
      </center>
    </div>

    <div class="question_footer p-3" style="display : flex ; justify-content : end">
      <button class="arrow-prev" @click="previousQuestion">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button class="arrow-next" @click="saveResponse" v-if="showNextButton">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <!-- Bouton pour afficher la fenêtre modale -->
      <button
        type="submit"
        class="btn btn-primary m-2 "

        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        v-if="showFinalizeButton"
        @click.prevent="submitResp"
      >
        Finalisez
      </button>
    </div>

    <p></p>
  </div>
  <!-- Fin du sondage! -->

  <!-- Fenêtre modale pour afficher le pop-up -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Merci d'avoir participé à ce sondage
          </h1>
          <button
            type="button"
            class="btn-welc"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Toute l'équipe de Bigscreen vous remercie pour votre engagement.
            Grâce à votre investissement, nous préparons une application
            toujours plus facile à utiliser, que ce soit en solo ou en famille.
            Si vous désirez consulter vos réponses ultérieurement, vous pouvez
            le faire à cette adresse :
            <router-link :to="`/checkoutresponse/${link_url}`"
              >https://www.Bigscreen.com/{{ link_url }}</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin de la fenêtre modale pour afficher le pop-up -->
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

* {
  margin: 0;
  padding: 0;
}

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-color: #151515;
}

/* Police pour les titres de question */
.title_question {
  font-family: "n-bold";
}

.body_question {
  font-family: "n-semi";
}
.label {
  font-family: "n-regular";
}
/* Fin pour les titres de question */

/* input modification */
.input-container {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 250px;
}

.input {
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: 0.3s ease;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus,
input:hover {
  outline: none;
  border-color: rgba(77, 30, 247, 0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(77, 30, 247, 0.4);
}

/* fin input modification*/

/* Début Style pour le input */

/* Fin Style pour le input */

.container-question {
  position: relative;
  padding: 15px;

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
  top: 250px;
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
  top: 250px;
  right: 90%;
}

/*Bouton de l'accueil*/

.btn-welc {
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
  box-shadow: 0px 15px 20px rgba(77, 30, 247, 0.4);
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
