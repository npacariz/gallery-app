<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #bebdb8;
  padding-bottom: 40px;
  min-height: 100vh;
}
.title-style {
  font-size: 45px;
  color: #48494b;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 1px 1px 0 #000;
  margin: 20px 0 24px;
  margin-top: 40px;
  text-align: center;
  line-height: 50px;
}

.btn-custom {
  background-color: #48494b;
  color: white;
  font-size: 18px;
  margin: 20px;
  font-weight: 900;
}

.alert-danger {
  margin-top: 10px !important;
}
</style>
