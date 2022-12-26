const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// ** Swagger · http://localhost:3000/api/docs/
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
// Swagger Setup
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition, { customSiteTitle: 'API · MSE' })
);

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
app.use('/api/users', userRoutes);
// Tenant routes
const tenantRoutes = require('./routes/tenant');
app.use('/api/tenants', tenantRoutes);
// Customer routes
const customerRoutes = require('./routes/customer');
app.use('/api/customers', customerRoutes);
// Building routes
const buildingRoutes = require('./routes/building');
app.use('/api/buildings', buildingRoutes);
// Document routes
const documentRoutes = require('./routes/document');
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listening on port 3000');
});

module.exports = app;
