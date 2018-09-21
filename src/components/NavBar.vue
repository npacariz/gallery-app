<template>
  <div>
    <nav class="navbar navbar-expand navbar navbar-light navbar-styling">
      <div class="collapse navbar-collapse container" id="navbarTogglerDemo01">
        <router-link class="navbar-brand" :to="{name:'all-galleries'}">Gallery App</router-link>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link class="nav-link nav-buttons" :to="{name:'all-galleries' }">
              All Galleries
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isAuthenticated" class="nav-link nav-buttons" :to="{name:'my-galleries'}">
              My Galleries
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isAuthenticated" class="nav-link nav-buttons" :to="{name:'create-gallery'}">Create Gallery
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item ">
            <router-link v-if="!isAuthenticated" class="nav-link nav-buttons" :to="{name:'login'}">
              Login
            </router-link>
          </li>
          <li class="nav-item ">
            <router-link v-if="!isAuthenticated" class="nav-link nav-buttons" :to="{name:'register'}">
              Register
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-buttons" v-if="isAuthenticated" role="button " @click="logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { auth } from "./../services/AuthService.js";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(["changeAuthentication", "deleteUserId"]),

    logout() {
      auth.logout();
      this.changeAuthentication();
      this.deleteUserId();
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
<style scoped>
.navbar-styling {
  background-color: #48494b;
}

.nav-buttons {
  color: white !important;
  font-weight: 600 !important;
  cursor: pointer;
}

.navbar-brand {
  color: white !important;
  font-weight: 600 !important;
}
</style>