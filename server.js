const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./app/src/config/database.config.js");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set("port", process.env.PORT || 3000);

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, { autoIndex: false })
  .then(() => {
    console.log("The database has been connected");
  })
  .catch(() => {
    console.log("Error with connect to database");
    process.exit();
  });

require("./app/src/routes/user.routes")(app);

app.listen(app.get("port"), () => {
  console.log("Server init on port", app.get("port"));
});

module.exports = app;
