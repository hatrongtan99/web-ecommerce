const HOST_DOMAIN = process.env.HOST_DOMAIN;

const resetEmail = (host, resetToken) => {};

const signUpEmail = (fullName) => {
    const message = {
        subject: "",
        text: "",
        html: ``,
    };
};

const notiUserOrderForAdmin = (userName, href) => {
    const message = {
        subject: `${userName} vừa mới tạo đơn hàng tại ${HOST_DOMAIN}`,
        text: "",
        html: `
        <p>Có đơn hàng mới từ khách hàng: <h3>"${userName}"</h3> tại <a href=${HOST_DOMAIN}>${HOST_DOMAIN}</a></p>
        <p>Mời anh chị click vào link bên dưới để xem chi tiết đơn hàng.</p>
        <a href=${href}>chi tiết đơn hàng.</a>`,
    };
    return message;
};

const notiUserOrder = (userName, href) => {
    const message = {
        subject: `${HOST_DOMAIN} đã tạo đơn hàng theo yêu cầu của Anh/Chị`,
        text: "",
        html: `<p>Kính chào quý khách <h3>"${userName}"</h3></p>

        <p>Cảm ơn quý khách đã mua hàng tại <a href=${HOST_DOMAIN}>${HOST_DOMAIN}</a></p>
        <p>Chúng tôi sẽ liên lạc với quý khách hàng trong thời gian sớm nhất</p>
        
        <p>Mời anh chị click vào link bên dưới để xem chi tiết đơn hàng.</p>
        
        <a href=${href}>chi tiết đơn hàng</a>
        <p>Trân trọng.</p>`,
    };
    return message;
};

module.exports = {
    signUpEmail,
    resetEmail,
    notiUserOrderForAdmin,
    notiUserOrder,
};
