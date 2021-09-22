import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

//config
const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const port = process.env.PORT || 9000;

//db connection
const connection_url =
  "mongodb+srv://yuashi:Rj7WxAGoe5jWH3id@cluster0.8fukc.mongodb.net/whatsappDB?retryWrites=true&w=majority";

const pusher = new Pusher({
  appId: "1270368",
  key: "c913232e4695e14b34f9",
  secret: "9d3b489c94cab893b547",
  cluster: "ap2",
  useTLS: true,
});

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("A Change occurred");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

// APIs
app.get("/", (req, res) =>
  res.status(200).send("This is the server for whatsapp clone.")
);

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listening
app.listen(port, () => console.log(`Listening on localhost:${port}`));
