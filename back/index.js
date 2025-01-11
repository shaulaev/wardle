const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(require("./routes"));

mongoose
  .connect(
    process.env.MONGO_DB
  )
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`server has been started on port ${port}`);
    });
  })
  .catch((e) => console.log(e));
