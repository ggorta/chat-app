var ws = new WebSocket("ws://genevieve.princesspeach.nyc:3000");
var textbox = document.querySelector("input");
var button = document.querySelector("button");
var body = document.querySelector("body");
var ul = document.createElement("ul");
body.appendChild(ul);

var addText = function (msg) {
  var newLi = document.createElement("li");
  ul.appendChild(newLi);
  newLi.innerHTML = msg;
  var firstli = ul.firstchild;
  ul.insertBefore(newLi, firstli);
};

ws.addEventListener("open", function(evt) {
  addText("connected");
});

ws.addEventListener("message", function(evt) {
  addText(evt.data);
});

button.addEventListener("click", function(){
  ws.send(textbox.value);
});

textbox.addEventListener("keyup", function(txt) {
  var keycode = event.keyCode;
  if (keycode === 13) {
    ws.send(textbox.value);
  }
});
