var net = require("net");
var server = net.createServer();
var PORT = process.argv[2];
var ADDRESS = "10.62.0.121";
var SID = 13325208;

server.on("connection", function(socket) {
        var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
        console.log("New Client has connected at %s", remoteAddress);

        socket.on("data", function(d) {
                console.log("Client data: %s", d);

                if(d === "KILL_SERVICE\n"){
                        socket.destroy();
                }
	
		else {
                        socket.write(d+"IP:"+ socket.address().address +"\nPort:"+ PORT + "\nStudentID:"+ SID +"\n");
		}		

        });

        socket.on("close", function() {
                console.log("Connection has been closed from %s", remoteAddress);
                server.close();
        });

        socket.on("error", function(err){
                console.log("Oopsie, we've got an ERROR: %s", err.message);
        });


});

server.on("error", function(err){
        console.log("ERROR: %s", err.message);
});

server.on("close", function(){
        console.log("Server now closed for business");
});

server.listen(PORT, ADDRESS, function() {
        console.log("Server listening to Port %s %j", PORT, server.address());
});

