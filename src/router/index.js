import Vue from "vue";
import VueRouter from "vue-router";
import AllGalleries from "./../pages/AllGalleries.vue";
import MyGalleries from "./../pages/MyGalleries.vue";
import CreateGallery from "./../pages/CreateGallery.vue";
import Login from "./../pages/Login.vue";
import Register from "./../pages/Register.vue";
import ViewGallery from "./../pages/ViewGallery.vue";
import AuthorGalleries from "./../pages/AuthorGalleries.vue";
import { auth } from "./../services/AuthService.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AllGalleries,
    name: "all-galleries"
  },
  {
    path: "/galleries/:id",
    component: ViewGallery,
    name: "view-gallery"
  },
  {
    path: "/authors/:id",
    component: AuthorGalleries,
    name: "author-galleries"
  },
  {
    path: "/my-galleries",
    component: MyGalleries,
    name: "my-galleries",
    meta: { requiresAuth: true }
  },
  {
    path: "/create",
    component: CreateGallery,
    name: "create-gallery",
    meta: { requiresAuth: true }
  },
  {
    path: "/edit-gallery/:id",
    component: CreateGallery,
    name: "edit-gallery",
    meta: { requiresAuth: true }
  },

  {
    path: "/login",
    component: Login,
    name: "login",
    meta: { Guest: true }
  },
  {
    path: "/register",
    component: Register,
    name: "register",
    meta: { Guest: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (auth.isAuthenticated()) {
      return next();
    } else {
      return next({ name: "login" });
    }
  }
  if (to.meta.Guest) {
    if (auth.isAuthenticated()) {
      return next({ name: "all-galleries" });
    } else {
      return next();
    }
  }
  next();
});

export default router;
