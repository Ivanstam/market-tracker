import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Stocks from "../views/Stocks.vue";
import StockDetails from "../views/StockDetails.vue";
import DefaultLayout from "../components/DefaultLayout.vue"
import Authlayout from "../components/Authlayout.vue"
import store from "../store/index.js";

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/dashboard', name: 'Dashboard', component: Dashboard},
      {path: '/stocks', name: 'Stocks', component: Stocks},
      {path: '/stocks/:symbol', name: 'StockDetails', component: StockDetails}
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/login',
    component: Authlayout,
    meta: {isGuest: true},
    children: [
      {path: '/login', name: 'Login', component: Login},
      {path: '/register', name: 'Register', component: Register}
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Redirect to login/register or the dashboard when unauthorized or authorized respectively
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'Login'});
  } else if (store.state.user.token && (to.meta.isGuest)) {
    next({name: 'Dashboard'});
  } else {
    next();
  }
});

export default router;
