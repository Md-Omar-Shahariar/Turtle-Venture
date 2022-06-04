const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.e7ekp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const stationCollection = client.db("radio").collection("stations");

    app.get("/stations", async (req, res) => {
      const result = await stationCollection.find().toArray();
      res.send(result);
    });
    app.post("/stations", async (req, res) => {
      const count = await stationCollection.estimatedDocumentCount();
      const body = req.body;
      body.id = count + 1;

      console.log(body);

      const result = await stationCollection.insertOne(body);
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send("Hello World");
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (req, res) => {
  console.log("listening");
});
