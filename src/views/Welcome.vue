<script>
export default {
    
}
</script>


<template>


<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
<img src="img/bigscreen_logo_black.png" alt="logo" style="height:40px;">
    </a>
<header id="showCase">


    
    <h1>Bienvenue sur BigScreen</h1>
    <p>Bigscreen est une entreprise qui développe une application VR
permettant aux utilisateurs de regarder <mark>des films, émissions TV et jeux vidéos, en réalité virtuelle </mark> 
(VR) sur un écran géant virtuel, seul ou à plusieurs</p>
    <a href="/question">Cliquez pour participer au sondage</a>
  </header>
</template>


<style>

* {
    margin:0;
    padding: 0;
}

body {
    font-family: arial sans-serif;
    font-size: 17px;
    color: white;
    line-height: 1.6;
}

#showCase {
    background-image: url(https://i.ytimg.com/vi/tH3ZVoj8cDg/maxresdefault.jpg);
    height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    pad: 0 20px;
}

a {
    font-size: 2em;
    text-decoration: none

}

a:hover {
    color: red;
}

/* pour les écrans de mobile */
    @media (max-width: 767px) {
        a {
    font-size: 17px;
    text-decoration: none

}

body {
     font-size: 14px;
}
    }

</style>