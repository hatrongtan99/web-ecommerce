const Users = require("../models/users.model");
const cloudinary = require("cloudinary");
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const googleStrategy = require("passport-google-oauth20").Strategy;

module.exports = async (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
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
                    callbackURL: "/v2/api/users/facebook/callback",
                    profileFields: ["id", "displayName", "photos", "email"],
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        let user = await Users.findOne({
                            facebookId: profile.id,
                        });

                        if (!user) {
                            const userCloud = await cloudinary.uploader.upload(
                                profile.photos[0]?.value,
                                {
                                    folder: "avatars",
                                }
                            );
                            const avatar = {
                                public_id: userCloud.public_id,
                                url: userCloud.secure_url,
                            };
                            user = await Users.create({
                                user_name: profile.displayName,
                                email: profile.emails
                                    ? profile.emails[0].value
                                    : null,
                                provider: "facebook",
                                facebookId: profile.id,
                                password: null,
                                avatar,
                            });
                        }
                        return done(null, false);
                    } catch (error) {
                        return done(error, null);
                    }
                }
            )
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const gooleAuth = async () => {
    try {
        passport.use(
            new googleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: "/v2/api/users/google/callback",
                    scope: ["profile", "email"],
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        let user = await Users.findOne({
                            gooleId: profile.id,
                        });

                        if (!user) {
                            const userCloud = await cloudinary.uploader.upload(
                                profile.photos[0].value,
                                { folder: "avatars" }
                            );
                            const avatar = {
                                public_id: userCloud.public_id,
                                url: userCloud.secure_url,
                            };
                            user = await Users.create({
                                user_name: profile.displayName,
                                email: profile.emails
                                    ? profile.emails[0].value
                                    : null,
                                provider: "google",
                                gooleId: profile.id,
                                password: null,
                                avatar,
                            });
                        }
                        return done(null, user);
                    } catch (error) {
                        return done(error, null);
                    }
                }
            )
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findOne({ _id: id });
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
});
