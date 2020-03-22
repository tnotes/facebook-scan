import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73f7d0f7 = () => interopDefault(import('../client/pages/email-ngau-nhien/index.vue' /* webpackChunkName: "pages/email-ngau-nhien/index" */))
const _47e44872 = () => interopDefault(import('../client/pages/ket-qua/index.vue' /* webpackChunkName: "pages/ket-qua/index" */))
const _77b9c6c1 = () => interopDefault(import('../client/pages/nap-danh-sach/index.vue' /* webpackChunkName: "pages/nap-danh-sach/index" */))
const _195c6f12 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/email-ngau-nhien",
    component: _73f7d0f7,
    name: "email-ngau-nhien"
  }, {
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
