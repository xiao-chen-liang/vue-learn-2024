import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import JobsView from "../views/jobs/JobsView.vue";
import JobDetailsView from "../views/jobs/JobDetails.vue";
import NotFoundView from "../views/NotFound.vue";
import ReportCard from "../views/ReportCard.vue";
import ScoreItem from "../views/ScoreItems.vue";
import Score from "../views/score.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: ReportCard
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component: AboutView
  },
  {
    path:'/jobs',
    name: 'jobs',
    component: JobsView
  },
  {
    path: '/jobs/:id',
    name: 'job-details',
    component: JobDetailsView,
    props: true
  },
  {
    path: '/all-jobs',
    redirect: '/jobs'
  },

    {
    path: '/score-item',
    name: 'score-item',
    component: ScoreItem
    },
    // catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/score',
    name: 'score',
    component: Score
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
