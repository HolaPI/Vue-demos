<template>
    <div id="show-blogs" v-theme:column>
        <h1>Blog Plaza</h1>
        <input type="text" placeholder="search" ref="searchInput" @keyup.enter="searchContent">
        <button @click="searchContent">Search</button>
        <div v-for="blog in filterBlogs" class="single-blog" :key="blog.id">
            <router-link :to="'/blog/' + blog.id">
                <h3 v-rainbow>{{ blog.title | to-upperCase }}</h3>
            </router-link>
            <article>{{ blog.content | snippet }}</article>
        </div>
    </div>
</template>

<script>
// axios local import
import axios from 'axios'
export default {
    name: 'show-blogs',
    data: function(){
        return {
            blogs: [],
            search: ''
        }
    },
    created(){
        // this.$http.get('https://myblog-666.firebaseio.com/posts.json')
        axios.get('/posts.json')
            .then(obj => {
                //use arrow function to solve 'this' pointer direction problem
                let data = obj.data
                let blogsArr = []
                for(let key in data){
                    data[key].id = key
                    blogsArr.push(data[key])
                }
                this.blogs = blogsArr
            })
    },
    computed: {
        filterBlogs: function(){
            return this.blogs.filter((blog) => {
                //ignore case-sensitive
                let keyStr = this.search.toLowerCase()
                return blog.title.toLowerCase().match(keyStr)
                
            })
        }
    },
    methods: {
        searchContent: function(){
            this.search = this.$refs.searchInput.value
        }
        // highLight: function(keyStr){
        //     let oSpan = document.createElement('span')
        //     oSpan.innerHTML = keyStr
        //     oSpan.setAttribute('class', 'highlight-part')
        //     console.log(oSpan)
        // }
    },
    filters: {
        toUpperCase: function(value){
            return value.toUpperCase()
        },
        snippet: function(value){
            // to trim value that is going to show in blog plaza
            value = value.length < 180? value : value.slice(0, 180) + "..."
            return value      
        }
    },
    directives: {
        'rainbow': {
            bind(el, binding, vnode){
                el.style.color = "#" + Math.random().toString(16).slice(2, 8)
            }
        },
        'theme': {
            bind(el, binding, vnode){
                if(binding.value == 'wide'){
                    el.style.maxWidth = "1260px"
                }else if(binding.value == 'narrow'){
                    el.style.maxWidth = '560px'
                }else{
                    el.style.maxWidth = '800px'
                }
                if(binding.arg == 'column'){
                    el.style.cssText = `background-color : #7dd1f0;
                                        padding : 10px;
                                        border-radius : 5px;`
                }
            }
        }
    }
}
</script>

<style scoped>
#show-blogs{
    max-width: 800px;
    margin: 0 auto;
}
#show-blogs h1{
    text-align: center;
}
input[type=text]{
    width: 35%;
    padding: 8px;
    font-size: 16px;
    margin-right: 20px;
}
input[type=text] ~ button{
    height: 38px;
    width: 76px;
    text-transform: uppercase;
}
@media screen and (min-width: 360px){
   input[type=text]{
        width: calc(90% - 70px);
        padding: 8px;
        font-size: 16px;
        margin-right: 12px;
    }
    input[type=text] ~ button{
        height: 38px;
        width: 70px;
        text-align: center;
        text-transform: uppercase;
    } 
}
.single-blog{
    box-sizing: border-box;
    padding: 0px 10px 10px;
    background-color: #eee;
    border-radius: 5px;
    margin-bottom: 10px;
}
.single-blog a{
    text-decoration: none;
}
.single-blog h3{
    padding-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>


