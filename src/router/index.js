import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Mocha from "../views/mocha";
import Httptest from "../views/httptest";
import albumsManger from "../views/albumsManger";
import singersManger from "../views/singersManger";
import albums from "../views/albums";
import singers from "../views/singers";
import loginre from "../views/loginre";
//import admin from  "../views/admin";


Vue.use(VueRouter)



const routes = [
  {
    path: '/albumsManager',
    name: 'albumsManager',
    component: albumsManger
  },
  {
    path: '/',
    name: 'login',
    component: loginre
  },
  {
    path: '/singers',
    name: 'singers',
    component: singers
  },
  {
    path: '/albums',
    name: 'albums',
    component: albums
  },
  {
    path: '/admin',
    name: 'admin',
    component: albumsManger
  },
  {
    path: '/singersManager',
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
