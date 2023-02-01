module.exports = {
  mongoose: {
    url: process.env.URL_MONGODB,
  },
  maill: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    authUser: process.env.NODEMAILER_AUTH_USER,
    authPass: process.env.NODEMAILER_AUTH_PASS,
    fromUser: process.env.NODEMAILER_FROM_USER,
    emailAdmin: process.env.NODEMAILER_ADMIN.split(" "),
  },
  limit: +process.env.RESULT_PER_PAGE,
  filter: {
    price: {
      lte1k: { $lte: 1000000 },
      in1k2k: { $gte: 1000000, $lte: 2000000 },
      in2k3k: { $gte: 2000000, $lte: 3000000 },
      in3k5k: { $gte: 3000000, $lte: 5000000 },
      gte5k: { $gte: 5000000 },
    },
    filter: {
      specialField: {
        type: [
          {
            id: 1,
            filter: "type",
            title: "Khoan xoay",
          },
          {
            id: 2,
            filter: "type",
            title: "Khoan động lực",
          },
          {
            id: 3,
            filter: "type",
            title: "Khoan bê tông",
          },
          {
            id: 4,
            filter: "type",
            title: "Bộ máy khoan + phụ kiện",
          },
          {
            id: 5,
            filter: "type",
            title: "Khoan bàn",
          },
          {
            id: 6,
            filter: "type",
            title: "Khoan góc",
          },
          {
            id: 7,
            filter: "type",
            title: "Khoan rút lõi",
          },
        ],
        powerType: [
          {
            id: 8,
            filter: "powerType",
            title: "Dùng điện",
          },
          {
            id: 9,
            filter: "powerType",
            title: "Dùng pin",
          },
        ],
        wattage: [
          {
            id: 10,
            filter: "wattage",
            title: "Dưới 300W",
          },
          {
            id: 11,
            filter: "wattage",
            title: "300W - 450W",
          },
          {
            id: 12,
            filter: "wattage",
            title: "500W - 650W",
          },
          {
            id: 13,
            filter: "wattage",
            title: "700W - 850W",
          },
          {
            id: 14,
            filter: "wattage",
            title: "Trên 850W",
          },
        ],
        battery: [
          { id: 15, filter: "battery", title: "Dưới 10.8V" },
          { id: 16, filter: "battery", title: "10.8V" },
          { id: 17, filter: "battery", title: "12V" },
          { id: 18, filter: "battery", title: "14.4V" },
          { id: 19, filter: "battery", title: "18V" },
          { id: 20, filter: "battery", title: "21V" },
          { id: 21, filter: "battery", title: "36V" },
        ],
      },
    },
  },
};
