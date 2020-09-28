const express = require('express');
const route = express.Router();
const passport = require('passport');

const { login, logout } = require('../controllers/authController');

//middleware

route.post('/login', passport.authenticate('local'), login);
route.get('/logout', logout);

module.exports = route;