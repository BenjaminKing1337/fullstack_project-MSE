const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();


// Handle CORS + middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  ); // If using .fetch and not axios
  res.header(
    'Access-Control-Allow-Headers',
    'auth-token, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// DB CONNECTION
// var config = require('./dbconfig')
sql.on("error", (err) => {
  console.log(err.message);
});




// Middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
// app.use('/api', router);





// Property routes
const propertyRoutes = require('./routes/property');
app.use("/api/properties", propertyRoutes);
// User routes
const userRoutes = require('./routes/user');
app.use("/api/users", userRoutes);




app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = router