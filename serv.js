var net = require("net");
var server = net.createServer();
var PORT = 9000;
var ADDRESS = "10.62.0.121";
var SID = 13325208;

server.on("connection", function(socket) {
        var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
        console.log("New Client has connected at %s", remoteAddress);

        socket.on("data", function(d) {
                console.log("Client data: %s", d);
                d = d.toString('ascii');

		if(d === "HELO text\n"){
			socket.write(d+"IP:"+ server.address() +"Port:"+ PORT + "StudentID:"+ SID +"\n");
		}


                if(d === "KILL_SERVICE\n"){
                        server.close();
                }
	
		else {
			console.log("RECEIVED: %s", d);
                        socket.write(d+"IP:"+ socket.address().address +"\nPort:"+ PORT + "\nStudentID:"+ SID +"\n")
		}		


        });

        socket.on("close", function() {
                console.log("Connection has been closed from %s", remoteAddress);
        });

        socket.on("error", function(err){
                console.log("Oopsie, we've got an error there bub, on %s. Shark in the water?: %s", remoteAddress, err.message);
        });


});


server.listen(PORT, ADDRESS, function() {
        console.log("Server listening to Port %s %j", PORT, server.address());
});

