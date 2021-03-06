const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authConfig = async(passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    await passport.use(
        new LocalStrategy({ usernameField: 'email' }, function(
            username,
            password,
            done
        ) {
            User.findOne({ email: username }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Incorrect UserName' });
                if (!bcrypt.compare(user.password, password)) {
                    return done(null, false, { message: 'Incorrect Password' });
                }
                return done(null, user);
            })
        })
    );
}
module.exports = authConfig;