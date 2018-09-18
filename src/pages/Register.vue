<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" class="form-control" id="first-name" v-model="newUser.first_name">
                <p class="alert alert-danger" v-if="errors.first_name">{{errors.first_name[0]}}</p>
            </div>
            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" class="form-control" id="last-name"  v-model="newUser.last_name">
                 <p class="alert alert-danger" v-if="errors.last_name">{{errors.last_name[0]}}</p>
            </div>
             <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="newUser.email"> 
                 <p class="alert alert-danger" v-if="errors.email">{{errors.email[0]}}</p>   
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="newUser.password">
                 <p class="alert alert-danger" v-if="errors.password">{{errors.password[0]}}</p>
            </div>
             <div class="form-group">
                <label for="password-confirmation">Confirmed Password</label>
                <input type="password" class="form-control" id="password-confirmation" v-model="newUser.password_confirmation">
            </div>
            <div class="form-group">
               <input type="checkbox" class="form-check-input" v-model="newUser.terms_and_conditions">
                <label class="form-check-label" for="exampleCheck1">Accepted terms and conditions</label> 
                <p class="alert alert-danger" v-if="errors.terms_and_conditions">{{errors.terms_and_conditions[0]}}</p>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { auth } from "./../services/AuthService.js";
export default {
  name: "Register",
  data() {
    return {
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms_and_conditions: false
      },
      errors: {}
    };
  },
  methods: {
     ...mapActions([
      "changeAuthentication"
    ]),
    register() {
      auth
        .register(this.newUser)
        .then(() => {
          this.changeAuthentication();
          this.$router.push({ name: "all-galleries" });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
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

