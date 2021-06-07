const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// add environment values
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDb();

const app = express();

app.use(morgan("dev"));

// Include body parser
app.use(express.json());
app.use(
  express.json({
    extended: true,
  })
);

app.use("/api", require("./routes/StudentRoutes"));

const port = 3000 || process.env.PORT;

app.listen(
  port,
  console.log(`🚀 Server is running on port ${port}`.yellow.underline)
);
