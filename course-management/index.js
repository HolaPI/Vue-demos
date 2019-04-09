const express = require('express')
const path = require('path')
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
const idea = require('./router/idea')
const users = require('./router/users')
// const user = require('./router/users').user
const app = express()
//handlebars middleware
app.engine('handlebars', exphbs({
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
    res.locals.userV = users.userV || null
    next()
})
app.use('/idea', idea)
app.use('/', users.router)
app.use(express.static(path.join(__dirname, 'public')))

const port = 8088
app.listen(port, () => {
    console.log(`Port ${port} is working.`)
})