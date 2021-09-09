const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// import routes
const auth = require("./api/auth");
const user = require("./api/user");
const message = require("./api/message");
const upload = require("./api/upload");

// init express
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// enable cors origin
app.use(cors());

// use routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/message", message);
app.use("/api/upload", upload);

// port config
const port = process.env.PORT || 5000;

// use port
app.listen(port, () => console.log(`Server running on port ${port}`));
