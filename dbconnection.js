const mysql = require('mysql');
const util = require('util');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sumit@123',
  database: 'Project',
  port:'3306'
});
global.query = util.promisify(db.query).bind(db);

db.connect(async (err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = { db };

