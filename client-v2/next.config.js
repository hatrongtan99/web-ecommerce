const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "api.dienmaykimkhi.com",
            "dienmaykimkhi.com",
            "localhost",
            "res.cloudinary.com",
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

module.exports = nextConfig;
