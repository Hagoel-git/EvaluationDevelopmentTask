const express = require('express');

const serverApp = express();
const serverPort = 4000;

serverApp.use(express.json()); // Parse JSON requests

const collectedData = [];

serverApp.post('/collect-data', (req, res) => {
    const data = req.body;
    console.log(data)
    collectedData.push(data);
    res.sendStatus(200);
});

serverApp.listen(serverPort, () => {
    console.log(`Server component is running at http://localhost:${serverPort}`);
});