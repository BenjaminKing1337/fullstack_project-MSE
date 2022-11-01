const sql = require("mssql");
const express = require("express");
const app = express();

// Handle CORS + middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  ); // If using .fetch and not axios
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// DB CONNECTION
const config = {
  server: "localhost\\SQLEXPRESS",
  port: 1433,
  user: "sa",
  password: "",
  database: "mseDB",
  options: {
    enableArithAbort: true,
  },
  connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  encrypt: false,
};

// Body Parser Middleware
app.use(express.json());

app.get("/api/properties", function (req, res) {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().query("select * from tblProperty");
      //   .execute("GetProperty");
    })
    .then((result) => {
      //   console.log(result.recordset[0]);
      res.status(200).json({
        result: result,
      });
      sql.close();
    })
    .catch((err) => {
      console.log(err.message);
      sql.close();
    });
});
app.get("/api/property/:id", function (req, res) {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, parseInt(req.params.id))
        .execute("GetProperty");
    })
    .then((result) => {
      //   console.log(result.recordset[0]);
      res.status(200).json({
        result: result.recordset[0],
      });
      sql.close();
    })
    .catch((err) => {
      console.log(err.message);
      sql.close();
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
