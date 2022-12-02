const { execute } = require('../config/db');

const routes = function (app) {
    app.get('/api/v2/categories', async (req, res, next) => {
        const sql = `SELECT
            Brand_ID as idBrand,
            Brand_name as brandName,
            Brand_image as brandThumb
            FROM product_brand`;
        const data = await execute(sql);
        await execute(sql);

        res.json({ data });
    });
};

module.exports = routes;
