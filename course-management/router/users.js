const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
// const lang = require('../config/lang')

const userV = []
let keyStr = ''
const router = express.Router()
//import user date-model and course data-model
require('../models/userModel')
require('../models/courseModel')
//instantiation, it can be used to achieve 'add, delete, update, find'
const userModel = mongoose.model('user')
const courseModel = mongoose.model('course')

//bodyParser middlewaries
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//config router
router.get('/', (req, res) => {
    let title = 'Ich bin Awenn'
    res.render('index', {
        title: title
    })
});
router.get('/me', (req, res) => {
    res.render('me')
});
router.get('/plaza', (req, res) => {
    if (userV[0]) { //when customer has logined in
        courseModel.find({ userId: { $ne: userV[0] } })
            .sort({ date: 'desc' })
            .then((courses) => {
                //add userV in each course
                courses.forEach(course => {
                    // console.log(course.date)
                    course.userV = userV[0]
                    course.userN = userV[1]
                })
                let sCourses = courses.filter(course => {
                    //triple stuff enlarge the seaching range and either mathched is OK
                    return course.title.toLowerCase().match(keyStr) ||
                        course.details.toLowerCase().match(keyStr) ||
                        course.userName.toLowerCase().match(keyStr)
                })
                res.render('plaza', {
                    coursesT: sCourses
                })
                keyStr = ''
            })
    } else { //when customer is wandering
        courseModel.find().then(courses => {
            let sCourses = courses.filter(course => {
                return course.title.toLowerCase().match(keyStr) ||
                    course.details.toLowerCase().match(keyStr) ||
                    course.userName.toLowerCase().match(keyStr)
            })
            res.render('plaza', {
                coursesT: sCourses
            })
            keyStr = ''
        })
    }
})
//use middle-router to filte result via keywords from searching bar
//filter/:userId? enables both /filetr and /filter/:userId have access to the destination
router.post('/plaza/filter/:userId?', urlencodedParser, (req, res) => {
    console.log(req.path)
    let userId = req.params.userId
    console.log(userId)
    if (userId) {
        keyStr = req.body.keywords.toLowerCase()
        res.redirect('/plaza')
    } else {
        keyStr = req.body.keywords.toLowerCase()
        res.redirect('/plaza')
    }

})
router.get('/about', (req, res) => {
    res.render('about')
});
router.get('/new-course', (req, res) => {
    if (userV.length > 0) {
        res.render('discovery/newCourse', {
            userId: userV[0],
            userName: userV[1]
        })
    } else {
        req.flash('error_msg', 'Login First')
        res.redirect('/')
    }
})
router.get('/user/login', (req, res) => {
    res.render('user/login')
})
router.get('/user/logout', (req, res) => {
    //in order to clear userV array
    userV.splice(0)
    res.redirect('/')
})
router.post('/user/login', urlencodedParser, (req, res) => {
    userModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            req.flash('error_msg', 'User Not Found')
            res.redirect('/user/login')
            return
        } else {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err
                if (!isMatch) {
                    let err = [{ text: 'Password Not Paired!' }]
                    res.render('user/login', {
                        errors: err,
                        email: req.body.email
                    })
                    return
                } else {
                    //push userId and userName to userV in order to transit to index.js
                    userV.push(user.id)
                    userV.push(user.userName)
                    req.flash('success_msg', 'Login Successfully!')
                    res.redirect('/idea/' + user.id)
                }
            })
        }
    })
})
router.get('/user/register', (req, res) => {
    res.render('user/register')
})
router.post('/user/register', urlencodedParser, (req, res) => {
    let errors = []
    if (req.body.password !== req.body.repassword) {
        errors.push({
            text: 'Password is not paired'
        })
    }
    if (req.body.password.length < 6) {
        errors.push({
            text: 'Password is too short'
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
        userModel.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    req.flash('error_msg', 'This email has been registed, change one.')
                    res.redirect('/user/register')
                } else {
                    const newUser = new userModel({
                        userName: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        // if (err) throw err
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser.save().then(() => {
                                req.flash('success_msg', 'Registed Successfully!')
                                res.redirect('/user/login')
                            }).catch(() => {
                                req.flash('error_msg', 'Something Unexpected Occurs.')
                                res.redirect('/user/register')
                            })
                        })
                    })

                }
            })

    }
})
//redirect invalid route to homepage
// router.get('/*', (req, res) => {
//     res.redirect('/')
// });
module.exports = {
    router,
    userV
}