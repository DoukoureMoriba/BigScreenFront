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
      component: () => import('../views/Dashboard.vue')
    },

    {
      path: '/dashboardquestion',
      name: 'dashboardquestion',
      component: () => import('../views/DashboardQuestion.vue')
    },

    {
      path: '/dashboardresponse',
      name: 'dashboardresponse',
      component: () => import('../views/DashboardResponse.vue')
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
