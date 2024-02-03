// mysql config goes here
const mysql = require("mysql2");
// mysql connection location
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: process.env.DB_USER,
  // MySQL password
  password: process.env.DB_PASSWORD,
  //MySQL DB name
  database: process.env.DB_NAME,
});
module.exports = db;
