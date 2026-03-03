const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const expressWs = require('express-ws')(app);

app.use(cors());

/////   GET METHODS    /////

app.get("/", (req, res) => {
  res.send("This endpoint serves 'index.html'");
});

app.get("/web/ping", (req, res) => {
  res.send("pong");
});

app.get("/web/nodes", (req, res) => {
  const nodeText = `[
  {
    "id": 0,
    "name": "Viewing Node",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 97.12 }
    ]
  },
  {
    "id": 1,
    "name": "Front Gate",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 97.12 },
      { "type": "door", "value": "Open" }
    ]
  },
  {
    "id": 2,
    "name": "Back Gate",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 87.12 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 3,
    "name": "Barn Door 1",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 39.95 },
      { "type": "door", "value": "Open" }
    ]
  },{
    "id": 4,
    "name": "Barn Door 2",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 100.00 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 5,
    "name": "Cave Entrance",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 60.01 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 6,
    "name": "Secret Door",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 33.95 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 7,
    "name": "Bat Cave",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 53.95 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 8,
    "name": "Trapdoor",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 30.95 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 9,
    "name": "Reliquary Tower",
    "type": "sensor",
    "status": "Online",
    "sensors": [
      { "type": "battery", "value": 80.95 },
      { "type": "door", "value": "Open" }
    ]
  }
]`;

  console.log(`Sending: \n ${nodeText}`);

  nodeJSON = JSON.parse(nodeText);

  res.json(nodeJSON);
});

app.get("/web/alerts", (req, res) => {
  const alertText = `[
  {
    "id": 1,
    "name": "Front Gate",
    "time": 154200,
    "reasons": ["Door Opened", "Low Battery"]
  },
  {
    "id": 3,
    "name": "Barn Door 1",
    "time": 154500,
    "reasons": ["Door Opened", "Low Battery"]
  },
  {
    "id": 9,
    "name": "Reliquary Tower",
    "time": 154800,
    "reasons": ["Door Opened", "Low Battery"]
  }
]`;

  const alertJSON = JSON.parse(alertText);

  res.json(alertJSON);
  console.log(`Sent alert: \n ${alertText}`);
});

app.get("/web/node", (req, res) => {
  if (!req.query.id) {
    res.send("No specified nodeid", 400);
    return;
  }

  if (req.query.id == "node003") {
    res.send("node003 not found", 404);
    return;
  }

  const status = Math.random() < 0.2 ? "offline" : "online";

  const nodeText = `{
    "id": "${req.query.id}",
    "status": "${status}"
  }`;

  console.log(`Sending: \n ${nodeText}`);

  const nodeJSON = JSON.parse(nodeText);

  res.json(nodeJSON, 200);
});

/////   POST METHODS    /////
// none yet

/////   PUT METHODS    /////
// none yet

/////   DELETE METHODS    /////
// none yet

/////    WEBSOCKETS    /////
app.ws('/ws/echo', function(ws, req) {
  ws.on('open', function(msg) {
    ws.send("Connection Established");
  });
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});

/////   START SERVICE    /////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
