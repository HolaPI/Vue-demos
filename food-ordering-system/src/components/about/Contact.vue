<template>
  <div class="card text-dark bg-light mb-3">
    <div class="card-header">Contact Us</div>
    <div class="card-body">
      <h4 class="card-title">Contact Us</h4>
      <p class="card-text">shevarwin@126.com</p>
      <router-link :to="{name: 'phoneLink'}">Phone Number</router-link>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <router-link :to="{name: 'personNameLink'}">Person Name</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
