import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Mocha from "../views/mocha";
import Httptest from "../views/httptest";
import albumsManger from "../views/albumsManger";
import singersManger from "../views/singersManger";

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'albumsManager',
    component: albumsManger
  },
  {
    path: '/singers',
    name: 'singersManager',
    component: singersManger
  },
  {
    path: '/httptest',
    name: 'httptest',
    component: Httptest
  },
  {
    path: '/mocha',
    name: 'mocha',
    component: Mocha
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
