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
              <label for="password">Input your password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button class="btn btn-block btn-success">LOG IN</button>
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
      password: ""
    };
  },
  //set module router guard
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.dispatch("setUser", null));
  },
  methods: {
    onSubmit() {
      axios.get("/wen-users.json").then(res => {
        // console.log(res.data);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          users.push(user);
        }
        // console.log(users);
        // filter users-data
        let result = users.filter(user => {
          return this.email === user.email && this.password === user.password;
        });
        if (result != null && result.length > 0) {
          this.$store.dispatch("setUser", result[0].email);
          this.$router.push({ name: "homeLink" });
        } else {
          this.$store.dispatch("setUser", null);
          alert("Your email or password is wrong.");
        }
      });
    }
  }
};
</script>

