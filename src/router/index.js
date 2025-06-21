import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Dashboard from '../pages/Dashboard/index.vue'
import VerificarCodigo from '../pages/VerificarCodigo/index.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/verificar-codigo', name: 'VerificarCodigo', component: VerificarCodigo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const rotasProtegidas = ['/dashboard'];

  if (rotasProtegidas.includes(to.path) && !token) {
    return next('/login');
  }

  next();
});

export default router;
