const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression"); 
const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
console.log(process.env.MONGODB_URI);
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}!`);
});