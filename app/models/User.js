var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstName:{
        type: String,
        default: ''
    },
    lastName:{
        type: String,
        default: ''
    },
    admin:{
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
const UserModel = mongoose.model("user", User)

module.exports = UserModel;