import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Wishlist from '../views/Wishlist.vue'
import Product from '../views/Product.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import ProductDetail from '../views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'product/page/:page?',
          name: 'product',
          component: Product
        }
      ]
    },
    {
      path: '/product/detail/:id',
      name: 'productDetail',
      component: ProductDetail
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.access_token && to.name === 'wishlist') {
    next('/login')
  } else if (localStorage.access_token && to.name === 'login') {
    next('/')
  } else if (localStorage.access_token && to.name === 'register') {
    next('/')
  } else {
    next()
  }
})

export default router
