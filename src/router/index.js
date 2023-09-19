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
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },

    {
      path: '/DashboardQuestion',
      name: 'DashboardQuestion',
      component: () => import('../views/DashboardQuestion.vue')
    },

    {
      path: '/DashboardResponse',
      name: 'DashboardResponse',
      component: () => import('../views/DashboardResponse.vue')
    },


    {
      path: '/Survey',
      name: 'Survey',
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
