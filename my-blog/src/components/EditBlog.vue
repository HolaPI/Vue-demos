<template>
  <div id="add-blog">
    <h1>Blog the World</h1>
    <form v-if="!submitted">
      <label>Blog Title</label>
      <input type="text" required v-model="blog.title">
      <label>Blog Content</label>
      <textarea v-model="blog.content"></textarea>
      <div class="checkboxs">
        <label>
          <input type="checkbox" value="Vue.js" v-model="blog.categories">
          Vue.js
        </label>
        <label>
          <input type="checkbox" value="Node.js" v-model="blog.categories">
          Node.js
        </label>
        <label>
          <input type="checkbox" value="React.js" v-model="blog.categories">
          React.js
        </label>
        <label>
          <input type="checkbox" value="Angular4" v-model="blog.categories">
          Angular4
        </label>
        <label>
          <input type="checkbox" value="MySQL" v-model="blog.categories">
          MySQL
        </label>
        <!-- <label v-for="(check, index) in checkboxs" :key="index">
                <input type="checkbox" value="check" :checked="index == 0" v-model="blog.categories" >
                {{ check }}
        </label>-->
        <p>
          <span>Authors</span>
          <select v-model="blog.author">
            <option v-for="(author, index) in authors" :key="index">{{ author }}</option>
          </select>
        </p>
      </div>
      <button @click.prevent="saveData">Save Edit</button>
    </form>
    <div
      class="submitStatus"
      v-if="submitted"
    >Great! Your blog has been saved. The new content is as below.</div>
    <div class="contentPreview" v-if="submitted">
      <h4>Content Preview</h4>
      <p>Blog Title: {{ blog.title }}</p>
      <p>Blog Content:</p>
      <p>{{ blog.content }}</p>
      <p>Categories:</p>
      <ul>
        <li v-for="(item, key) in blog.categories" :key="key">{{ item }}</li>
      </ul>
      <p>Author: {{ blog.author }}</p>
    </div>
    <div v-if="submitted">
      <router-link to="/add">
        <button @click="changeStatus">new Blog</button>
      </router-link>
      <router-link to="/">
        <button>Blogs Plaza</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add-blog",
  data: function() {
    return {
      id: this.$route.params.id,
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      checkboxs: ["Vue.js", "Node.js", "React.js", "Augular4", "MySQL"],
      authors: [
        "wen",
        "xue",
        "wxw",
        "ares",
        "alice",
        "amy",
        "jack",
        "pony",
        "richard",
        "william",
        "karl",
        "albert",
        "edward",
        "obama"
      ],
      submitted: false
    };
  },
  methods: {
    fetchData: function() {
      axios.get("/wenxw-posts/" + this.id + ".json").then(res => {
        // console.log(res.data);
        for (let key in res.data) {
          if (typeof res.data[key] !== "object") {
            this.blog[key] = res.data[key];
          } else {
            for (let prop in res.data[key]) {
              if (res.data[key].hasOwnProperty(prop)) {
                this.blog[key].push(res.data[key][prop]);
              }
            }
          }
        }
        // console.log(this.blog.categories);
        // categories of res.data in firebase is an array while an object in wilddog
        // DO NOT set 'this.blog = res.data' when using firebase, or unexpected bug occurs
        // at checkboxs when their initial selection is blank
        // this.blog = res.data;
      });
    },
    saveData: function() {
      //confirm editting
      if (confirm("Completed and save editting?")) {
        //  edit datium using put
        axios.put("/wenxw-posts/" + this.id + ".json", this.blog).then(() => {
          this.submitted = true;
        });
      }
    },
    changeStatus: function() {
      this.submitted = !this.submitted;
    }
  },
  //   auto-fill the blanks once this page has been created in order to reduce editting volume
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
  list-style: none;
}
#add-blog {
  margin: 0px auto;
  max-width: 820px;
  padding: 10px;
}
#add-blog h1 {
  text-align: center;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 150px;
  font-size: 16px;
  resize: vertical;
}
select {
  margin-top: 8px;
}
.checkboxs label input {
  display: inline-block;
}
.checkboxs label {
  display: inline-block;
  margin-right: 30px;
  margin-top: 5px;
}
.submitStatus {
  font-weight: bold;
  text-align: center;
}
.contentPreview {
  border: 1px dotted #f40;
  border-radius: 5px;
  margin: 8px auto;
  padding: 0px 10px;
}
.contentPreview h4 {
  text-align: center;
}
button {
  display: inline-block;
  padding: 8px;
  margin: 8px 12px 8px 0px;
  background-color: #f40;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
</style>