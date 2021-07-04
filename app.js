// extranal import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal import
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler")
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

const app = express(); 
dotenv.config(); 

 
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err))

// request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set("view engine", "ejs");

// set static folder 
app.use(express.static(path.join(__dirname, "public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing
app.use('/', loginRouter);

app.use('/', usersRouter);

app.use('/', inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler); 
 
app.listen(process.env.PORT, () => {
    console.log(`App listen to port ${process.env.PORT}`)
})