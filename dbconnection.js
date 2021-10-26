const mysql = require('mysql');
const util = require('util');
const db = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6446856',
  password: 'vWgX7YCu5T',
  database: 'sql6446856',
  port:'3306'
});
global.query = util.promisify(db.query).bind(db);
db.connect(async (err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = { db };

