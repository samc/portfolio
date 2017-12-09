var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'dist', 'images', 'favicon.small.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

app.use('*.css', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
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
    var data = req.body;

    // Prevent key tampering from messing with email handler
    if (!(data.name === undefined || data.email === undefined || data.message === undefined)) {
        var mailOptions = {
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

// when a user requests /*, send them to the index
// SPA view routing handled by angular-route
app.use('/', function (req, res) {
    res.render('index');
});

module.exports = app;
