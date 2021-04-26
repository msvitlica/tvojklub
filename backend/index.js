require("dotenv").config();
const express = require("express");
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const keys = require('./config/keys');
require('./models/userModel');
require('./services/passport');

const mongoose = require('mongoose');

mongoose
.connect(process.env.MONGO_DEV_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false    
})
.then(console.log("Database connected!"))
.catch(err => console.log(err));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


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



app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;