const express = require('express');
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(cookieParser())

app.use(express.static('public'));

app.get('/', handlePageRequest, (req, res) => {
    res.render('home')
})

app.get('/about', handlePageRequest, (req, res) => {
    res.render('about');
});

app.get('/contact', handlePageRequest, (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function sendDataToServer(end_user_id, web_page_url) {
    axios.post('http://localhost:4000/collect-data', { end_user_id, web_page_url }).catch(error => {
        console.error(error)
    })
}
function handlePageRequest(req, res, next) {
    const end_user_id = req.cookies.end_user_id || uuidv4();
    res.cookie('end_user_id', end_user_id, { maxAge: 900000, httpOnly: true });
    sendDataToServer(end_user_id, req.url);

    res.locals.end_user_id = end_user_id;

    next();
}
