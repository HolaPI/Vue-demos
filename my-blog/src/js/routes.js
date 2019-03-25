import ShowBlogs from '../components/ShowBlogs.vue'
import AddBlog from '../components/AddBlog.vue'
import SingleBlog from '../components/SingleBlog.vue'
import EditBlog from '../components/EditBlog.vue'

export default [
    {path: '/', component: ShowBlogs},
    {path: '/add', component: AddBlog},
    //set a parameter id
    {path: '/blog/:id', component: SingleBlog},
    {path: '/edit/:id', component: EditBlog}
]