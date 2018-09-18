<template>
    <div>
        <nav class="navbar navbar-expand navbar-dark bg-primary">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
             <router-link  class="navbar-brand" :to="{name:'all-galleries'}">Gallery App</router-link>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link   class="nav-link" :to="{name:'all-galleries'}">All Galleries</router-link>
                </li>
                 <li class="nav-item">
                    <router-link v-if="isAuthenticated"  class="nav-link" :to="{name:'my-galleries'}">My Galleries</router-link>
                </li>
                 <li class="nav-item ">
                     <router-link  v-if="isAuthenticated" class="nav-link" :to="{name:'create-gallery'}">Create Gallery</router-link>
                </li>
            </ul>
             <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item ">
                    <router-link v-if="!isAuthenticated"  class="nav-link" :to="{name:'login'}">Login</router-link>
                </li>
                 <li class="nav-item ">
                    <router-link v-if="!isAuthenticated"  class="nav-link" :to="{name:'register'}">Register</router-link>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" v-if="isAuthenticated" role="button" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
        </nav>
   </div>
</template>
<script>
import { mapGetters, mapActions} from "vuex";
import { auth } from "./../services/AuthService.js";
export default {
  name: "NavBar",
  methods: {
    ...mapActions([
        "changeAuthentication"
    ]),
    
    logout() {
      auth.logout().then(() => {
        this.changeAuthentication()
        this.$router.push({ name: "login" });
      });
    }
  },
  computed: {
      ...mapGetters([
          "isAuthenticated"
      ])
  }
};
</script>

