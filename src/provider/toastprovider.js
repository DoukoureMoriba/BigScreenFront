import { reactive } from "vue"; // J'importe la fonction `reactive` depuis Vue, ce qui me permet de rendre des objets réactifs.

export default function ToastProvider() {
     // Je crée un objet réactif `toaster` qui contient les informations de l'état du toast (message, type, etc.).
    const toaster = reactive({
        isShow: false, // J'initialise l'état d'affichage du toast à `false`, donc il est caché au départ.
        message: "",// Le message du toast est vide par défaut.
        type: "",  // Le type de toast (ex: 'success', 'error') est vide par défaut.
        hideAfter: 5000,// Le toast sera automatiquement caché après 5000 ms (5 secondes) par défaut.

         // Cette méthode `show` est utilisée pour afficher le toast. Je définis le message, le type, et éventuellement la durée avant de cacher.
        show: (message, type, hideAfter) => {
            toaster.isShow = true;// J'affiche le toast.
            toaster.message = message; // Je définis le message à afficher.
            toaster.type = type;// Je définis le type du toast (success, error, etc.).

            if (hideAfter) { // Je prends en compte le délai lorsqu'il est personnalisé.
                toaster.hideAfter = hideAfter;
            }


            // Je crée un timer qui cache le toast après `hideAfter` millisecondes.
            const timer = setTimeout(() => {
                toaster.hide();// Je cache le toast en appelant la méthode `hide`.
                clearTimeout(timer);// Je m'assure que le timer est bien effacé.
            }, toaster.hideAfter);
        },

        // Cette méthode `hide` permet de cacher le toast et de réinitialiser les informations.
        hide: () => {
            toaster.isShow = false; // Je masque le toast en False.
            toaster.message = "";// Je réinitialise le message
            toaster.type = "";// Je réinitialise le type
        },

        // La méthode `showSuccess` est une méthode  pour afficher un toast de type "success"
        showSuccess: (message, hideAfter) => {
            toaster.show(message, "success", hideAfter);// J'appelle la méthode `show` avec le type "success".
        },

        // De même, `showError` affiche un toast de type "error"
        showError: (message, hideAfter) => {
            toaster.show(message, "error", hideAfter);// J'appelle la méthode `show` avec le type "error"
        },
       
    });


    // Je retourne l'objet `toaster` pour qu'il puisse être utilisé ailleurs dans l'application.
    return { toaster };

    // information importante : toaster est un objet qui gère l'etat de notificaiton un peu comme les modals.
}