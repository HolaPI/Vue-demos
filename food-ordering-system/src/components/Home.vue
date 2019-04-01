<template>
  <div class="row">
    <div class="col-sm-12 text-center" id="home">
      <div class="bkground">
        <h1>Welcome to taste our delicious Pizzas!</h1>
        <h2>You are surely to find what you enjoy.</h2>
        <button @click="goToURL" class="btn btn-success">Go for a Pizza</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToURL() {
      //go to last-visit page
      // this.$router.go(-1);
      //go to appointed page with replace-method
      // this.$router.replace("login");
      // this.$router.replace({ name: "registerLink" });
      // go to appointed page with push-method
      // this.$router.push("admin");
      this.$router.push({ name: "menuLink" });
    }
  }
};
</script>
<style scoped>
#home {
  background: url("../assets/pizza.jpg");
  height: 85vh;
  padding: 10%;
}
h1,
h2 {
  /* color: #25b99a; */
  /* color: #e85656; */
  margin: 6%;
}
#home .bkground {
  width: 70vw;
  padding: 20px 0;
  margin: 0 auto;
  background-color: #eee;
  opacity: 0.8;
}
</style>


