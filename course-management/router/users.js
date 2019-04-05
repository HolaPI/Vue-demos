const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
//import date-model
require('../models/courseModel')
//instantiation, it can be used to achieve 'add, delete, update, find'
const courseModel = mongoose.model('course')
//bodyParser middlewaries
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//config router
router.get('/', (req, res) => {
    // res.send('Index')
    let title = 'Ich bin Awenn'
    res.render('index', {
        title: title
    })
});
router.get('/about', (req, res) => {
    res.render('about')
});
router.get('/new-course', (req, res) => {
    res.render('discovery/newCourse')
})
router.get('/user/login', (req, res) => {
    res.render('user/login')
})
router.post('/user/login', urlencodedParser, (req, res) => {
    let errors = []

})
router.get('/user/register', (req, res) => {
    res.render('user/register')
})
router.post('/user/register', urlencodedParser, (req, res) => {
    let errors = []
    if (req.body.password !== req.body.repassword) {
        errors.push({
            text: 'password is not paired'
        })
    }
    if (req.body.password.length < 6) {
        errors.push({
            text: 'password is too short'
        })
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            repassword: req.body.repassword
        })
    } else {
        res.send('congrds')
    }
})
module.exports = router