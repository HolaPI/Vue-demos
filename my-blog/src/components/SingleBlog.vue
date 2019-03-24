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
        <router-link to="/"><button>&lt;&lt;&nbsp;Back</button></router-link>
    </div>
</template>

<script>
export default {
    name: 'single-blog',
    data(){
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created: function(){
        this.$http.get('https://myblog-666.firebaseio.com/posts/' + this.id + '.json')
                  .then(function(data){
                      return data.json()
                    //   this.blog = data.body
                  })
                  .then(function(data){
                      this.blog = data
                  })

    }
}
</script>
<style>
    #single-blog{
        max-width: 820px;
        margin: 0px auto;
    }
    #single-blog .showDetails{
        padding: 10px;
        background-color:  #7dd1f0;
        border-radius: 5px;
    }
    #single-blog .showDetails div{
        border: 1px dotted #fff;
        border-radius: 5px;
        padding: 0px 10px 10px;
    }
    #single-blog .showDetails h3{
        text-transform: uppercase;
    }
    #single-blog .showDetails article::first-letter{
        text-transform: capitalize;
        font-size: 20px;
        color: #f00;
    }
    #single-blog .showDetails ~ a button{
        margin-top: 10px;
    }
</style>


