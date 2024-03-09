const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const serverOptions = {
  cert: fs.readFileSync('./certs/cert.pem'),
  key: fs.readFileSync('./certs/key.pem')
};

const server = https.createServer(serverOptions);
const wss = new WebSocket.Server({ server });

console.log("WebSocket Server running on port 3000");

wss.on("connection", ws => {
    console.log("Web Client connected to main websocket server");

    ws.on("message", message => {
        try {
            const data = JSON.parse(message);
            console.log("Received message:", data);
        } catch (e) {
            console.error("Error handling message:", e.message);
        }
    });

    ws.on('close', () => {
        console.log('Web Client disconnected');
    });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});