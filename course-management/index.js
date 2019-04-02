const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/course-M', { useNewUrlParser: true })
    .then(() => {
        console.log('database is connected')
    })
    .catch(err => {
        console.log(err)
    })
// mongoose.connection.once('open', () => {
//     console.log('database is connected')
// }).on('error', (err) => {
//     console.log('connection failed: ', err)
// })

//import date-model
require('./models/courseModel')
const courseModel = mongoose.model('course')
const app = express()
//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
//bodyParser middlewaries
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

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
app.post('/idea', urlencodedParser, (req, res) => {
    // console.log(req.body)
    let err = []
    if (!req.body.title) {
        err.push({ text: "input title plz" })
    }
    if (!req.body.details) {
        err.push({ text: 'input details plz' })
    }
    if (err.length > 0) {
        res.render('newCourse', {
            errors: err,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        res.render('idea')
    }


});
app.get('/new-course', (req, res) => {
    res.render('newCourse')
})
const port = 8088
app.listen(port, () => {
    console.log(`here is ${port}`)
})