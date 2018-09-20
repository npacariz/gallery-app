<template>
    <div>
        <h1>Please login</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="username">    
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <p class="alert alert-danger" v-if="error">Bad Credentials</p>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { auth } from "./../services/AuthService.js";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    ...mapActions(["changeAuthentication", "checkUserId"]),
    login() {
      auth
        .login(this.username, this.password)
        .then(() => {
          this.changeAuthentication();
          this.checkUserId();
          this.$router.push({ name: "all-galleries" });
        })
        .catch(error => {
          this.error = error.response.data.error;
        });
    }
  }
};
</script>
<style scoped>
form {
  margin: 0 auto;
  width: 70%;
}
form input {
  border-radius: 20px;
}
</style>
