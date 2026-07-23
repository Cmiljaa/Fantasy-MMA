import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
		{ path: '/login', name: 'SignIn', component: () => import('./views/auth/SignIn.vue'), meta: { requiresGuest: true } },
		{ path: '/register', name: 'Register', component: () => import('./views/auth/SignUp.vue'), meta: { requiresGuest: true } }
	]
})

export default router;