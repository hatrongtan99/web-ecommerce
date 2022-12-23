const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new Schema(
    {
        user_name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minLength: [6, 'Password should be greater than 6 characters'],
        },
        role: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User',
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
        avatar: {
            public_id: { type: String, require: true },
            url: { type: String, require: true },
        },
    },
    { collection: 'Users', timestamps: true }
);

// encryption password before save database
userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// access token
userSchema.methods.generateAccessToken = async function () {
    return await JWT.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE,
        }
    );
};

// refresh token
userSchema.methods.generateRefreshToken = async function () {
    return await JWT.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRE,
        }
    );
};

userSchema.virtual('fullname').set(function (fullname) {
    this.user_name = fullname;
});

module.exports = model('Users', userSchema);
