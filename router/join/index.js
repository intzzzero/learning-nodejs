const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

const password = 'tndud1454!';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: password,
  database: 'nodejs',
});

connection.connect();

router.get('/', (req, res) => {
  console.log('get join url');
  res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', (req, res) => {
  const body = req.body;
  const email = body.email;
  const name = body.name;
  const password = body.password;
  const sql = { email, name, pw: password };

  const query = connection.query('INSERT INTO user SET ?', sql, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.render('welcome.ejs', { name: name, id: rows.insertId });
    }
  });
});

module.exports = router;
