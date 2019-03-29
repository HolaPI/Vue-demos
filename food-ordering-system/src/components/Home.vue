<template>
  <div>
    <h1>Home</h1>
    <button @click="goToURL" class="btn btn-success">Click and GO</button>
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
      // this.$router.push({ name: "adminLink" });
    }
  }
};
</script>

