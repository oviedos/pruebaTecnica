const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/user.routes");
//const morgan =require("morgan");

//import config from "./config";
const app = express();

// settings
app.set("port", process.env.PORT || 4000);
//app.set("port", config.port);}


// Middlewares
app.use(cors());
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
//app.use(require("./routes/index.routes"));

app.use( userRoutes);

module.exports = app;

