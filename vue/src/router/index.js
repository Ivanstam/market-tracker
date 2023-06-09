import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Stocks from "../views/Stocks.vue";
import StockInfo from "../views/StockInfo.vue";
import DefaultLayout from "../components/DefaultLayout.vue"
import Authlayout from "../components/Authlayout.vue"
import store from "../store/index.js";
import ExchangeList from "../views/ExchangeList.vue";
import Portfolio from "../views/Portfolio.vue"

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/dashboard', name: 'Dashboard', component: Dashboard},
      {path: '/stocks', name: 'Stocks', component: Stocks},
      {path: '/stocks/:symbol', name: 'StockInfo', component: StockInfo},
      {path: '/exchanges', name: 'ExchangeList', component: ExchangeList},
      {path: '/portfolio', name: 'Portfolio', component: Portfolio}
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
// TODO: Apply this and server 'handshaking' better instead of a simple local token
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
