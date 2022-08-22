const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root', 
  database: 'db_web',
  password: process.env.PASSWORD_MYSQL
};


const execute = async (sql, params) => {
  try {
    const connection = await mysql.createConnection(config);
    const [results, ] = await connection.execute(sql, params);
    connection.end()
    return results;

  } catch (error) {
    console.log('Failued when connect database ' + error)
  }
}

const query = async (sql, params) => {
  try {
    const connection = await mysql.createConnection(config);
    const [results, ] = await connection.query(sql, params);
    connection.end()
    return results;

  } catch (error) {
    console.log('Failued when connect database ' + error)
  }
}

module.exports = {execute, query}