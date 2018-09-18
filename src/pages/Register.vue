<template>
    <div>
        <h1>Register</h1>
        <form>
            <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" class="form-control" id="first-name" placeholder="First Name">
            </div>
            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" class="form-control" id="last-name">
            </div>
             <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email">    
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
             <div class="form-group">
                <label for="password-confirmation">Confirmed Password</label>
                <input type="password" class="form-control" id="password-confirmation">
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="terms-and-conditions">
                <label class="form-check-label" for="terms-and-conditions">Accepted terms and conditions</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
export default {
  name: "Register"
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

