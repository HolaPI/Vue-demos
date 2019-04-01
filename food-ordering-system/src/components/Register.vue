<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img class="mx-auto d-block" src="../assets/storeLogo.png" alt="register icon">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">Enter your email</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">Set your password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <label for="repassword">Confirm your password</label>
              <input type="password" class="form-control" v-model="repassword">
            </div>
            <button class="btn btn-block btn-success">REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      repassword: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.password === this.repassword) {
        const formData = {
          email: this.email,
          password: this.password
          // repassword: this.repassword
        };
        axios.post("/wen-users.json", formData).then(() => {
          this.$router.push({ name: "loginLink" });
          // console.log(res);
        });
      } else {
        alert("Sorry, but your password is not paired");
      }
    }
  }
};
</script>

