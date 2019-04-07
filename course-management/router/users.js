const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const router = express.Router()
//import date-model
require('../models/userModel')
//instantiation, it can be used to achieve 'add, delete, update, find'
const userModel = mongoose.model('user')

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
                    req.flash('success_msg', 'Login Successfully!')
                    res.redirect('/idea')
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
                                req.flash('error_msg', 'Something Unexpected Happends.')
                                res.redirect('/user/register')
                            })
                        })
                    })

                }
            })

    }
})
module.exports = router