const mysql = require('mysql');
const util = require('util');
const db = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6443877',
  password: 'J8qDiDJp3j',
  database: 'sql6443877',
  port:'3306'
});
global.query = util.promisify(db.query).bind(db);
db.connect(async (err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});
