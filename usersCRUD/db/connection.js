const mysql = require('mysql2/promise');

const dbSettings = {
  user: 'root',
  password: 'gos04965',
  server: 'localhost',
  database: 'gen_schema',
  insecureAuth : true
};

const getConnection = async () => {
  try {
    const pool = await mysql.createConnection(dbSettings)
    return pool;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getConnection;
