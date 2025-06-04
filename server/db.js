const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection using credentials from .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect and log result
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('✅ MySQL connected successfully.');
  }
});

module.exports = db;
