const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
mongoose.connect('mongodb://localhost/course-M', { useNewUrlParser: true })
    .then(() => {
        console.log('Database is connected')
    })
    .catch(err => {
        console.log(err)
    })
//check connection status
// mongoose.connection.once('open', () => {
//     console.log('database is connected')
// }).on('error', (err) => {
//     console.log('connection failed: ', err)
// })

//import date-model
require('./models/courseModel')
//instantiation, it can be used to achieve 'add, delete, update, find'
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
//method-override middleware
app.use(methodOverride('_method'))
//session & flash middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
// configurate global varibles
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
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
    //find all data in course-M db
    courseModel.find({})
        .sort({ date: 'desc' }) //sort data by descending
        .then(courses => {
            res.render('discovery/idea', {
                courses: courses
            })
        })

})
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
        res.render('discovery/newCourse', {
            errors: err,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        // res.render('idea')
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new courseModel(newUser).save().then(() => {
            req.flash('success_msg', 'Great, new Course has been Added!')
            res.redirect('/idea')
        })
    }
});
app.get('/idea/edit/:id', (req, res) => {
    courseModel.findOne({
        _id: req.params.id
    }).then(course => {
        // console.log(course)
        res.render('discovery/edit', {
            course: course
        })
    })

})
app.put('/idea/:id', urlencodedParser, (req, res) => {
    courseModel.findOne({
        _id: req.params.id
    }).then(course => {
        course.title = req.body.title,
            course.details = req.body.details
        course.save()
    }).then(() => {
        req.flash('success_msg', 'Congrds, Edit Successfully!')
        res.redirect('/idea')
    })
})
app.delete('/idea/:id', urlencodedParser, (req, res) => {
    courseModel.deleteOne({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_msg', 'Datium Delted.')
            res.redirect('/idea')
        })
})
app.get('/new-course', (req, res) => {
    res.render('discovery/newCourse')
})
const port = 8088
app.listen(port, () => {
    console.log(`Port ${port} is working.`)
})