const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const dbConfig = require('./config/database.config');
const userRouter = require('./app/routes/User')
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database.")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/authentication", userRouter);

app.get("/",(req, res) => {
    res.end("Hello World!")
})



app.listen(3000, () => {
    console.log("Serever is Connected on port 3000.");
})