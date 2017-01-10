
var app = require("express")();
var passport = require("passport");
var mongoose = require("mongoose");
var session = require('express-session');

var dbConfig = require("./database");
mongoose.connect(dbConfig.url);

app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true
}));

require("./passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
require("./routes")(app, passport);

app.listen(3000);
