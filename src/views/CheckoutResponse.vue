<script>

export default {

data() {
  return {
    answer : [],
  }
},
  
  
  methods: {
    async getResponse() {
      var url = "http://127.0.0.1:8000/api/getResponse/"+this.$route.params.code;
      var res = await(await fetch(url, {
         method: "GET",
        headers: { "Content-Type": "application/json" },
      }) 
      ).json();
       if (res.status == "Done") {
             this.answer = res.data; // Recuperation de toute les infos dans la table Réponses depuis l'api.
            console.log(this.answer)

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
    <h3>Question {{ a.response_id + 0}}/20</h3>
    <h4>  {{ a.question_body }}</h4>
    <p>Réponse donnée : {{ a.user_response }}</p>
  </div>

    <div>
    <h1>Merci d'avoir participé à ce sondage</h1>
   
  </div>

</template>

<style>

</style>