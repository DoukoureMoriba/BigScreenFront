<script>
export default {
    data() {
        return {
            chekout:[],
        }
    },

    methods: {


        async chekResponse()  {
      var url = "http://127.0.0.1:8000/api/getResponse/{code}";
      var res = await(await fetch(url, {
         method: "GET",
        headers: { "Content-Type": "application/json" },
      }) 
      ).json();
       if (res.status == "Done") {
             this.chekout = res.data; // Recuperation de toute les réponses depuis l'api
          }
    },
        
    },


     mounted() {
   this.chekResponse(); 
},
}
</script>

<template>
    
  

</template>

<style>

</style>