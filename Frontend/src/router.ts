import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = () => !!localStorage.getItem('token')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('./views/Dashboard.vue'), meta: { requiresAuth: true } },
    { path: '/login', name: 'SignIn', component: () => import('./views/auth/SignIn.vue'), meta: { requiresGuest: true } },
    { path: '/register', name: 'Register', component: () => import('./views/auth/SignUp.vue'), meta: { requiresGuest: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = isAuthenticated()

  if (to.meta.requiresGuest && loggedIn) return next({ name: 'Home' })
  if (to.meta.requiresAuth && !loggedIn) return next({ name: 'SignIn' })

  next()
})

export default router