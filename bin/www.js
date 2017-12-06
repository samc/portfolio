// #!/usr/bin/env node
//
// /**
//  * Module dependencies.
//  */
//
// var app = require('../app');
// var http = require('http');
// var https = require('https');
// var redirctHTTPS = require('redirect-https');
//
// /**
//  * Create HTTPS server.
//  */
//
// // var PROD = false;
// //
// // var lex = require('greenlock').create({
// //     server: PROD ? 'https://acme-v01.api.letsencrypt.org/directory' : 'staging',
// //     configDir: 'certs/etc',
// //     approveDomains: function (opts, certs, cb) {
// //         if (certs) {
// //             // change domain list here
// //             opts.domains = ['samcraig.io'];
// //         } else {
// //             // change default email to accept agreement
// //             opts.email = 'email@samcraig.io';
// //         }
// //         cb(null, {options: opts, certs: certs});
// //     }
// // });
// //
// // var middlewareWrapper = lex.middleware;
// //
// // https.createServer(lex.httpsOptions, middlewareWrapper(app)).listen(433, function(){ console.log("Listening for ACME http-01 challenges"); });
// //
// // /**
// //  * Create HTTP server that acts as middleware proxy to redirect to HTTPS.
// //  */
// //
// // var redirectHttps = require('redirect-https');
// //
// // http.createServer(lex.middleware(redirectHttps())).listen(80, function (){ console.log("Listening for ACME tls-sni-01 challenges and serve app"); });
//

// var app = require('../app');
// var http = require('http');
// var https = require('https');
// var redirectHttps = require('redirect-https');
//
// var LE = require('greenlock');
// var le;
//
//
// // Storage Backend
// var leStore = require('le-store-certbot').create({
//     configDir: '~/acme/etc/renewal'
//     , debug: false
// });
//
//
// // ACME Challenge Handlers
// var leHttpChallenge = require('le-challenge-fs').create({
//     webrootPath: '~/letsencrypt/var/lib/acme-challenge'
//     , debug: false
// });
// var leSniChallenge = require('le-challenge-sni').create({
//      debug: false
// });
//
//
// function leAgree(opts, agreeCb) {
//     // opts = { email, domains, tosUrl }
//     agreeCb(null, opts.tosUrl);
// }
//
// le = LE.create({
//     server: LE.stagingServerUrl                            // or LE.productionServerUrl
//     , store: leStore                                          // handles saving of config, accounts, and certificates
//     , challenges: {
//         'http-01': leHttpChallenge                            // handles /.well-known/acme-challege keys and tokens
//         , 'tls-sni-01': leSniChallenge                          // handles generating a certificate with the correct name
//         , 'tls-sni-02': leSniChallenge
//     }
//     , challengeType: 'http-01'                                // default to this challenge type
//     , agreeToTerms: leAgree                                   // hook to allow user to view and accept LE TOS
// //, sni: require('le-sni-auto').create({})                // handles sni callback
//     , debug: false
//     , log: function (debug) {console.log('> '+debug);} // handles debug outputs
// });
//
//
// // If using express you should use the middleware
// // app.use('/', le.middleware());
// //
// // Otherwise you should see the test file for usage of this:
// // le.challenges['http-01'].get(opts.domain, key, val, done)
//
//
//
// // Check in-memory cache of certificates for the named domain
// le.check({ domains: [ 'samcraig.io', 'www.samcraig.io' ] }).then(function (results) {
//     if (results) {
//         // we already have certificates
//         return;
//     }
//
//
//     // Register Certificate manually
//     le.register({
//         domains: ['samcraig.io', 'www.samcraig.io']                                // CHANGE TO YOUR DOMAIN (list for SANS)
//         , email: 'email@samcraig.io'                                 // CHANGE TO YOUR EMAIL
//         , agreeTos: true                                           // set to tosUrl string (or true) to pre-approve (and skip agreeToTerms)
//         , rsaKeySize: 2048                                        // 2048 or higher
//                               // http-01, tls-sni-01, or dns-01
//     }).then(function (results) {
//
//         console.log('success');
//
//     }, function (err) {
//
//         // Note: you must either use le.middleware() with express,
//         // manually use le.challenges['http-01'].get(opts, domain, key, val, done)
//         // or have a webserver running and responding
//         // to /.well-known/acme-challenge at `webrootPath`
//         console.error('[Error]: node-greenlock/examples/standalone');
//         console.error(err.stack);
//
//     });
//
// });
//
// http.createServer(le.middleware(redirectHttps())).listen(80, function() {
//     console.log("Server Running On http " + 80);
// })
//
// https.createServer(le.httpsOptions, le.middleware(app)).listen(433, function() {
//     console.log("Server Running On https " + 433);
// })
//
// console.log(le.httpsOptions);
//
// /**
//  * Module dependencies.
//  */
//
// var app = require('../app');
// var http = require('http');
// var https = require('https');
// var fs = require('fs');
//
// /**
//  * Create HTTP server.
//  */
//
// var redirectHttps = require('redirect-https');
//
// http.createServer(redirectHttps()).listen(80, function (){ console.log("Listening for ACME tls-sni-01 challenges and serve app"); });
//
// var options = {
//     key: fs.readFileSync('/root/acme/etc/live/samcraig.io/privkey.pem'),
//     cert: fs.readFileSync('/root/acme/etc/live/samcraig.io/cert.pem')
// }
//
// https.createServer(options, app).listen(433, function (){ console.log("Listening for ACME tls-sni-01 challenges and serve app"); });
//
// console.log(fs.readFileSync('/root/acme/etc/live/samcraig.io/privkey.pem'));

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('Portfolio:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


