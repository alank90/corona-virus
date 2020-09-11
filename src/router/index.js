/* eslint-disable no-unused-vars */
/* jshint esversion:9 */
/* jshint -W024 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Coronavirus from "../views/Coronavirus.vue";
import Headlines from "../views/Headlines.vue";
import Resources from "../views/Resources.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: function() {
      return import(/* webpackChunkName: "home" */ "../views/Home.vue");
    },
  },
  {
    path: "/coronavirus",
    name: "Coronavirus",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "coronavirus" */ "../views/Coronavirus.vue"
      );
    },
  },
  {
    path: "/headlines",
    name: "Headlines",
    component: function() {
      return import(
        /* webpackChunkName: "headlines" */ "../views/Headlines.vue"
      );
    },
  },
  {
    path: "/resources",
    name: "Resources",
    component: function() {
      return import(
        /* webpackChunkName: "resources" */ "../views/Resources.vue"
      );
    },
  },
  {
    path: "/about",
    name: "About",
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
});

export default router;
