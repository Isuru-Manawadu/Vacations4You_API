require('dotenv/config')
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const { connectDatabase } = require("./src/database");

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: "3mb" }));
app.use(morgan("tiny"));
app.use(connectDatabase);

// Routes
const authRoute = require('./src/routes/auth');
app.use('/api/v1/auth', authRoute);

// Swagger API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./src/documentation");

app.use(
  '/api/v1/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
