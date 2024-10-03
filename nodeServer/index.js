// Node server which will handle socket.io connection
const io = require('socket.io')(8000, {cors: {origin: "*"}});
const users = {};

io.on("connection", socket => {
//if any new user join , let other user connect to the server know !
    socket.on("new-user-joined", name => {
        users[socket.id] = name ;
        socket.broadcast.emit("user-joined", name);
    });


    //if someone send a message brodcast it to the other people
    socket.on("send", message => {
        socket.broadcast.emit("receive", {message: message, name: users[socket.id]});
    });

    //if someone left the chat , let other know
    socket.on("disconnect", message => {
        socket.broadcast.emit("left", users[socket.id])
        delete users[socket.id];
    });
});