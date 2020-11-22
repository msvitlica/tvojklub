require("dotenv").config();
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

const groupeRouter = require("./routes/groups");
app.use("/groups", groupeRouter);
const processedGroups= require ('./routes/processedGroups');
app.use('/processedGroups',processedGroups);

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
  })
  .then(console.log("Database connecteed!"))
  .catch(err => console.log(err));

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;