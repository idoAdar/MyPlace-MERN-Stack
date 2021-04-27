const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/usersController');

const route = express.Router();

// Url: http://localhost:5000/api/users
// Method: GET
// Desc: Fetch All Users
// Public
route.get('/', controller.getAll);

// Url: http://localhost:5000/api/users/new-user
// Method: POST
// Desc: Register New User
// Public
route.post('/new-user', [
    body('username', 'Username is required').notEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').isLength({ min: 6 })
], controller.postRegister);

// Url: http://localhost:5000/api/users/login
// Method: POST
// Desc: Login Existing User
// Public
route.post('/login', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').isLength({ min: 6 })
], controller.postLogin);

module.exports = route;