var token = localStorage["token"];
var socket = io.connect(localStorage["server"]);
socket.emit("ohai", token);
socket.on("push", function(url) {
  chrome.tabs.create({url: decodeURIComponent(url)});
  // console.log(decodeURIComponent(url));
});
socket.emit("pop", token);
