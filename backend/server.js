const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// const router = express.Router();
require('dotenv-flow').config();

// Handle CORS + middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'auth-token, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// DB CONNECTION
mongoose
  .connect(process.env.DBHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log('Error connecting to MongoDB:' + error));
mongoose.connection.once('open', () =>
  console.log('Successfully connected to MongoDB')
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use('/api', router);

// Property routes
const propertyRoutes = require('./routes/property');
app.use('/api/properties', propertyRoutes);
// User routes
const userRoutes = require('./routes/user');
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listening on port 3000');
});

module.exports = app;
