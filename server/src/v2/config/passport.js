const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;

module.exports = async (app) => {
    app.use(passport.initialize());
    await facebookAuth();
    await gooleAuth();
};

const facebookAuth = async () => {
    try {
        passport.use(
            new facebookStrategy(
                {
                    clientID: process.env.FACEBOOK_CLIENT_ID,
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    callbackURL: '/v2/api/users/facebook/callback',
                    profileFields: ['id', 'displayName', 'photos', 'email'],
                },
                async (accessToken, refreshToken, profile, done) => {
                    if (profile) {
                        return done(null, profile);
                    }
                    return done(null, false);
                }
            )
        );
    } catch (error) {
        console.log(error);
    }
};

const gooleAuth = async () => {
    try {
        passport.use(
            new googleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: '/v2/api/users/google/callback',
                    scope: ['profile', 'email'],
                },
                async (accessToken, refreshToken, profile, done) => {
                    if (profile) {
                        return done(null, profile);
                    }
                    return done(null, false);
                }
            )
        );
    } catch (error) {
        console.log(error);
    }
};
