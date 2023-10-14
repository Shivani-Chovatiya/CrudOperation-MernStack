const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
// const dataRoutes = require("./routes/dataRoute");
const cors = require("cors");
const path = require("path");
const usersRoutes = require("./routes/UsersRoute");

//dotenv config
dotenv.config();

//connecting to mongodb database
connectDb();
const app = express();
app.use(cors());
app.use(express.json());

console.log(path.join(__dirname, "../frontend/build"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (res, req) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Welcome to Node Server</h1>");
  });
}

app.use("/api/users", usersRoutes);

app.use(errorHandler);

const PORT = 8080;
app.listen(
  // process.env.PORT ||
  PORT,
  () => {
    console.log(`Server Running in development Mode on port ${PORT}`.inverse);
  }
);
