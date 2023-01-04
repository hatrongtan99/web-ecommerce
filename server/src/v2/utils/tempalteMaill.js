const HOST_DOMAIN = process.env.HOST_DOMAIN;

const resetEmail = (host, resetToken) => {};

const signUpEmail = (fullName) => {
    const message = {
        subject: '',
        text: '',
        html: ``,
    };
};

const notiUserOrderForAdmin = (user) => {
    const message = {
        subject: `user vừa mới đặt hàng`,
        text: '',
        html: '',
    };
    return message;
};

const notiUserOrder = (username, href) => {
    const message = {
        subject: `${HOST_DOMAIN} đã tạo đơn hàng theo yêu cầu của Anh/Chị`,
        text: '',
        html: `<p>Kính chào quý khách ${username}</p>

        <p>Cảm ơn quý khách đã mua hàng tại <a href=${HOST_DOMAIN}>${HOST_DOMAIN}</a></p>
        
        <p>Mời anh chị click vào link bên dưới để xem chi tiết đơn hàng.</p>
        
        <a href=${href}>chi tiết đơn hàng.</a>`,
    };
    return message;
};

module.exports = {
    signUpEmail,
    resetEmail,
    notiUserOrderForAdmin,
    notiUserOrder,
};
