const express = require("express");
const config = require("config");
const app = express();
require("winston-mongodb");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");

app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
