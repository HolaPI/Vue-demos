<template>
  <div id="single-blog">
    <div class="showDetails">
      <div>
        <h3>{{ blog.title }}</h3>
        <article>{{ blog.content }}</article>
        <ul>
          <li v-for="(category, index) in blog.categories" :key="index">{{ category }}</li>
        </ul>
        <p>author: {{ blog.author }}</p>
      </div>
    </div>
    <router-link to="/">
      <button class="btn-group">&lt;&lt;&nbsp;Back</button>
    </router-link>
    <button @click="deleteBlog" class="btn-group">Delete</button>
    <router-link :to="'/edit/' + id">
      <button class="btn-group">Edit</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created: function() {
    axios.get("/wenxw-posts/" + this.id + ".json").then(data => {
      this.blog = data.data;
      //   this.blog = data.body
    });
  },
  methods: {
    deleteBlog: function() {
      if (confirm("Sure to delete this blog?")) {
        axios.delete("/wenxw-posts/" + this.id + ".json").then(res => {
          this.$router.push({ path: "/" });
        });
      }
    }
  }
};
</script>
<style>
#single-blog {
  max-width: 820px;
  margin: 0px auto;
}
#single-blog .showDetails {
  padding: 10px;
  background-color: #7dd1f0;
  border-radius: 5px;
}
#single-blog .showDetails div {
  border: 1px dotted #fff;
  border-radius: 5px;
  padding: 0px 10px 10px;
}
#single-blog .showDetails h3 {
  text-transform: uppercase;
}
#single-blog .showDetails article::first-letter {
  text-transform: capitalize;
  font-size: 20px;
  color: #f00;
}
.btn-group {
  /* margin-top: 10px; */
  display: inline-block;
  padding: 8px;
  margin: 10px 10px 0px 0px;
  background-color: #f40;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
</style>


