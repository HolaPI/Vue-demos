const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
// const lang = require('./config/lang')

mongoose.connect('mongodb://localhost/course-M', { useNewUrlParser: true })
    //check connection status
    .then(() => {
        console.log('Database is connected')
    })
    .catch(err => {
        console.log(err)
    })
const idea = require('./router/idea')
const users = require('./router/users')
const app = express()
//handlebars middleware
app.engine('handlebars', exphbs({
    //declaim the entry file is main.handlebars
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
//bodyParser middlewaries
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
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
    res.locals.userV = users.userV[0] || null
    res.locals.userN = users.userV[1] || null
    // app.locals.lang = lang
    next()
})
app.use('/idea', idea)
app.use('/', users.router)
//config public-directory as a static file
app.use(express.static(path.join(__dirname, 'public')))
const port = 8088
app.listen(port, () => {
    console.log(`Port ${port} is working.`)
})