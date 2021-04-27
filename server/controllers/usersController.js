const jwt = require('jsonwebtoken');
const jwtSecret = 'secret-token';
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password');
        const reverse = users.reverse();
        return res.status(200).json(reverse);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;    
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: 'User already found' });
    }
    
    try {
        const hashPassword = await bcryptjs.hash(password, 12);
        const newUser = User({ username, email, password: hashPassword });
        await newUser.save();

        const payload = { id: newUser._id };
        const token = jwt.sign(payload, jwtSecret);
        return res.status(200).json({ token: token, userId: newUser._id, email: newUser.email, username: newUser.username });
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password, please try again' });
    }

    try {
        const payload = { id: user._id };
        const token = jwt.sign(payload, jwtSecret);
        return res.status(200).json({ token: token, userId: user._id, email: user.email, username: user.username });
    } catch (error) {
        return res.status(400).json(error);
    }
}