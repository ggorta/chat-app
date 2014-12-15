var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({port:3000});
var clients = [];

server.on("connection", function(ws){
  clients.push(ws);
  console.log("client connected");
  ws.on("close", function(){
    var peeps = clients.indexOf(ws);
    clients.splice(peeps,1);
    console.log("client disconnected");
  });
  ws.on("message", function(msg){
    console.log(msg);
    clients.forEach(function(ping){
      if(ping !== ws) {
        var hash = JSON.parse(msg);
        console.log(hash.name + ": " + hash.words);
        ping.send(msg);
      }
    });
  });

});
