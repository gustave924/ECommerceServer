var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var router = express.Router();
const User = require('../models/User');
const authenticate = require("../../authentication");
const url = require('../../config/database.config').url;

const connection = mongoose.connect(url);
router.use(bodyParser.json());

connection
    .then((db) => {
        console.log("Connected to DB");
    })
    .catch((err) =>{
        console.log("Error occurred while connecting to DB\nError:", err);
    });

router.post("/signup", (req, res, next) => {

    User.register(new User({username: req.body.username}), 
                    req.body.password,
                    (err, user) => {
                        if(err){
                            res.statusCode = 500;
                            res.setHeader("Content-Type", "application/json");
                            res.json({err: err})
                        }else{
                            if(req.body.firstName){
                                user.firstName = req.body.firstName;
                            }
                            if(req.body.lastName){
                                user.lastName = req.body.lastName;
                            }

                            user.save((err, user) => {
                                if(err){
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({err: err});
                                    return ;
                                }
                                passport.authenticate('local')(req, res, () => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({success: true, status: 'Registration Successful!'})
                                });
                            });
                        }
                    });

});


router.post("/login", passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({_id:req.user._id})
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json({success: true, token: token, status: 'You are successfully logged in!'})
})

module.exports = router