const db = require('../configs/db');
const {emptyOrRows} = require('../utils/numberProductOneLoad');

class Order {
    // get order session id 
    async #getSession(id) {
        return await db.execute('SELECT Order_session_ID AS id FROM order_session WHERE User_ID = ?', [id])
    };

    // user checkout/order
    async orderProducts(req) {
        const {userId, userName, userSex, userEmail, userPhone, userAddress, note} = req.body;
        const getSession = await this.#getSession(userId);
        const sessionId = getSession[0].id;
        const sql =`INSERT INTO order_product 
            (User_name, User_sex, User_Email, User_phone_number, User_address, Note_content, Order_session_ID)
            VALUES (?, ?, ?, ?, ?, ?, ?)`
        const res = await db.execute(sql, [userName, userSex, userEmail, userPhone, userAddress, note, sessionId]);
        return res?.affectedRows
    };

    // add to cart
    async addToCart(req) {
        const {userId, productId, quantity} = req.body;
        const getSession = await this.#getSession(userId);
        if (getSession.length == 0) {
            const res = await db.execute('INSERT INTO order_session (User_ID) VALUES (?)', [userId]);
            const id = res.insertId;
            const insertToCart = await db.execute('INSERT INTO cart_item (Product_ID, Order_session_ID, Quantity) VALUES (?, ?, ?);', 
                    [productId, id, quantity ]);
            return insertToCart?.affectedRows
        } else {
            const id = getSession[0].id;
            const insertToCart = await db.execute('INSERT INTO cart_item (Product_ID, Order_session_ID, Quantity);', 
                    [productId, id, quantity]);
            return insertToCart?.affectedRows
        }
    }

    // get cart products by user id
    async productsCart(userId) {
        const getSession = await this.#getSession(userId);
        const idCart = getSession[0].id;
        const sql = `SELECT 
            c.Cart_item_ID AS cartItemId, 
            o.Order_session_ID AS orderId,
            c.Product_ID AS productId, 
            c.Quantity AS quantity, 
            p.Product_name AS productName, 
            p.Product_price AS price,
            p.Product_thumb AS productThump,
            e.Category_slug AS category,
            p.Product_slug AS slug
                FROM order_session AS o
            INNER JOIN cart_item AS c ON o.Order_session_ID = c.Order_session_ID
            INNER JOIN products AS p ON c.Product_ID = p.Product_ID
            INNER JOIN product_categories AS e ON p.Product_category_ID = e.Category_ID
            WHERE o.Order_session_ID = ?;`;
        const res = await db.execute(sql, [idCart]);
        return emptyOrRows(res)
    }
}

module.exports = new Order();