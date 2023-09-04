import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/administration',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },

    {
      path: '/',
      name: 'Sondage',
      component: () => import('../views/Survey.vue')
    },

    {
      path: '/question',
      name: 'question',
      component: () => import('../components/Question.vue')
    }
  ]
})

export default router
