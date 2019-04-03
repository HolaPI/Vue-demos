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
router.get('/user/register', (req, res) => {
    res.render('user/register')
})
module.exports = router