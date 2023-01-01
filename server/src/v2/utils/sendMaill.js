const { maill } = require('../config/key');
const nodemailer = require('nodemailer');

const sendmail = async (to, template) => {
    const transporter = nodemailer.createTransport({
        host: maill.host,
        port: maill.port,
        secure: false,
        auth: {
            user: maill.authUser,
            pass: maill.authPass,
        },
    });

    const options = {
        from: maill.fromUser, // sender address
        to,
        subject: template.subject,
        text: template.text || '', // plain text body
        html: template.html, // html body
    };

    return await transporter.sendMail(options);
};

module.exports = sendmail;
