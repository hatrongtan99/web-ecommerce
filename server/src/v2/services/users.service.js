const Users = require('../models/users.model');

// register
exports.register = async ({ fistname, lastname, email, password, avatar }) => {
    // upload avatar to cloudinary
    const user = new Users({ email, password, avatar });
    user.fullname = lastname + ' ' + fistname;
    return await user.save();
};

// find user by email
exports.findUserByEmail = async (email) => {
    return await Users.findOne(email);
};

// find user by id
exports.findUserById = async (_id) => {
    return await Users.findOne({ _id }).select({ password: 0 });
};

// comparePassWord
exports.comparePass = async ({ user, password }) => {
    return await user.comparePassword(password);
};

// get all users
exports.getAllUsers = async () => {
    return await Users.find({}).select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
    });
};
