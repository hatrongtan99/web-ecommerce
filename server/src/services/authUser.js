const db = require('../configs/db');
const bcrypt = require('bcrypt')

class AuthUser {
    async getUser(userEmail) {
        const sql = `SELECT * FROM ${process.env.NAME_DATABASE}.users WHERE userEmail = '${userEmail}'`
        const res = await db.execute(sql)
        return res
    }

    async saveUser(userInfo) {
        const passwordHash = await bcrypt.hash(userInfo.password, 10);
        const sql = `INSERT INTO ${process.env.NAME_DATABASE}.users 
            (userEmail, userPassword, userFirstName, userLastName, userPhone, isAdmin)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const res = await db.execute(sql, [
            userInfo.userEmail, 
            passwordHash, 
            userInfo.userFirstName, 
            userInfo.userLastName, 
            userInfo.userPhone || null, 
            0
        ])
        return res?.affectedRows
    }

    async changePassword(userEmail, newPassword) {
        const passwordHash = await bcrypt.hash(newPassword, 10)
        const sql = `UPDATE ${process.env.NAME_DATABASE}.users 
            SET userPassword = '${passwordHash}' 
            WHERE userEmail = '${userEmail}'`;
        const res = await db.execute(sql)
        return res?.affectedRows
    }
}

module.exports = new AuthUser()