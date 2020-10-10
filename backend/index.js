const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const trainingsRouter = require("./routes/trainings");
app.use('/trainings', trainingsRouter);

const memebersRouter = require("./routes/members");
app.use("/members", memebersRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;