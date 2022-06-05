const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.e7ekp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized Access" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden Token" });
    }
    req.decoded = decoded;

    next();
  });
}

async function run() {
  try {
    await client.connect();
    const stationCollection = client.db("radio").collection("stations");

    app.get("/homeStations", async (req, res) => {
      const result = await stationCollection.find().toArray();
      res.send(result);
    });
    app.get("/stations", verifyJWT, async (req, res) => {
      const result = await stationCollection.find().toArray();
      res.send(result);
    });
    app.get("/user/:email", async (req, res) => {
      const email = req?.params?.email;
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });

      res.send({ token });
    });
    app.post("/stations", verifyJWT, async (req, res) => {
      const count = await stationCollection.estimatedDocumentCount();
      const body = req.body;
      body.id = count + 1;

      console.log(body);

      const result = await stationCollection.insertOne(body);
      res.send(result);
    });

    app.delete("/stations", verifyJWT, async (req, res) => {
      const query = { _id: ObjectId(req.query._id) };

      const result = await stationCollection.deleteOne(query);

      res.send(result);
    });

    app.put("/stations", verifyJWT, async (req, res) => {
      const count = await stationCollection.estimatedDocumentCount();
      const body = req.body;
      const query = { _id: ObjectId(req.query._id) };
      // body.id = count + 1;
      console.log(query);

      const find = await stationCollection.findOne(query);

      console.log(find);

      const updateDoc = {
        $set: {
          name: req.body.name,
          channel: req.body.channel,
          img: req.body.img,
        },
      };
      const result = await stationCollection.updateOne(query, updateDoc);
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
