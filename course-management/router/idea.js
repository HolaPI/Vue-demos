const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./users')

const router = express.Router()
//import data-model
require('../models/courseModel')
//instantiation, it can be used to achieve 'add, delete, update, find'
const courseModel = mongoose.model('course')
//bodyParser middlewaries to parse data from form-requesting
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get('/:userId', (req, res) => {
    //guide guard in case of input url with userId directly
    if (users.userV.length > 0) {
        //find logined-user data in course-M db
        courseModel.find({ user: req.params.userId })
            .sort({ date: 'desc' }) //sort data by descending
            .then(courses => {
                // let sCourses = courses.filter(course => {
                //     return course.title.toLowerCase().match(keyStr.toLowerCase())
                // })
                res.render('discovery/idea', {
                    courses: courses,
                    // user: req.params.userId
                })
            })
    } else {
        res.redirect('/')
    }
})
router.post('/:userId', urlencodedParser, (req, res) => {
    //watch inputing errors
    let err = []
    if (!req.body.title) {
        err.push({ text: "Input Title." })
    }
    if (!req.body.details) {
        err.push({ text: 'Input Details.' })
    }
    if (err.length > 0) {
        res.render('discovery/newCourse', {
            errors: err,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.params.userId
        }
        new courseModel(newUser).save().then(() => {
            req.flash('success_msg', 'Great, new Course has been Added!')
            res.redirect('/idea/' + req.params.userId)
        })
    }
});
router.get('/edit/:courseId', (req, res) => {
    courseModel.findOne({
        _id: req.params.courseId
    }).then(course => {
        res.render('discovery/edit', {
            course: course
        })
    })
})
router.put('/:courseId', urlencodedParser, (req, res) => {
    courseModel.findOne({
        _id: req.params.courseId
    }).then(course => {
        course.title = req.body.title,
            course.details = req.body.details
        course.save()
        req.flash('success_msg', 'Congrds, Edit Successfully!')
        res.redirect('/idea/' + course.user)
    })
})
//add two parameters :id/:name
router.delete('/:courseId/:userId', urlencodedParser, (req, res) => {
    // console.log(req.params)
    courseModel.deleteOne({
        _id: req.params.courseId
    })
        .then(() => {
            req.flash('success_msg', 'Datium Delted.')
            res.redirect('/idea/' + req.params.userId)
        })
})

module.exports = router