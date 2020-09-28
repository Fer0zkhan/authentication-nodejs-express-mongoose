const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async(req, res, next) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashPassword,
        type
    });

    await user.save((err) => {
        if (err) {
            const error = new Error('User could not be created');
            error.status = 404;
            return next(err, error);
        }
        return res.json({
            message: 'User Added Successfully',
            user
        });
    });
}
module.exports = { createUser };