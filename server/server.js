const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

let clients = [];
let facts = [];

app.get("/status", (_, response) => response.json({ clients: clients.length }));

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});

function eventsHandler(request, response) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

app.get("/events", eventsHandler);

function sendEventsToAll(newFact) {
  const data = `data: ${JSON.stringify(newFact)}\n\n`;
  clients.forEach((client) => client.response.write(data));
}

function sendAllUpdatedFactEventsToAll() {
  const data = `data: ${JSON.stringify(facts)}\n\n`;
  clients.forEach((client) => client.response.write(data));
}

async function addFact(request, respsonse) {
  const newFact = request.body;
  facts.push(newFact);
  respsonse.json(newFact);
  return sendAllUpdatedFactEventsToAll();
}

app.post("/fact", addFact);
