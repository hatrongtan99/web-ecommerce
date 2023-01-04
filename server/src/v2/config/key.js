module.exports = {
    maill: {
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        authUser: process.env.NODEMAILER_AUTH_USER,
        authPass: process.env.NODEMAILER_AUTH_PASS,
        fromUser: process.env.NODEMAILER_FROM_USER,
        emailAdmin: process.env.NODEMAILER_ADMIN.split(' '),
    },
};
