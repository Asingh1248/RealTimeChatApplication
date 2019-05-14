var express = require('express'); //require is directory in node_modules used to extract express dependencies and include in my file

var socket = require('socket.io');

var app = express(); //Holding the Express Instance of my application 

var server = app.listen(8000, function () {
    //Creating the Server and listen at port 8000 and contains callback function called again & again when the call is made to the server by the client
    console.log("The Server is Listening on the Port 8000");
});

//Error 1:D:\MCA-Sem5\Chat>nodemon index
//'nodemon' is not recognized as an internal or external command,
//operable program or batch file.

//Removing:npm uninstall --save-dev nodemon
//dir node_modules

//Installing:>npm install -g nodemon

app.use(express.static('public')); //Including the index.html

var io = socket(server); // Create a Connection to our Server

io.on('connection', function (socket) {

    //event type --connection,callback function(having client socket ----that is when client socket is connected to server socket then this execute)
    console.log(socket.id); //Printing the Client Side Socket
    // Server Side

    socket.on("chat", function (data) {
        //Receive the chat event which have been initialize in chat.js and callback function contains data(JSON)
        io.sockets.emit("chat", data); //server to all the client connected
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });

});