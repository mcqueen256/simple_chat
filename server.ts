"use strict";

process.title = "simple chat node";
var webSocketsServerPort = 1337;

// websocket and http servers
var WebSocketServer = require('websocket').server;
var http = require('http');


/**
 * Globals
 */
var history = [ ];
var clients = [ ];

/**
 * Helpers
 */
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colors.sort(function(a,b) { return Math.random() > 0.5; } );

/**
 * WebSocket server
 */
var server = http.createServer(function (request, response) {
    // Don't need to do anything here. We are writting a socket server.
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date())+ " Server is listening on port " + webSocketsServerPort);
});

let wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.remoteAddress);
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;
    
    console.log((new Date()) + " New connection accepted.");

    // send back chat history
    if (history.length > 0) {
        connection.sendUTF(
            JSON.stringify({
                type: 'history',
                data: history
            })
        );
    }

    // incomming message
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            if (userName === false) {
                userName = message.utf8Data;
                userColor = colors.shift();
                connection.sendUTF(
                    JSON.stringify({
                        type: 'color',
                        data: userColor
                    })
                );
                console.log((new Date()) + " User is known as: " + userName + " with " + userColor + " Color.");
            } else {
                console.log((new Date()) + " Received Message from " + userName + ": " + message.utf8Data);
                var obj = {
                    time: (new Date()).getTime(),
                    text: message.utf8Data,
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);

                var json = JSON.stringify({ type: 'message', data: obj});
                for (let i = 0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    connection.on('close', function (connection) {
        // close the connection
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });
});