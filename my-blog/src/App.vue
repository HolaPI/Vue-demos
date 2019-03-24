<template>
  <div id="app">
    <!-- <show-blogs></show-blogs> -->
    <!-- <add-blog></add-blog> -->
    <blog-header></blog-header>
    <!-- to keep cache -->
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    
  </div>
</template>

<script>
import AddBlog from './components/AddBlog.vue'
import ShowBlogs from './components/ShowBlogs.vue'
import BlogHeader from './components/Header.vue'

export default {
  name: 'app',
  components: {
    AddBlog,
    ShowBlogs,
    BlogHeader
  }
}
</script>

<style>

</style>
