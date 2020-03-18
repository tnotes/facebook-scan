import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _47e44872 = () => interopDefault(import('../client/pages/ket-qua/index.vue' /* webpackChunkName: "pages/ket-qua/index" */))
const _77b9c6c1 = () => interopDefault(import('../client/pages/nap-danh-sach/index.vue' /* webpackChunkName: "pages/nap-danh-sach/index" */))
const _195c6f12 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/ket-qua",
    component: _47e44872,
    name: "ket-qua"
  }, {
    path: "/nap-danh-sach",
    component: _77b9c6c1,
    name: "nap-danh-sach"
  }, {
    path: "/",
    component: _195c6f12,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
