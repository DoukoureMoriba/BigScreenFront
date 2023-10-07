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
  <div v-for="a in answer" :key="a.id">
    <h3>Question {{ a.response_id + 1 }}/20</h3>
    <h4>{{ a.question_body }}</h4>
    <p>Réponse donnée : {{ a.user_response }}</p>
  </div>

  <div>
    <h1>Merci d'avoir participé à ce sondage</h1>
  </div>
</template>

<style>
</style>
