const db = require('../configs/db');
const {
    loadExtraProduct,
    emptyOrRows,
    numberProductOneLoad,
    datetimeSQL,
} = require('../utils/numberProductOneLoad');
const slugGenerator = require('../utils/slugGenaration');
const generateFilterQuery = require('../utils/genarateFilterQuery');

class Products {
    // get product by category
    async mutipleProductsByCategory(category, req) {
        const { page, ...rest } = req.query;
        const limmit = loadExtraProduct(page);
        const sql = `SELECT 
            p.Product_ID AS id,
            p.Product_name AS productName,
            p.Product_price AS price,
            p.Product_thumb AS productThumb,
            p.Product_slug AS slug,
            d.Discount AS discount,
            b.Brand_name AS brandName,
            b.Brand_image AS brandImg,
            c.Category_name AS categoryName,
            c.Category_slug AS categorySlug
                FROM products AS p
            INNER JOIN product_brand AS b ON p.Product_brand_ID = b.Brand_ID
            INNER JOIN product_categories AS c ON p.Product_category_ID = c.Category_ID
            INNER JOIN product_discount AS d On p.Product_ID = d.Product_ID
            WHERE c.Category_slug = ? AND p.Is_delete = false ${generateFilterQuery(
                rest
            )} limit ${limmit};`;
        const sqlTProductsCount = `SELECT 
            COUNT(p.Product_name) as totalCount
            FROM products AS p
            INNER JOIN product_brand AS b ON p.Product_brand_ID = b.Brand_ID
            INNER JOIN product_categories AS c ON p.Product_category_ID = c.Category_ID
            WHERE c.Category_slug = ? AND p.Is_delete = false ${generateFilterQuery(
                rest
            )};`;
        const res = db.execute(sql, [category]);
        const res2 = db.execute(sqlTProductsCount, [category]);
        const [products, count] = await Promise.all([res, res2]);

        return {
            products: emptyOrRows(products),
            metaData: {
                totalCount: count[0]?.totalCount,
                restProducts: count[0]?.totalCount - products.length,
            },
        };
    }

    // get product by slug
    async getProductByCategoryAndSlug(category, slug) {
        const sql = `SELECT 
            p.Product_ID AS id,
            p.Product_name AS productName,
            p.Product_price AS price,
            p.Product_thumb AS productThumb,
            p.Product_slug AS slug,
            b.Brand_name AS brandName,
            b.Brand_image AS brandImg,
            b.Brand_ID AS brandId,
            c.Category_ID AS categoryId,
            c.Category_name AS categoryName,
            c.Category_slug AS category,
            d.Discount AS discount,
            n.Inventory AS quantity,
            p.SKU AS sku,
            p.Insurance_time as insurance,
            group_concat(DISTINCT i.Image SEPARATOR ', ') AS images
                FROM products AS p 
            INNER JOIN product_brand AS b ON p.Product_brand_ID = b.Brand_ID
            INNER JOIN product_categories AS c ON p.Product_category_ID = c.Category_ID
            LEFT JOIN product_images AS i ON p.Product_ID = i.Product_ID
            INNER JOIN product_discount AS d On p.Product_ID = d.Product_ID
            INNER JOIN product_inventory AS n ON p.Product_ID = n.Product_ID
            WHERE c.Category_slug = ? AND p.Product_slug = ? AND p.Is_delete = false;`;

        const res = await db.execute(sql, [category, slug]);
        if (res[0].id == null) {
            return;
        }
        return res[0];
    }

    // get propducts by seach
    async searchProducts(textSearch) {
        const sql = `SELECT 
        p.Product_ID AS id,
        p.Product_name AS productName,
        p.Product_price AS price,
        p.Product_thumb AS productThumb,
        p.Product_slug AS slug,
        b.Brand_name AS brandName,
        b.Brand_image AS brandImg,
        c.Category_name AS categoryName,
        c.Category_slug AS category
            FROM products AS p
        INNER JOIN product_brand AS b ON p.Product_brand_ID = b.Brand_ID
        INNER JOIN product_categories AS c ON p.Product_category_ID = c.Category_ID
        WHERE Product_name LIKE ?;`;
        const res = await db.execute(sql, [`%${textSearch}%`]);
        return emptyOrRows(res);
    }

    // get all categories
    async getAllCategories() {
        const sql = `SELECT Category_ID as categoryId,
            Category_name as categoryName,
            Category_slug as categorySlug 
            FROM product_categories;`;
        const res = await db.execute(sql);
        return emptyOrRows(res);
    }

    // create product
    async createProduct(req) {
        const {
            productName,
            productPrice,
            productCategoryId,
            productBrandId,
            productThumb,
            images,
            discount,
            quantity,
            sku,
            insurance,
        } = req.body;
        const slug = slugGenerator(productName);

        const sql = `INSERT INTO products 
            (Product_name, Product_price, Product_thumb, Product_category_ID, Product_brand_ID, Product_slug, SKU, Insurance_time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        const res = await db.execute(sql, [
            productName,
            productPrice,
            productThumb,
            productCategoryId,
            productBrandId,
            slug,
            sku,
            insurance,
        ]);
        if (res.affectedRows) {
            const productId = res.insertId;

            const values = images.map((image) => [productId, image]);
            const pr1 = db.query(
                'INSERT INTO product_images (Product_ID, Image) VALUES ? ',
                [values]
            );
            const pr2 = db.query(
                'INSERT INTO product_discount (Product_ID, Discount) VALUES (?, ?)',
                [productId, discount]
            );
            const pr3 = db.query(
                'INSERT INTO product_inventory (Product_ID, Inventory) VALUES (?, ?)',
                [productId, quantity]
            );
            const [res1, res2, res3] = await Promise.all([pr1, pr2, pr3]);
            return (
                res1?.affectedRows && res2?.affectedRows && res3?.affectedRows
            );
        }
    }

    // create desc product
    async createDesc(req) {
        const { id } = req.params;
        const { desc_product } = req.body;
        const sql = `INSERT INTO desc_product (Product_ID, Title, Content, Image_desc, Title_Image_desc, number_order) VALUES ?;`;

        const values = [];
        for (let i = 0; i < desc_product.length; i++) {
            const arr = [];
            arr.push(id);
            arr.push(desc_product[i].title);
            arr.push(desc_product[i].content);
            arr.push(desc_product[i].image_desc);
            arr.push(desc_product[i].title_image_desc);
            arr.push(desc_product[i].number_order);
            values.push(arr);
        }
        const res = await db.query(sql, [values]);
        return res?.affectedRows;
    }

    // create catalog product
    async createCatalog(req) {
        const { id } = req.params;
        const { product_catalog } = req.body;
        const sql = `INSERT INTO product_catalog (Product_ID, Title_catalog, Content_catalog) VALUES ?;`;
        const values = [];
        for (let i = 0; i < product_catalog.length; i++) {
            const arr = [];
            arr.push(id);
            arr.push(product_catalog[i].title_catalog);
            arr.push(product_catalog[i].content_catalog);
            values.push(arr);
        }
        const res = await db.query(sql, [values]);
        return res?.affectedRows;
    }

    // add mutiple image to product
    async addMultipleImagesToProduct(req) {
        const { id } = req.params;
        const { product_images } = req.body;
        const sql = `INSERT INTO product_images (Product_ID, image) VALUES ?;`;
        const values = [];
        for (let i = 0; i < product_images.length; i++) {
            const arr = [];
            arr.push(id);
            arr.push(product_images[i]);
            values.push(arr);
        }

        const res = await db.query(sql, [values]);
        return res?.affectedRows;
    }

    // get product description
    async getProductDesc(id) {
        const sql = `SELECT 
            d.Desc_ID AS descId, 
            d.Title AS titleDesc, 
            d.Content AS contentDesc, 
            d.Image_desc AS imgDesc,
            d.Title_image_desc AS titleImageDesc
                FROM desc_product AS d WHERE Product_ID = ?
            ORDER BY number_order ASC`;
        const res = await db.execute(sql, [id]);
        return emptyOrRows(res);
    }

    // get product catalog
    async getProductCatalog(id) {
        const sql = `SELECT 
            c.Catalog_ID AS catalogId, 
            c.Title_catalog AS titleCatalog, 
            c.Content_catalog AS contentCatalog
                FROM product_catalog AS c WHERE Product_ID = ?;`;
        const res = await db.execute(sql, [id]);
        return emptyOrRows(res);
    }

    // update product
    async updateProduct(req) {
        const { id } = req.params;
        const updateObj = req.body;
        const promises = [];

        Object.keys(updateObj).map((tableName) => {
            if (tableName == 'products') {
                updateObj[tableName].Product_update_at = datetimeSQL();
                updateObj[tableName].Product_slug = slugGenerator(
                    updateObj[tableName].product_name
                );
            }
            const sql = `UPDATE ${tableName} 
            SET ${Object.keys(updateObj[tableName])
                .map((column) => `${column} = ?`)
                .join(', ')} WHERE Product_ID = ?;`;

            const res = db.execute(sql, [
                ...Object.values(updateObj[tableName]),
                id,
            ]);
            promises.push(res);
        });

        const result = await Promise.all(promises);

        for (let i = 0; i < result.length; i++) {
            if (!result[i].affectedRows) return false;
        }
        return true;
    }

    // delete product by id
    async deleteProduct(id) {
        const pr1 = db.execute(
            `DELETE FROM desc_product WHERE Product_ID = ?`,
            [id]
        );
        const pr2 = db.execute(
            `DELETE FROM product_catalog WHERE Product_ID = ?`,
            [id]
        );
        const pr3 = db.execute(
            `DELETE FROM product_discount WHERE Product_ID = ?`,
            [id]
        );
        const pr4 = db.execute(
            `DELETE FROM product_images WHERE Product_ID = ?`,
            [id]
        );
        const pr5 = db.execute(
            `DELETE FROM product_inventory WHERE Product_ID = ?`,
            [id]
        );
        const pr6 = db.execute(
            `UPDATE products SET delete_at = ?,  
            Is_delete = ? WHERE Product_ID = ?`,
            [datetimeSQL(), true, id]
        );
        await Promise.all([pr1, pr2, pr3, pr4, pr5, pr6]);
    }

    // delete catalog by id
    async deleteCatalogById(id) {
        const res = await db.execute(
            `DELETE FROM product_catalog WHERE catalog_Id = ?`,
            [id]
        );
        console.log(res);
    }

    // delete desc by id
    async deleteDescById(id) {
        const res = await db.execute(
            `DELETE FROM product_desc WHERE desc_Id = ?`,
            [id]
        );
        console.log(res);
    }

    //delete image by id

    // get all brand product
    async getAllBrand() {
        const sql = `SELECT
            Brand_ID as idBrand,
            Brand_name as brandName,
            Brand_image as brandThumb
            FROM product_brand`;
        const res = await db.execute(sql);
        return emptyOrRows(res);
    }

    // create brand
    async createBrand(req) {
        const { brandName, brandThumb } = req.body;
        const sql =
            'INSERT INTO product_brand (Brand_name, Brand_image) VALUES (?, ?);';
        const res = await db.execute(sql, [brandName, brandThumb]);
        return res.affectedRows;
    }

    // delete brand by id
    async deleteBrand(id) {
        const sql = `DELETE FROM product_brand WHERE Brand_ID = ?`;
        const res = await db.execute(sql, [id]);
        return res?.affectedRows;
    }
}

module.exports = new Products();
