var ws = new WebSocket("ws://genevieve.princesspeach.nyc:3000");
var textbox1 = document.querySelector("#textbox1");
var textbox2 = document.querySelector("#textbox2");
var button = document.querySelector("button");
var body = document.querySelector("body");
var ul = document.querySelector("ul");
var addText = function(msg) {
  var newli = document.createElement("li");
  newli.innerHTML = msg;
  var firstli = ul.firstChild;
  ul.insertBefore(newli, firstli);
};

ws.addEventListener("message", function(evt) {
  var obj = JSON.parse(evt.data);
  var newmsg = obj.name + ": " + obj.msg;
  addText(newmsg);
});

button.addEventListener("click", function(){
  var text = textbox1.value;
  var name = textbox2.value;
  addText(text);
  var obj = {}
  obj.name = name;
  obj.msg = text;
  var json = JSON.stringify(obj);
  ws.send(json);
});
