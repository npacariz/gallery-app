import Vue from "vue";
import VueRouter from "vue-router";
import AllGalleries from "./../pages/AllGalleries.vue";
import MyGalleries from "./../pages/MyGalleries.vue";
import CreateGallery from "./../pages/CreateGallery.vue";
import Login from "./../pages/Login.vue";
import Register from "./../pages/Register.vue";
import ViewGallery from "./../pages/ViewGallery.vue";
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
    path: "/my-galleries",
    component: MyGalleries,
    name: "my-galleries"
  },
  {
    path: "/create",
    component: CreateGallery,
    name: "create-gallery"
  },
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/register",
    component: Register,
    name: "register"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
