var net = require("net");
var server = net.createServer();
var PORT = 9000;
var SID = 13325208;

server.on("connection", function(socket) {
        var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
        console.log("New Client has connected at %s", remoteAddress);

        socket.on("data", function(d) {
                console.log("Client data: %s", d);
                d = d.toString('ascii');

		if(d === "HELLO text\n"){
			socket.write(d+"IP:"+ server.address() +"Port:"+ PORT + "StudentID:"+ SID +"\n");
		}


                if(d === "KILL_SERVICE\n"){
                        socket.destroy();
                }
	
		else {
			console.log("You sent: %s", d);
		}		


        });

        socket.on("close", function() {
                console.log("Connection has been closed from %s", remoteAddress);
        });

        socket.on("error", function(err){
                console.log("Oopsie, we've got an error there bub, on %s. Shark in the water?: %s", remoteAddress, err.message);
        });


});


server.listen(PORT, function() {
        console.log("Server listening to Port 9000 %j", server.address());
});

