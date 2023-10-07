<script>
export default {
  data() {
    return {
      email: "", // Je stocke l'adresse e-mail de l'utilisateur
      password: "", // Je stocke le mot de passe de l'utilisateur
    };
  },
  methods: {
    // Cette fonction me permet d'envoyer les informations du formulaire pour connecter l'administrateur
    async login() {
      var url = "http://127.0.0.1:8000/api/login";
      var bodyContent = JSON.stringify({
        email: this.email, // J'utilise l'adresse e-mail saisie par l'utilisateur
        password: this.password, // J'utilise le mot de passe saisi par l'utilisateur
      });
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyContent,
      })
        .then((Response) => {
          return Response.json();
        })
        // Je lis les informations renvoyées par le serveur JSON depuis l'API.
        .then((res) => {
          console.log(res);
          if (res.status == "Done") {
            alert(res.message); // J'affiche un message de succès
            this.$router.push("/Dashboard"); // Je redirige vers la page du tableau de bord
          } else {
            alert("Impossible de vous connecter"); // J'affiche un message d'erreur en cas d'échec de la connexion
            window.location.reload(); // Je recharge la page en cas d'échec de la connexion
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div class="login-box">
    <h2>BigScreen</h2>
    <form @submit.prevent="login()">
      <!-- J'empêche l'action par défaut du formulaire de s'exécuter -->
      <div class="user-box">
        <input
          v-model="email"
          type="email"
          name="email"
          required=""
          placeholder="email"
        />
        <label></label>
      </div>
      <div class="user-box">
        <input
          v-model="password"
          type="password"
          name="password"
          required=""
          placeholder="password"
        />
        <label></label>
      </div>
      <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Envoyez
      </button>
    </form>
  </div>
</template>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-image: url(img/bigscreen_vr_light_headset.png);
   height: 100vh;
    background-position: center;
    background-size: cover;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form button {
  background-color: transparent;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
