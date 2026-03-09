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
    "name": "Viewer",
    "type": "viewing",
    "status": "Online",
    "lastSeen": 10000,
    "sensors": [
      { "type": "battery", "value": 97 }
    ]
  },
  {
    "id": 1,
    "name": "Front Gate",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 11000,
    "sensors": [
      { "type": "battery", "value": 97 },
      { "type": "door", "value": "Open" }
    ]
  },
  {
    "id": 2,
    "name": "Back Gate",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 10000,
    "sensors": [
      { "type": "battery", "value": 87 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 3,
    "name": "Barn Door 1",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 10000,
    "sensors": [
      { "type": "battery", "value": 39 },
      { "type": "door", "value": "Open" }
    ]
  },{
    "id": 4,
    "name": "Barn Door 2",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 9000,
    "sensors": [
      { "type": "battery", "value": 100 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 5,
    "name": "Barn Door 3",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 9500,
    "sensors": [
      { "type": "battery", "value": 60 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 6,
    "name": "Front Door",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 12000,
    "sensors": [
      { "type": "battery", "value": 33 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 7,
    "name": "Back Door",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 11000,
    "sensors": [
      { "type": "battery", "value": 53 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 8,
    "name": "Water Door",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 11000,
    "sensors": [
      { "type": "battery", "value": 30 },
      { "type": "door", "value": "Closed" }
    ]
  },{
    "id": 9,
    "name": "Shed Door",
    "type": "sensor",
    "status": "Online",
    "lastSeen": 11000,
    "sensors": [
      { "type": "battery", "value": 80 },
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
    "name": "Shed Door",
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
