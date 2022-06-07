const db = require('../configs/db');

class ImageSevice {
    //get image
    async getImage() {
        const sql = `SELECT * FROM ${process.env.NAME_DATABASE}.images WHERE imgID = 7`
        const res = await db.execute(sql)
        return res
    }

    // insert image to database
    async insertImage(payload) {
        const sql = `INSERT INTO ${process.env.NAME_DATABASE}.images (image1) VALUES ('${payload}')`;
        const res = await db.execute(sql);
        return res?.affectedRows
    }
}

module.exports = new ImageSevice();