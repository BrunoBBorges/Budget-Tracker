const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression"); 
const PORT = 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://BrunoBorges:Tz7v5rgmh2EdI67j@cluster0.zg8iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority?authSource=admin";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});