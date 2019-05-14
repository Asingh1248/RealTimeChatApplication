var socket = io.connect("http://localhost:8000"); //Create socket and instance of I/O in socket.io where you want to connect

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");


btn.addEventListener("click", function () {

    //function() is callback function called everytime when a Send is clicked 
    socket.emit("chat", {
        message: message.value, //Emitting it to the Server ,JSON notation(Key/Value)
        handle: handle.value
    });
});

message.addEventListener("keypress", function () {
    socket.emit("typing", handle.value);
}); //Last Step :emit only need the username

socket.on("chat", function (data) {

    //Mechanism to receive to data from server---See the actual message on the Server
    feedback.innerHTML = ''; //Guess it????
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' +
        data.message + '</p>'; // print on the screen += previous data should be there

});

socket.on("typing", function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message ....</em> <p>';

});