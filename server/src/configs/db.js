const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST_PREFIX,
    user: 'root',
    database: process.env.NAME_DATABASE_V1,
    password: process.env.PASSWORD_MYSQL_V1,
};

const execute = async (sql, params) => {
    try {
        const connection = await mysql.createConnection(config);
        const [results] = await connection.execute(sql, params);
        connection.end();
        return results;
    } catch (error) {
        console.log('Failued when connect database ' + error);
    }
};

const query = async (sql, params) => {
    try {
        const connection = await mysql.createConnection(config);
        const [results] = await connection.query(sql, params);
        connection.end();
        return results;
    } catch (error) {
        console.log('Failued when connect database ' + error);
    }
};

module.exports = { execute, query };
