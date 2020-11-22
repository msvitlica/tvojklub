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

// Trainings List route
const trainingsRouter = require("./routes/trainings");
app.use('/trainings', trainingsRouter);

// Members route
const memebersRouter = require("./routes/members");
app.use("/members", memebersRouter);

// Groupe route
const groupeRouter = require("./routes/groups");
app.use("/groups", groupeRouter);

// Processed Groups route
const processedGroups= require ('./routes/processedGroups');
app.use('/processedGroups',processedGroups);

// Schedule Management route
const scheduleManagement = require('./routes/scheduleManagment');
app.use('/schedule-management', scheduleManagement);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;