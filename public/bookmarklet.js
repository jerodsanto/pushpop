(function() {
  if (!window.PushPop) {
    alert("something went wrong!");
    return;
  }

  var d = document;
  var req = new XMLHttpRequest();
  var data = new FormData();
  var overlay = '<div id="pp-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0.875; z-index: 2147483647; padding: 147px 0 0; -webkit-text-size-adjust: none;"><h1 id="pp-message" style="font-size: 40px; font-family: Helvetica, sans-serif; color: #ccc; text-align: center;">Pushing...</h1></div>';
  var container = d.createElement("div");
  container.setAttribute("style", "position: inherit;");
  container.innerHTML = overlay;
  d.body.appendChild(container);
  data.append("url", encodeURIComponent(d.location.href));
  req.open("POST", PushPop.server + "/push/" + PushPop.token, true);
  req.onreadystatechange = function(event) {
    if (req.readyState === 4) {
      var msg = d.getElementById("pp-message");
      if (req.status === 201) {
        msg.innerHTML = "Pushed!";
      } else {
        msg.innerHTML = "Try again later!";
      }
      setTimeout(function() {
        var overlay = d.getElementById("pp-overlay");
        overlay.parentNode.removeChild(overlay);
      }, 1000);
    }
  };
  req.send(data);
})();
