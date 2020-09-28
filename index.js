const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const authConfig = require('./strategy/authStrategy');

//Routes
const users = require('./routes/users');
const auth = require('./routes/auth');
auth.use('/api/', auth);
users.use('/api/users/', users);


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name: 'session-id',
    secret: process.env.API_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 60000,
    }
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));




//Passport init
app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);



//404 catcher
app.use((req, res, next) => {
    const error = new Error(`${req.originalUrl} - not found`);
    error.status = 404;
    next(error);
});

//Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ "message": `${error.message}`, error });
});

//DataBase
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("DataBase Connected");
});
mongoose.set('useCreateIndex', true);

//Run Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));