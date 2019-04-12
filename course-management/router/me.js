const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const router = express.Router()
const users = require('./users')

require('../models/userModel')
const userModel = mongoose.model('user')

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get('/infor', (req, res) => {
    res.render('me/infor')
});
router.get('/avatar', (req, res) => {
    res.render('me/avatar')
});
router.get('/modify/:userId', (req, res) => {

    if (users.userV[0]) {
        userModel.findOne({ _id: req.params.userId }).then(user => {
            res.render('me/modify', {
                name: user.userName,
                email: user.email
            })
        })
    } else {
        req.flash('error_msg', 'Login First')
        res.redirect('/')
    }
})
router.put('/modify/:userId', urlencodedParser, (req, res) => {
    let errors = []
    if (req.body.password !== req.body.repassword) {
        errors.push({
            text: 'Password Not Paired!'
        })
    }
    if (req.body.password.length < 6) {
        errors.push({
            text: 'Password Too Short!'
        })
    }
    if (req.body.vcode.toLowerCase() !== users.vcode[0]) {
        errors.push({
            text: 'Verify Code Uncorrect!'
        })
    }
    if (errors.length > 0) {
        res.render('me/modify', {
            errors: errors,
            name: req.body.name
        })
    } else {
        userModel.findOne({ _id: req.params.userId }).then(user => {
            user.userName = req.body.name
            user.password = req.body.password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err
                    user.password = hash
                    user.save().then(() => {
                        req.flash('success_msg', 'Modified Successfully!')
                        res.redirect('/user/login')
                    }).catch(() => {
                        req.flash('error_msg', 'Something Expected Occurs, Try Again.')
                        res.redirect('/me/modify')
                    })
                })
            })
        })
    }
})
router.get('/friends', (req, res) => {
    res.render('me/friends')
});

module.exports = router