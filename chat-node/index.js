const express = require("express");
const WebSocket = require("ws");

const app = express();
const port = process.env.PORT || 3000;

// برای تست ساده: یک صفحه HTML هم سرو می‌کنه
app.get("/", (req, res) => {
  res.send("Node server is running");
});

// WebSocket Server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    // Broadcast به همه کلاینت‌ها
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});
