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
    var b = 'javascript:function pp() {'+
      'var token="'+ localStorage["token"] + '",server="' + localStorage["server"] +
      '",d=document,req=new XMLHttpRequest(),data=new FormData(),container=d.createElement("div"),' +
      'overlay="<div id=\'pp-overlay\' style=\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0.875; z-index: 9999;\'><h1 id=\'pp-message\' style=\'font-family: Helvetica, sans-serif; color: white; text-align: center; margin-top: 40px;\'>Pushing...</h1></div>"; ' +
      'container.innerHTML = overlay;' +
      'd.body.appendChild(container);' +
      'data.append("url", encodeURIComponent(d.location.href));' +
      'req.open("POST", server + "/push/" + token, true);' +
      'req.onreadystatechange = function(event) {' +
        'if (req.readyState === 4) {' +
          'var msg = d.getElementById("pp-message");' +
          'if (req.status === 201) {' +
            'msg.innerHTML = "Pushed!";' +
          '} else {'+
            'msg.innerHTML = "Try again later!";' +
          '}' +
          'setTimeout(function() {' +
            'var overlay = d.getElementById("pp-overlay");' +
            'overlay.parentNode.removeChild(overlay);' +
          '}, 500);' +
        '}' +
      '};' +
      'req.send(data);' +
      '};' +
      ' pp(); void(0);';
      a.setAttribute("href", b);
  }

  function reload() {
    chrome.extension.getBackgroundPage().location.reload();
  }

  // uuid yoink! https://gist.github.com/982883
  function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}

  document.body.onload = init;
})();
