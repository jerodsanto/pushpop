var token = localStorage["token"];
var socket = io.connect(localStorage["server"]);

socket.on("connect", function() {
  socket.emit("ohai", token);
  socket.emit("pop", token);
});

socket.on("reconnect", function() {
  socket.emit("pop", token);
});

socket.on("push", function(url) {
  var toOpen = decodeURIComponent(url);
  chrome.windows.getAll(function(windows) {
    if (windows.length) {
      // pop a new tab
      chrome.tabs.create({url: toOpen}, function(created) {
        stylePoppedPage(created.id);
      });
    } else {
      // pop a new window
      chrome.windows.create({url: toOpen}, function(created) {
        stylePoppedPage(created.tabs[0].id);
      });
    }
  });
});

function stylePoppedPage(tabId) {
  chrome.tabs.insertCSS(tabId, {file: "ribbon.css"});
  chrome.tabs.executeScript(tabId, {file: "ribbon.js"});
}
