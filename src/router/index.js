import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostPage from '../views/PostPage.vue'
import ProfilePage from '../views/ProfilePage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/chat-rules',
    name: 'ChatRules',
    component: () => import('../views/ChatRules.vue')
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
