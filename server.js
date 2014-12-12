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
  clients.forEach(function(client){
    client.send("new person in da house");
  });
  ws.on("message", function(msg){
    console.log(msg);
    clients.forEach(function(ping){
      ping.send(msg);
    });
  });
});
