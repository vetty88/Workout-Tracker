const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const path = require("path");
// const routes = require("./routes");



const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );


app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});