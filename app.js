const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

/////   GET METHODS    /////

app.get("/", (req, res) => {
  res.send("This endpoint serves 'index.html'");
});

app.get("/web/ping", (req, res) => {
  res.send("pong");
});

app.get("/web/nodes", (req, res) => {
  const nodeText = `{
    "nodes": [
      {
        "id": "node001",
        "last_seen": "3456789"
      },
      {
        "id": "node002",
        "last_seen": "3456746"
      },
      {
        "id": "node003",
        "last_seen": "4386952"
      },
      {
        "id": "node004",
        "last_seen": "6538205"
      }
    ]
  }`;

  console.log(`Sending: \n ${nodeText}`);

  nodeJSON = JSON.parse(nodeText);

  res.json(nodeJSON);
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

/////   START SERVICE    /////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
