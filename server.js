const express = require("express");
const routes = require("./api/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

/** Error handling */
app.use((err, req, res, next) =>  {
    res.status(err.status || 500);
    res.json({
      message: err.message,
    });
  });


module.exports = app;