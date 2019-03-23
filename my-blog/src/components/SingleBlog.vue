<template>
    <div id="single-blog">
        <div class="showDetails">
            <div>
                <h3>{{ blog.title }}</h3>
                <article>{{ blog.body }}</article>
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
        this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id)
                  .then(function(data){
                      this.blog = data.body
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


