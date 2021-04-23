require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

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

const scheduleManagement = require('./routes/scheduleManagment');
app.use('/schedule-management', scheduleManagement);

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false    
  })
  .then(console.log("Database connected!"))
  .catch(err => console.log(err));

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;