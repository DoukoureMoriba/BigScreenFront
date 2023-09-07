<script>
export default {
  data() {
    return {
      question: [],
      index: 0,
      currentQuestion: {}, // Ajout de  cette propriété pour stocker la question actuelle
      anwsers: [],// Tableau pour stocker les réponses de l'utilisateur
      A:"",
      B:"",
      C:"",
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
      }
    },
  },



  
  //  // Méthode pour soumettre les réponses
  //   submitAnswers() {
  //     // Affichez les réponses dans la console (vous pouvez également les envoyer au serveur ici)
  //     console.log("Réponses soumises :", this.answers);
  //     // Réinitialisez les réponses pour la prochaine utilisation
  //     this.answers = {
  //       A: null,
  //       B: "",
  //       C: null,
  //     };
  //   },

// Fonction pour enregistrer les réponses
  saveResponse() {
    // Créez un objet pour stocker la réponse de l'utilisateur
    const response = {
      questionId: this.currentQuestion.id, // L'ID de la question actuelle (ajoutez une propriété ID à vos questions si ce n'est pas déjà fait)
      responseA: this.A, // La réponse à la question de type A
      responseB: this.B, // La réponse à la question de type B
      responseC: this.C, // La réponse à la question de type C
    };

    // Vous pouvez maintenant sauvegarder cet objet de réponse où vous le souhaitez, par exemple en le stockant dans un tableau
    this.answers.push(response);

    // Réinitialisez les champs de réponse pour la prochaine question
    this.A = "";
    this.B = "";
    this.C = "";

    // Appelez ensuite la fonction nextQuestion() pour passer à la question suivante
    this.nextQuestion();
  },

  // ...


 async created() {
  await this.getQuestion(); // Attendons que la requête soit terminée
  this.displayCurrentQuestion(); // Ensuite on affiche la première question une fois que les données sont disponibles
},
};
</script>

<template>
  <header>
    <div>
      <!-- Logo a rentrer dans cette div------>
    </div>
  </header>

  <div class="container-question">
    <div class="question_header">
       <h2 class="text-center title_question"> {{ currentQuestion.title }} </h2>
    <h4 class="text-center mt-3 body_question">{{ currentQuestion.question_body }}</h4>
    </div>

    <div class="question_main">
      <!-- question de type A-->
      <div class="containerTypeA" v-if="currentQuestion.question_type=='A'">
       <li v-for=" index in currentQuestion.propositions" :key="index">
       <input type="radio" v-model="A" :value="index">{{ index }}
      </li>

      </div>
      <!-- question de type B-->
      <div class="containerTypeB" v-if="currentQuestion.question_type=='B'">
        <input type="text" v-model="B">
      </div>
      <!-- question de type C-->
      <div class="containerTypeC" v-if="currentQuestion.question_type=='C'">
        <input type="number" v-model="C">
      </div>
    </div>

    <div class="question_footer">
      <button class="arrow-next" @click="nextQuestion()">
        <i class="fa-solid fa-arrow-right"></i>
      </button>

       <!-- Bouton de soumission -->
    <!-- <button type="submit" @click="submitAnswers()">Soumettre</button> -->
  
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: black;
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
</style>