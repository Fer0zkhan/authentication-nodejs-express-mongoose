const express = require('express');
const routes = express.Router();

const { createUser } = require('../controllers/userController');

//middleware
routes.post('/register', createUser);

module.exports = routes;