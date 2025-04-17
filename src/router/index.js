import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ParentView from '../views/ParentView.vue'
import ChildView from '../views/ChildView.vue'
import ParentRewardsView from '../views/ParentRewardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/parent',
      name: 'parent',
      component: ParentView,
      meta: { mode: 'parent' }
    },
    {
      path: '/parent/rewards',
      name: 'parent-rewards',
      component: ParentRewardsView,
      meta: { mode: 'parent' }
    },
    {
      path: '/child',
      name: 'child',
      component: ChildView,
      meta: { mode: 'child' }
    }
  ]
})

export default router 