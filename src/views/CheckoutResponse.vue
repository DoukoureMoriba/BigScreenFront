<script>
export default {
  data() {
    return {
      answer: [], // Je stocke les réponses récupérées de l'API
    };
  },
  methods: {
    // Cette fonction me permet de récupérer les réponses depuis l'API en fonction du paramètre de route "code"
    async getResponse() {
      var url = "http://127.0.0.1:8000/api/getResponse/" + this.$route.params.code;
      var res = await (await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })).json();
      if (res.status == "Done") {
        this.answer = res.data; // Récupération de toutes les informations dans la table Réponses depuis l'API
        console.log(this.answer);
      }
    },
  },
  mounted() {
    this.getResponse();
  },
};
</script>

<template>


  


 <center> <h1>Vérifiez vos réponses sur cette page.</h1>
 <br>
  <div v-for="a in answer" :key="a.id">
    <h3>Question {{ a.response_id + 0 }}/20</h3>
    <h4>{{ a.question_body }}</h4>
    <p>Réponse donnée : {{ a.user_response }}</p>
  </div>

  <div>
    <h2>Merci d'avoir participé à ce sondage</h2>
  </div>
  <br>
  </center>
</template>

<style>


@font-face {
    font-family: 'n-regular';
    src: url("public/fonts/Nunito-Regular.ttf");
}
@font-face {
    font-family: 'n-semi';
    src:  url("public/fonts/Nunito-SemiBold.ttf") format('truetype');
}
@font-face {
    font-family: 'n-bold';
    src: url("public/fonts/Nunito-Bold.ttf") format('truetype');
}

* {
    margin:0;
    padding: 0;
}


  body {
  font-family: "n-regular";
  font-size: 1rem;
  margin: 0 0 30px;
  padding: 0;
  text-align: center;
  }

</style>
