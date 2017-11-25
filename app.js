const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

//app.use('/', index);
//app.use('/users', users);

app.post('/contact', function (req, res) {

    // extract FormData from POST

    const bodyStr = JSON.stringify(req.body);

    var buildingKey = false,
        totalQ = 0,
        finalKey = '',
        finalVar = '',
        finalObj = {},
        re = /\\r\\n\\r\\n\s*(.*?)\\r\\n/

    console.log(bodyStr);

    for (var i = 0; i < bodyStr.length; i++) {
        if (bodyStr[i] === '"') {
            totalQ++;
            if (totalQ > 3){ // 3 arbitrary quotation marks precede keys
                buildingKey = (!buildingKey);
                if (!buildingKey) {
                    finalKey = finalKey.slice(0, -1);
                    console.log(finalKey);
                } else if (totalQ > 4){ // delay variable declaration until after first key extraction
                    finalVar = re.exec(finalVar);
                    finalObj[finalKey] = '' + finalVar[1];
                    finalKey = '';
                    finalVar = '';
                }
            }
        }
        else if (buildingKey) {
            finalKey += bodyStr[i];
        }
        else if (totalQ > 3) finalVar += bodyStr[i];
    }

    const name = finalObj.name,
        email = finalObj.email,
        subject = finalObj.subject,
        message = finalObj.message;

    console.log()

    res.send(name + ' ' + email + ' ' + subject + ' ' + message);
});

app.use('/', function (req, res) {
    res.render('index');
});




module.exports = app;
