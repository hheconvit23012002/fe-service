import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Product from '../components/Product.vue'
import Checkout from '../components/Checkout.vue'
import Orders from '../components/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta : {
        notLogin : true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Product,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/view-card',
      name: 'card',
      component: Checkout,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/list-order',
      name: 'list-order',
      component: Orders,
      meta : {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const token = localStorage.getItem('token');
  if(to.matched.some(record => record.meta.notLogin) && token){
    next(from.fullPath);
  }
  else if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});
export default router
