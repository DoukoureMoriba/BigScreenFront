import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: '/administration',
      name: 'login',
      component: () => import('../views/Login.vue')
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),

      beforeEnter: (to, from, next) => {
        // Vous pouvez mettre votre logique d'authentification ici
        // Par exemple, vérifiez si l'utilisateur est authentifié en tant qu'admin
        const isAdmin =  sessionStorage.getItem('est-t-il-connecter');/* Votre logique pour vérifier le rôle "admin" */
        
        if (isAdmin) {
          // Si l'utilisateur est authentifié en tant qu'admin, autorisez l'accès
          next();
        } else {
          // Sinon, redirigez-le vers la page de connexion ou une autre page appropriée
          next('/administration');
        }
      }
    

    },

    {
      path: '/dashboardquestion',
      name: 'dashboardquestion',
      component: () => import('../views/DashboardQuestion.vue'),
      beforeEnter: (to, from, next) => {
        // Vous pouvez mettre votre logique d'authentification ici
        // Par exemple, vérifiez si l'utilisateur est authentifié en tant qu'admin
        const isAdmin =  sessionStorage.getItem('est-t-il-connecter');/* Votre logique pour vérifier le rôle "admin" */
        
        if (isAdmin) {
          // Si l'utilisateur est authentifié en tant qu'admin, autorisez l'accès
          next();
        } else {
          // Sinon, redirigez-le vers la page de connexion ou une autre page appropriée
          next('/administration');
        }
      }
    
    },

    {
      path: '/dashboardresponse',
      name: 'dashboardresponse',
      component: () => import('../views/DashboardResponse.vue'),
      beforeEnter: (to, from, next) => {
        // Vous pouvez mettre votre logique d'authentification ici
        // Par exemple, vérifiez si l'utilisateur est authentifié en tant qu'admin
        const isAdmin =  sessionStorage.getItem('est-t-il-connecter');/* Votre logique pour vérifier le rôle "admin" */
        
        if (isAdmin) {
          // Si l'utilisateur est authentifié en tant qu'admin, autorisez l'accès
          next();
        } else {
          // Sinon, redirigez-le vers la page de connexion ou une autre page appropriée
          next('/administration');
        }
      }
    

    },



    {
      path: '/question',
      name: 'question',
      component: () => import('../components/Question.vue')
    },

    {
      path: '/checkoutresponse/:code',
      name: 'checkoutresponse',
      component: () => import('../views/CheckoutResponse.vue')
    },


  ]


})

export default router
