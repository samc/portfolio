const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const port = 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'dist', 'images', 'favicon.small.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'samsemailbot@gmail.com',
        pass: 'baconthreatqueenfoster'
    },
    tls: {
        rejectUnauthorized: true
    }
});

app.post('/contact', function (req, res) {

    // json response from contact form submission
    const data = req.body;

    // Prevent key tampering from messing with email handler
    if (!(data.name === 'undefined' || data.email === 'undefined' || data.message === 'undefined')) {
        const mailOptions = {
            to: 'samc2198@gmail.com', // receiver address
            subject: 'Portfolio Inquiry', // subject line
            text: '[' + data.email + '] : ' +data.message // plain text body
        };

        // Return 'success' or 'error' message following email attempt
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                res.send('Hmm, something went wrong..');
                return console.log(error);
            } else {
                res.send('Email sent.');
            }
        });
    } else {
        res.send('Stop that');
    }

});

// // Import Webhooks to be processed for First in Line
// let routes = require('./FirstInLine/api/webhooks');
// routes(app);

// Facebook Auth request, necessary to prevent Angular router from intercepting requesting
app.use('/1zqzi0czkodjvp9lpu5f8gc5w8faw9.html', function(req, res, next) {
    res.sendFile(path.join(__dirname, '1zqzi0czkodjvp9lpu5f8gc5w8faw9.html'))
});

// when a user requests /*, send them to the index
// SPA view routing handled by angular-route
app.use('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`portfolio running on port: ${port}`))
