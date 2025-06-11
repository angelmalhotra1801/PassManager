const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser=require('body-Parser')
const cors = require("cors")

const bodyParser = require("body-parser");
dotenv.config()

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passManager";

const app = express();
require("dotenv").config();
const port = 3000;
app.use(bodyParser.json())
app.use(cors())

client.connect();

//get pass
app.get("/", async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  
  res.json(findResult);
});

//save pass
app.post("/", async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);

  res.send({success:true,result:findResult});
});

//delete pass
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);

  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
