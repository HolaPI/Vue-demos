const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.get('/', (req, res) => {
    // res.send('Index')
    let title = 'Ich bin Awenn, aus China'
    res.render('index', {
        title: title
    })
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/idea', (req, res) => {
    res.render('idea')
});
app.get('/new-course', (req, res) => {
    res.render('newCourse')
})
const port = 8088
app.listen(port, () => {
    console.log(`here is ${port}`)
})