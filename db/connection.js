// I also enjoy traversing the interwebs -- theyre a series of tubes yo

//this bad boy right here is gunna make all that happen -- bring on the unicorns!
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
