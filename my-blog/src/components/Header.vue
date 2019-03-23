<template>
    <nav>
        <ul>
            <li>
                <router-link to="/" exact>Blogs</router-link>
                <router-link to="/add" exact>new Blog</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'blog-header'
}
</script>

<style>
    nav{
        background-color: #7de6c2;
        height: 50px;
        max-width: 800px;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto 5px;
    }
    nav li{
        list-style: none;
        
        margin: 0 10px;
    }
    nav li a{
        text-decoration: none;
        padding: 10px 30px;
        border-radius: 5px;
        color: #fff;
    }
    .router-link-active{
        background-color: #fff;
        opacity: 0.8;
        color: #7dd1f0;
    }

</style>


