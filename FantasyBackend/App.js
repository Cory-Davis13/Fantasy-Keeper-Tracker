const express = require("express");
let config = require("./config.js");
const mysql = require("mysql2");

const app = express();
const port = 5000;

const connection = mysql.createConnection(config);

app.get("/", (req, res) => {});

//CREATE ROUTES
app.post("/addPlayer/:year/:manager/:player/:retained/:remain", (req, res) => {
  let sql = `CALL createPlayerRecord(?,?,?,?,?)`;
  console.log(req);
  const param1 = req.params.year;
  const param2 = req.params.manager;
  const param3 = req.params.player;
  const param4 = req.params.retained;
  const param5 = req.params.remain;
  connection.query(
    sql,
    [param1, param2, param3, param4, param5],
    (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("record added!");
    }
  );
});

//READ ROUTES
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
