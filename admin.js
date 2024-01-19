const express = require('express');
const WebSocketServer = require('ws')

const adminApp = express();
const adminPort = 5000;

adminApp.set('view engine', 'ejs');
adminApp.use(express.static('public'));

var webSocketServer = new WebSocketServer.Server({ port: 5802 })

webSocketServer.on('connection', function (webSocket) {
    console.log("connection established")

    webSocket.on('message', function (data) {
        const parsedData = JSON.parse(data);
        collectedData.push(parsedData)
    });
})

const collectedData = [];

adminApp.get('/', (req, res) => {
    const groupedData = collectedData.reduce((acc, data) => {
        acc[data.end_user_id] = acc[data.end_user_id] || [];
        acc[data.end_user_id].push(data.web_page_url);
        return acc;
    }, {});
    res.render('admin', { groupedData });
});

adminApp.listen(adminPort, () => {
    console.log(`Admin component is running at http://localhost:${adminPort}`);
});
