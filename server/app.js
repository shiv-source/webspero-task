const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");



// connect to mongodb ///
require("./libs/db");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
require("./middlewares/passport")(passport);

// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));

/// handle routes ///

const userRouter = require("./routes/user");

app.use("/api" , userRouter );

module.exports = app;

