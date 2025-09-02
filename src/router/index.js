import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ProfileView from '@/views/ProfileView.vue'
// import ProductView from '@/views/ProductView.vue'
import PokeView from '@/views/PokeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/profile/:username',
    //   name: 'profile',
    //   component: ProfileView,
    // },
    // {
    //   path: '/product/:id/:category',
    //   name: 'product',
    //   component: () => import('../views/ProductView.vue'),
    // },
    {
      path: '/pokemon/:name',
      name: 'pokemon',
      component: PokeView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'pathMatch',
      redirect: '/',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
