const express = require("express");

const taxiRouter = require("./routes/taxiRoutes");
const metricsRouter = require("./routes/metricsRoutes");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`
    Time: ${req.requestTime}
    Url: ${req.url}
    Method: ${req.method}`);
  next();
});

app.use("/api/v1/taxi", taxiRouter);
app.use("/api/v1/metrics", metricsRouter);
module.exports = app;
