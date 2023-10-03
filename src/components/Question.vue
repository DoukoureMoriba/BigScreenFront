<script>
export default {
  data() {
    return {
      question: [],
      index: 0,
      currentQuestion: {}, // Ajout de  cette propriété pour stocker la question actuelle
      answers: [],// Tableau pour stocker les réponses de l'utilisateur
      A:"",
      B:"",
      C:"",
      showNextButton: true, // Affichage par défaut le bouton "Next Question"
      showFinalizeButton: false, // affichage du bouton finalisez a la fin du sondage
      link_url : "",// contient l'url
    };
  },


  methods: {
    // Fonction pour récuperer la liste des questions des que l'utilisateur charge la page.

async getQuestion() {
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

    
 async submitResp() {
  var url = "http://127.0.0.1:8000/api/submitResponses";
  if (this.answers.length > 0) {
    var responseArray = this.answers.map((response) => {
      return {
        questionId: response.questionId,
        userResponse: response.userResponse,
      };
    });

    console.log("Sending responses:", responseArray);

    var res = await (await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.answers[0].userResponse, // Utilise la première réponse pour l'e-mail
        responses: responseArray, // Envoie d'un tableau d'objets réponse
      }),
    })).json();

    console.log("API response:", res);

    if (res.status == "Done") {
      console.log("Réponses enregistrées avec succès !");
      // Réinitialisation des réponses après les avoir enregistrées avec succès
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
    // Gérer le cas où this.answers est vide
    console.log("Aucune réponse n'a été enregistrée.");
  }

},




    

     // Fonction pour afficher la question actuelle
    displayCurrentQuestion() {
      if (this.index>=0 && this.index<this.question.length ) {
        this.currentQuestion = this.question[this.index];
      } else {
        this.currentQuestion = {}; // rénitialisation de la question si la liste est vide
      }
    },
    
    // Fonction pour passer à la question suivante
   nextQuestion() {
  if (this.index < this.question.length - 1) {
    this.index++;
    this.displayCurrentQuestion();
    this.showNextButton = true;
    this.showFinalizeButton = false;
  } else {
    // Si l'utilisateur est à la dernière question, elle affiche le bouton "Finalisez"
    this.showNextButton = false;
    this.showFinalizeButton = true;
  }
},

// Fonction pour revenir à la question précédente
  previousQuestion() {
    if (this.index > 0) {
      this.index--; // Décrémente l'index pour revenir à la question précédente
      this.displayCurrentQuestion();
      this.showNextButton = true; // Réaffiche le bouton "Next Question"
      this.showFinalizeButton = false; // Masque le bouton "Finalisez"
    } else {
      // Si l'utilisateur est déjà sur la première question, vous pouvez gérer cela comme vous le souhaitez, par exemple, afficher un message d'erreur.
      console.log("Vous êtes déjà sur la première question.");
    }
  },

    saveResponse() {
    // Création d'objet pour stocker la réponse de l'utilisateur
    const response = {
        questionId: this.currentQuestion.id, // L'ID de la question actuelle (ajoute une propriété ID à vos questions si ce n'est pas déjà fait)
        userResponse: "",
    };

    // Stockez la réponse dans l'objet answers en fonction du type de question
    if (this.currentQuestion.question_type === 'A') {
        response.userResponse = this.A;
    } else if (this.currentQuestion.question_type === 'B') {
        response.userResponse = this.B;
    } else if (this.currentQuestion.question_type === 'C') {
        response.userResponse = this.C;
    }

    // Vous pouvez maintenant sauvegarder cet objet de réponse où vous le souhaitez, par exemple en le stockant dans un tableau
    this.answers.push(response);
    console.log(this.answers);

    // Réinitialisation des champs de réponse pour la prochaine question
    this.A = "";
    this.B = "";
    this.C = "";

    // utilisation de promesse pour appeler nextQuestion une fois la réponse sauvegardée.
    this.continuerVersQuestionSuivante().then(() => {
        this.nextQuestion();
    });
},

// Promesse pour appeler nextQuestion une fois la réponse sauvegardée
continuerVersQuestionSuivante() {
    return new Promise((resolve) => {
        resolve();
    });
},



  },



 async created() {
  await this.getQuestion(); // Attendons que la requête soit terminée
  this.displayCurrentQuestion(); // Ensuite on affiche la première question une fois que les données sont disponibles
  await this.submitResp(); // Attendons que la requête soit terminée
},
};
</script>

<template>
  <header>
    <a href="question" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
<img src="img/capsule_616x353.jpg" alt="logo" style="height:50px;width:100px;">
    </a>
  </header>

<!-- Début de sondage!-->



  <div class="container-question">
    <div class="question_header">
       <h2 class="text-center title_question"> {{ currentQuestion.title }} </h2>
    <h4 class="text-center mt-3 body_question">{{ currentQuestion.question_body }}</h4>
    </div>

    <div class="question_main">
      <center> 
      <!-- question de type A-->
      <div class="containerTypeA" v-if="currentQuestion.question_type=='A'">
       <li v-for=" index in currentQuestion.propositions" :key="index">
       <input type="radio" v-model="A" :value="index">{{ index }}
      </li>

      </div>
      </center>
      <!-- question de type B-->
      <center> 
      <div class="containerTypeB p-3" v-if="currentQuestion.question_type=='B'">
        <input type="text" v-model="B">
      </div>
      </center>
      <!-- question de type C-->
      <center>
      <div class="containerTypeC p-3" v-if="currentQuestion.question_type=='C'">
        <input type="number" max="5" min="1" v-model="C">
      </div>
       </center>
    </div>

    <div class="question_footer p-3">
      <button class="arrow-prev " @click="previousQuestion">
    <i class="fa-solid fa-arrow-left"></i> 
  </button>
      <button class="arrow-next"  @click="saveResponse" v-if="showNextButton">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
<!-- <button type="submit" v-if="showFinalizeButton" @click.prevent="submitResp" >Finalisez</button> -->
<!-- Button trigger modal -->
<button type="submit" class="btn btn-primary m-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="showFinalizeButton" @click.prevent="submitResp">
  Finalisez
</button>
    </div>

    <p></p>
  </div>
  <!-- Fin de sondage!-->


  <!-- fenetre modal pour afficher le pop up!-->
  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Merci d'avoir participer a ce sondage</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Toute l'équipe de Bigscreen vous remercie pour votre engagement. Grâce à
votre investissement, nous vous préparons une application toujours plus facile
à utiliser, seul ou en famille.
Si vous désirez consulter vos réponses ultérieurement, vous pouvez consultez
  cette adresse: <router-link :to="`/checkoutresponse/${link_url}`">https://www.Bigscreen.com/{{link_url}}</router-link> </p>
      </div>
      
    </div>
  </div>
</div>
 <!--  Fin fenetre modal pour afficher le pop up!-->
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
.container-question {
  position: relative;
  padding: 15px;
  background-color: white;
  height: 500px;
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
  top: 430px;
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
  top: 430px;
  right: 90%;
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