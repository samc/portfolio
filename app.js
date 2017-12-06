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


app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

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

    // extract FormData from POST
    //
    //var bodyStr = JSON.stringify(req.body);
    //
    // var buildingKey = false,
    //     totalQ = 0,
    //     finalKey = '',
    //     finalVar = '',
    //     finalObj = {},
    //     re = /\\r\\n\\r\\n\s*(.*?)\\r\\n/
    //
    // for (var i = 0; i < bodyStr.length; i++) {
    //     if (bodyStr[i] === '"') {
    //         totalQ++;
    //         if (totalQ > 3){ // 3 arbitrary quotation marks precede keys
    //             buildingKey = (!buildingKey);
    //             if (!buildingKey) {
    //                 finalKey = finalKey.slice(0, -1);
    //                 console.log(finalKey);
    //             } else if (totalQ > 4){ // delay variable declaration until after first key extraction
    //                 finalVar = re.exec(finalVar);
    //                 finalObj[finalKey] = '' + finalVar[1];
    //                 finalKey = '';
    //                 finalVar = '';
    //             }
    //         }
    //     }
    //     else if (buildingKey) {
    //         finalKey += bodyStr[i];
    //     }
    //     else if (totalQ > 3) finalVar += bodyStr[i];
    // }
    //
    // var name = finalObj.name,
    //     email = finalObj.email,
    //     message = finalObj.message;

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
                res.send('Email sent!');
            }
        });
    } else {
        res.send('Stop that');
    }

});

app.use('/', function (req, res) {
    res.render('index');
});


module.exports = app;
