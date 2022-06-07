const db = require('../configs/db');

class Order {
    // get order session id 
    async getSessionId(id) {
        return await db.execute('SELECT Order_session_ID AS id FROM order_session WHERE User_ID = ?', [id])
    };

    // user checkout/order
    async orderProducts(req) {
        const {userId, userName, userSex, userEmail, userPhone, userAddress, note} = req.body;
        const getSessionId = await this.getSessionId(userId);
        const sessionId = getSessionId[0].id;
        const sql =`INSERT INTO order_product 
            (User_name, User_sex, User_Email, User_phone_number, User_address, Note_content, Order_session_ID)
            VALUES (?, ?, ?, ?, ?, ?, ?)`
        const res = await db.execute(sql, [userName, userSex, userEmail, userPhone, userAddress, note, sessionId]);
        return res?.affectedRows
    };

    // add to cart
    async addToCart(req) {
        const {userId, productId, quantity} = req.body;
        const getSessionId = await this.getSessionId(userId);
        if (getSessionId.length == 0) {
            const res = await db.execute('INSERT INTO order_session (User_ID) VALUES (?)', [userId]);
            const id = res.insertId;
            const insertToCart = await db.execute('INSERT INTO cart_item (Product_ID, Order_session_ID, Quantity) VALUES (?, ?, ?);', 
                    [productId, id, quantity ]);
            return insertToCart?.affectedRows
        } else {
            const id = getSessionId[0].id;
            const insertToCart = await db.execute('INSERT INTO cart_item (Product_ID, Order_session_ID, Quantity);', 
                    [productId, id, quantity]);
            return insertToCart?.affectedRows
        }
    }
}

module.exports = new Order();