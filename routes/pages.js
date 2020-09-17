const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

// get index page

router.get('/', (req, res, next) => {
    res.render('index', {title:"My application"});
});


// get home page

router.get('/home', (req, res, next) => {
    res.send('This is the home page');
});


// post data login

router.post('/login', (req, res, next) => {

    user.login(req.body.username, req.body.password, function(result) {
        if (result) {
            res.send('Logged in as : '+ result.username);
        }else {
            res.send('Username/Password incorrect!');
        }
    })

});


// post data register

router.post('/register', (req, res, next) => {
    
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if (lastId) {
            res.send('Welcomw'+ userInput.username);
        }else {
            console.log('Error creating a new user ...');
        }
    });

});


module.exports = router;