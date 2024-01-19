// app.js
const express = require('express');
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { error } = require('console');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(cookieParser())

// Serve static files (e.g., images, CSS)
app.use(express.static('public'));

// Define routes
app.get('/', function (req, res) {
    const end_user_id = req.cookies.end_user_id || uuidv4();
    res.cookie('end_user_id', end_user_id, { maxAge: 9000, httpOnly: true });
    sendDataToServer(end_user_id, req.url)
    res.render('home', { end_user_id })
    console.log('Cookies: ', req.cookies, "URL:", req.url)
})

app.get('/about', (req, res) => {
    const end_user_id = req.cookies.end_user_id || uuidv4();
    res.cookie('end_user_id', end_user_id, { maxAge: 9000, httpOnly: true });
    sendDataToServer(end_user_id, req.url)
    res.render('about', { end_user_id });

    console.log('Cookies: ', req.cookies, "URL:", req.url)
});

app.get('/contact', (req, res) => {
    const end_user_id = req.cookies.end_user_id || uuidv4();
    res.cookie('end_user_id', end_user_id, { maxAge: 9000, httpOnly: true });
    sendDataToServer(end_user_id, req.url)
    res.render('contact', { end_user_id });
    console.log('Cookies: ', req.cookies, "URL:", req.url)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function sendDataToServer(end_user_id, web_page_url) {
    axios.post('http://localhost:4000/collect-data', { end_user_id: end_user_id, web_page_url: web_page_url }).catch(error => {
        console.error(error)
    })
    
        
}