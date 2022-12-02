const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST_PREFIX,
    user: 'root',
    database: process.env.NAME_DATABASE_V1,
    password: process.env.PASSWORD_MYSQL_V1,
};

const pool = mysql.createPool(config);

const execute = async (sql, params) => {
    try {
        const [result] = await pool.execute(sql, params);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const query = async (sql, params) => {
    const [result] = await pool.query(sql, params);
    return result;
};

module.exports = { execute, query };
