const sql = require("mssql");
const express = require("express")
const app = express();



// Body Parser Middleware
app.use(express.json());

app.get("/api/property/:id", function (req, res) {

});

app.listen(3000, () => {
    console.log("listening on port 3000");
})