<template>
  <header id="app-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="py-2" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="d-block mx-auto"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
          <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
          <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
          <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
        </svg>
      </a>
      <router-link :to="{name: 'homeLink'}" class="navbar-brand">Pizza Ordering System</router-link>
      <ul class="navbar-nav">
        <li>
          <!-- <router-link to="/" class="nav-link">Home</router-link> -->
          <router-link :to="{name: 'homeLink'}" class="nav-link">Home</router-link>
        </li>
        <li>
          <!-- <router-link to="menu" class="nav-link">Menu</router-link> -->
          <router-link :to="{name: 'menuLink'}" class="nav-link">Menu</router-link>
        </li>
        <li>
          <router-link :to="{name: 'adminLink'}" class="nav-link">Admin</router-link>
        </li>
        <li>
          <router-link :to="{name: 'aboutLink'}" class="nav-link">About</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li>
          <router-link v-show="!loginFlag" :to="{name: 'loginLink'}" class="nav-link">Login</router-link>
        </li>
        <li>
          <router-link
            v-show="loginFlag"
            :to="{name: 'loginLink'}"
            class="nav-link"
          >{{ currentUser }}</router-link>
        </li>
        <li>
          <router-link v-show="loginFlag" :to="{name: 'loginLink'}" class="nav-link">Log out</router-link>
        </li>
        <li>
          <router-link v-show="!loginFlag" :to="{name: 'registerLink'}" class="nav-link">Register</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    loginFlag() {
      return this.$store.getters.loginFlag;
    }
  }
};
</script>

<style>
</style>


