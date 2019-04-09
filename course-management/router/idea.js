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
router.get('/:userId', (req, res) => {
    //find all data in course-M db
    // console.log(req.params.userId)
    courseModel.find({ user: req.params.userId })
        .sort({ date: 'desc' }) //sort data by descending
        .then(courses => {
            res.render('discovery/idea', {
                courses: courses
            })
        })

})
router.post('/:userId', urlencodedParser, (req, res) => {
    // console.log(req.params.userId)
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
            details: req.body.details,
            user: req.params.userId
        }
        new courseModel(newUser).save().then(() => {
            req.flash('success_msg', 'Great, new Course has been Added!')
            res.redirect('/idea/' + req.params.userId)
        })
    }
});
router.get('/edit/:id', (req, res) => {
    courseModel.findOne({
        _id: req.params.id
    }).then(course => {
        res.render('discovery/edit', {
            course: course
        })
        // console.log(course)
        // if (course.id != req.params.id) {
        //     res.flash('error_msg', 'Illegal Operation.')
        //     res.redirect('/idea')
        // } else {
        //     res.render('discovery/edit', {
        //         course: course
        //     })
        // }

    })

})
router.put('/:id', urlencodedParser, (req, res) => {
    courseModel.findOne({
        _id: req.params.id
    }).then(course => {
        course.title = req.body.title,
            course.details = req.body.details
        course.save()
        req.flash('success_msg', 'Congrds, Edit Successfully!')
        res.redirect('/idea/' + course.user)
    })
})
//add two parameters :id/:name
router.delete('/:id/:userId', urlencodedParser, (req, res) => {
    // console.log(req.params)
    courseModel.deleteOne({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_msg', 'Datium Delted.')
            res.redirect('/idea/' + req.params.userId)
        })
})

module.exports = router