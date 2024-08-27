<script>
export default {
    inject: ['toaster'], // J'injecte une dépendance "toaster", probablement définie dans un parent, pour accéder aux propriétés du toaster.

    data() {
        return {
           // J'utilise un objet pour mapper les types de notification à des classes Bootstrap correspondantes.
            toastClassMap: {
                error: 'bg-danger',
                success: 'bg-success',
                warning: 'bg-warning',
            },
        };
    },

    computed: {
                // Je récupère le message actuel depuis l'objet `toaster`.
        message() {
            return this.toaster.message;
        },

// Je récupère le type de notification depuis l'objet `toaster`.
        type() {
            return this.toaster.type;
        },

// Je détermine si la notification doit être affichée ou non.
        isShow() {
            return this.toaster.isShow;
        },

        // Je définis dynamiquement le titre basé sur le type de notification.
        title() {
            if (this.type === 'error') {
                return 'Erreur';
            }
            if (this.type === 'success') {
                return 'Opération réussie';
            }
            if (this.type === 'warning') {
                return 'Attention';
            }
            return '';
        },
    },

    methods: {
            // Cette méthode cache la notification en appelant la méthode `hide` sur l'objet `toaster`.
        hide() {
            this.toaster.hide();
        },
    },
};


// information importante : Ce script gère la logique de l'affichage de la notification, en utilisant des propriétés et méthodes injectées depuis un parent via toaster.

//Ces lignes de code se concentre sur l'affichage d'une notification dynamique en fonction du type d'alerte, avec des classes de style Bootstrap appliquées en conséquence.
</script>


<template>
    <!-- Je définis un conteneur pour la notification (toast). Il a des classes dynamiques basées sur le type de notification et s'affiche seulement quand `isShow` est vrai. -->
    <div class="toast msg"
        :class="{ [toastClassMap[type] || 'default']: true, 'show': Boolean(isShow) }"
        role="alert" aria-live="assertive" aria-atomic="true">

            <!-- Le header de la notification, avec un titre dynamique et un bouton pour fermer la notification. -->
        <div class="toast-header d-flex justify-content-between">
            <strong class="mr-auto">{{ title }}</strong>

            <!-- Le bouton de fermeture appelle la méthode hide() quand on clique dessus. -->
            <button type="button" class="ml-2 btn" data-dismiss="toast" aria-label="Close" @click="hide">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

                <!-- Le corps de la notification la ou le  message est affiché. -->
        <div class="toast-body white">
            {{ message }}
        </div>
    </div>

    <!-- Information importante : Ce code me permet d'affiche une notification avec un titre, un message, et un bouton pour la fermer.!-->
</template>



<style scoped>
.msg {
    /* right: 5px; */
    top: 50px;
    position: fixed;
    z-index: 4022;
    color: white;
    left: 35%;
   
}
</style>

