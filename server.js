const express = require('express');
const WebSocket = require('ws')

const serverApp = express();
const serverPort = 4000;

serverApp.use(express.json());

let socket;
let dataBuffer = [];

connectToWebSocketServer()

serverApp.post('/collect-data', (req, res) => {
    const { end_user_id, web_page_url } = req.body;
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ end_user_id, web_page_url }));
    } else {
        console.error("WebSocket connecction not open. Reconecting...")
        dataBuffer.push({ end_user_id, web_page_url })
    }
    res.sendStatus(200);
});

serverApp.listen(serverPort, () => {
    console.log(`Server component is running at http://localhost:${serverPort}`);
});

function connectToWebSocketServer() {
    try {
        socket = new WebSocket("ws://localhost:5802");

        socket.onopen = function () {
            while (dataBuffer.length > 0 && socket.readyState === WebSocket.OPEN) {
                const data = dataBuffer.shift();
                socket.send(JSON.stringify(data))
            }
        }

        socket.onerror = function (error) {
            console.error("WebSocket connection error, check if launched admin.js");
        }
        socket.onclose = function (event) {
            console.log("WebSocket connection closed. Reconnecting in 2 seconds...")
            setTimeout(connectToWebSocketServer, 2000);
        }
    } catch (error) {
        console.error(error)
        console.error("Socket creation error")
    }
}