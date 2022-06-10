require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/user");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, './block-chain/dist')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", authRouter);


// home page
app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./block-chain/dist/index.html"));
});

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to mongodb");
    app.listen(8000, () => {
      console.log("app listening on post 8000");
    });
  }
);
