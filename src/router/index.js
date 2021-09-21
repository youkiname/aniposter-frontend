import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostPage from '../views/PostPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import AdminPage from '../views/AdminPage.vue'
import UserControlPanel from '../views/UserControlPanel.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/adminka',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/adminka/user-control-panel/:user_id',
    name: 'UserControlPanel',
    component: UserControlPanel
  },
  {
    path: '/post/:post_id',
    name: 'Post',
    component: PostPage
  },
  {
    path: '/u/:user_id',
    name: 'UserProfile',
    component: ProfilePage
  },
  {
    path: '/comments-rules',
    name: 'CommentsRules',
    component: () => import('../views/CommentsRules.vue')
  },
  {
    path: '/bot-info',
    name: 'BotInfo',
    component: () => import('../views/BotInfo.vue')
  },
  {
    path: '/top',
    name: 'GlobalRatingTop',
    component: () => import('../views/GlobalRatingTop.vue')
  },
  {
    path: '/daily-top',
    name: 'DailyRatingTop',
    component: () => import('../views/DailyRatingTop.vue')
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: { name: 'NotFound' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
