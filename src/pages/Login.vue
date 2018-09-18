<template>
    <div>
        <h1>Please login</h1>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">    
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
export default {
  name: "Login"
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
