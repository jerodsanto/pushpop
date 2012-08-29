(function() {
  var tokenInput, serverInput, saveButton;

  function init() {
    tokenInput = document.getElementById("token");
    serverInput = document.getElementById("server");
    saveButton = document.getElementById("save");

    var token = localStorage["token"];
    var server = localStorage["server"];

    if (!token) {
      token = b();
      localStorage["token"] = token;
    }

    if (!server) {
      server = "http://pushpop.herokuapp.com";
      localStorage["server"] = server;
    }

    setBookmarklet();

    tokenInput.value = token;
    serverInput.value = server;

    saveButton.onclick = saveOptions;
  }

  function saveOptions() {
    localStorage["token"] = tokenInput.value;
    localStorage["server"] = serverInput.value;
    setBookmarklet();
    reload();
  }

  function setInput(id, value) {
    var el = document.getElementById(id);

    if (el) {
      el.value = value;
    }
  }

  function setBookmarklet() {
    var a = document.getElementById("bookmarklet");
    var b = 'javascript:(function(){' +
      'window.PushPop={token:"' +localStorage["token"] +
      '",server: "'+localStorage["server"]+'"};' +
      'var d=document,s=d.createElement("scr"\+"ipt");' +
      's.setAttribute("src", PushPop.server\+"/bookmarklet.js");' +
      'd.body.appendChild(s);' +
      '})();';
    a.setAttribute("href", b);
  }

  function reload() {
    chrome.extension.getBackgroundPage().location.reload();
  }

  // uuid yoink! https://gist.github.com/982883
  function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}

  document.body.onload = init;
})();
