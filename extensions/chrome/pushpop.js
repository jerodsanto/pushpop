// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage["version"]
if (currVersion != prevVersion) {
  if (typeof prevVersion == "undefined") {
    // install
    chrome.tabs.create({url: "options/index.html"});
  } else {
   // update
  }
  localStorage["version"] = currVersion;
}

var token = localStorage["token"];
var socket = io.connect("http://" + localStorage["server"]);

socket.on("connect", function() {
  socket.emit("ohai", token);
  socket.emit("pop", token);
});

socket.on("reconnect", function() {
  socket.emit("pop", token);
});

socket.on("error", reload);
socket.on("connect_failed", reload);
socket.on("reconnect_failed", reload);

socket.on("push", function(url) {
  var openOptions = {};
  openOptions.url = decodeURIComponent(url);

  chrome.windows.getAll(function(windows) {
    if (windows.length) {
      // pop a new tab
      if (localStorage["windowType"] == "first") {
        openOptions.windowId = windows[0].id;
      }

      chrome.tabs.create(openOptions, function(created) {
        stylePoppedPage(created.id);
      });
    } else {
      // pop a new window
      chrome.windows.create(openOptions, function(created) {
        stylePoppedPage(created.tabs[0].id);
      });
    }
  });
});

function reload() {
  setTimeout(function() { location.reload(); }, 15000); // 15 sec
}

function stylePoppedPage(tabId) {
  chrome.tabs.insertCSS(tabId, {file: "ribbon.css"});
  chrome.tabs.executeScript(tabId, {file: "ribbon.js"});
}

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

