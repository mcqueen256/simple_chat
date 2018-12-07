var WebSocketServer = require('websocket').server;
var http = require('http');

"use strict";

process.title = "simple chat node";
var webSocketsServerPort = 1337;

/**
 * Objects
 */
interface Message {
    time: Number;
    text: string;
    author: string;
    color: string;
}

interface Packet {
    type: string;
    data: string;
}

/**
 * Globals
 */
var message_history: Message[] = [ ];
var clients: any[] = [ ];

/**
 * Colours!!
 */
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colors.sort(function(a,b) { return Math.floor(Math.random()*1000); } );

/**
 * WebSocket server
 */
var server = http.createServer(function (request: any, response: any) {
    // Don't need to do anything here. We are writting a socket server.
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date())+ " Server is listening on port " + webSocketsServerPort);
    console.log("    ,-.                    .'\\ _");
    console.log("    ,'   \\                 .'   (_)");
    console.log("   J     '-._ /\         .'     (,_)");
    console.log("  /  _  /   ,'# )_       _\\_     (_)");
    console.log(" /  '_Y'   /_.,'  \     (  _')     \\");
    console.log(" | _ /   ,'\\/  .   |    '.  __)     \\");
    console.log(" |'.Y   / # ) --'  /  _.-'  __)    .'");
    console.log("_._\\,'  ,'__,'      /  _\\    / \\   .'");
    console.log(",'-_ /           _.-' _\\  /   \\.'");
    console.log("'    (_       _.-' _.-'  \\/");
    console.log("      \  _.-' _.-' '-.     ./");
    console.log("       -'  .-'        '-.-'/");
    console.log("       |   \\o     _.-'####/");
    console.log("       |    \\o_.-' \\#####/");
    console.log("       |_.-#\\       \\###/");
    console.log("       ######\\       \\/'");
    console.log("       # #####`-.");
});

let wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request: any) {
    var connection = request.accept(null, request.remoteAddress);
    var index = clients.push(connection) - 1;
    var userName = "";
    var userColor = "";
    
    console.log((new Date()) + " New connection accepted.");

    // send back chat history
    if (message_history.length > 0) {
        connection.sendUTF(
            JSON.stringify({
                type: 'history',
                data: history
            })
        );
    }

    // incomming message
    connection.on('message', function (message: any) {
        if (message.type === 'utf8') {
            if (userName == "") {
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
                message_history.push(obj);
                message_history = message_history.slice(-100);

                var json = JSON.stringify({ type: 'message', data: obj});
                for (let i = 0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    connection.on('close', function (connection: any) {
        // close the connection
        if (userName != "" && userColor != "") {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });
});