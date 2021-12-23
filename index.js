//express setup
const express = require('express');
const app = express();


//JSON parse
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//env file setup
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
const port = process.env.PORT;


//setup view engine
const ejs = require('ejs');
app.set('view engine', 'ejs');


//loading assets
const path = require('path');
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));


//server listening
app.listen(port, () => {
    console.log(`http://localhost:${port}/login`)
});


//mongo db connection
const connectdb = require('./server/database/connection');
connectdb();


//session setup
const session = require('express-session');
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}));


//passport middleware
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const passport_service = require('./server/services/passport');
passport_service.login(passport);


//connect-flash setup
const flash = require('connect-flash');
    app.use(flash());

    app.use((req, res, next) => {
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        res.locals.warning = req.flash('warning');
        res.locals.message = req.flash('message');
        next();
    });


//setup route
const route = require('./server/routes/routes');
app.use('/', route);