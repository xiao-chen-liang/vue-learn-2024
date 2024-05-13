import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from "../views/NotFound.vue";
import ReportCard from "../views/ReportCard.vue";
import ScoreItem from "../views/ScoreItems.vue";
import Score from "../views/Score.vue"
import Ranking from '../views/Ranking.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: ReportCard
  },
      {
    path: '/score-item',
    name: 'score-item',
    component: ScoreItem
    },
  {
    path: '/score',
    name: 'score',
    component: Score
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking
  },
    // catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
