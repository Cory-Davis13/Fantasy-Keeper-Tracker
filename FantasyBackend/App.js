const express = require("express");
const request = require("request");
const mysql = require("mysql2");

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sqlrootpass13!",
  database: "fantasydb",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getManagers", (req, res) => {
  let sql = `CALL getAllManagers()`;
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results[0]);
  });
});

app.get("/getData", (req, res) => {
  let sql = `CALL getAllData()`;
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results[0]);
  });
});

app.get("/getData/:year/:name", (req, res) => {
  let sql = `CALL getKeeperListByYearAndManager(?,?)`;
  const param1 = req.params.year;
  const param2 = req.params.name;
  connection.query(sql, [param1, param2], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
