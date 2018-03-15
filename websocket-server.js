#!/usr/bin/env node
/*
 *  Preparation :
 *  sudo npm install -g websocket
 *
 * */

// CONFIGURATION
var WEBSOCKET_PORT = 1337;
var DELAY = 3000;
//--------

var WebSocketServer = require('websocket').server;

// HTTP serve is required for websocket
var http = require('http');
var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end(); 
});
var ReadableStream = Object.getPrototypeOf(process.stdin);

function log(message)
{
    var text = JSON.stringify(message);
    console.log("log: " + text);
}

server.listen( WEBSOCKET_PORT , function() {
    log((new Date()) + " Server is listening on port " + WEBSOCKET_PORT);
});

/** create the server : https://www.npmjs.com/package/nodejs-websocket **/
wsServer = new WebSocketServer({
    httpServer: server
});


function sendEvent(connection, nb)
{
    // log("sendEvent");
    // if (null == text) {
        // text = "" + new Date();
    // }
    connection.send(JSON.stringify({speed: nb, unit:'kmph'}));
    // log(text);
}

function start(connection)
{
    log("start");
    // var id = setInterval( function() { sendEvent(connection); } , DELAY);
    //TODO: clearInterval(id);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(data) {
        log(data);
        sendEvent(connection, data);
    });

}

log(process.argv);

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    log("on: request");
    // This is the most important callback for us, we'll handle
    // all messages from users here.

    connection.on('message', function(message) {
        log("on: message");
        start(connection);
        // connection.sendUTF();
        log(message);
    });

    connection.on('close', function(connection) {
        log("on: close");
        // close user connection
    });
});

log("finishing");

