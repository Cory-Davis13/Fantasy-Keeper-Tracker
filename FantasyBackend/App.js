const express = require("express");
const bodyParser = require("body-parser");
let config = require("./config.js");
const mysql = require("mysql2");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const connection = mysql.createConnection(config);

app.get("/", (req, res) => {});

//CREATE ROUTES
app.post("/addPlayer", (req, res) => {
  let sql = `CALL createPlayerRecord(?,?,?,?,?)`;
  const year = req.body.year;
  const manager = req.body.manager;
  const player = req.body.player.replace(/\s/g, " ");
  const retained = req.body.retain;
  const remain = req.body.remain;
  connection.query(
    sql,
    [year, manager, player, retained, remain],
    (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.redirect("/getData/success");
    }
  );
});

//DELETE ROUTE
app.post("/deletePlayer", async (req, res) => {
  let sql = `CALL deletePlayerRecord(?,?,?)`;
  const year = req.body.year;
  const manager = req.body.manager;
  const player = req.body.player.replace(/\s/g, " ");
  connection.query(sql, [year, manager, player], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.redirect("/getData/" + year + "/" + manager);
  });
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
