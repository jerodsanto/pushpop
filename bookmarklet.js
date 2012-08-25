function pp() {
  var token = "02af13f3-3716-4673-91b7-af5c5d5bc53c";
  var server = "http://localhost:4000";
  var d = document;
  var req = new XMLHttpRequest();
  var data = new FormData();
  var overlay = '<div id="pp-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0.875; z-index: 9999;"><h1 id="pp-message" style="font-family: Helvetica, sans-serif; color: white; text-align: center; margin-top: 40px;">Pushing...</h1></div>';
  var container = d.createElement("div");
  container.innerHTML = overlay;
  d.body.appendChild(container);
  data.append("url", encodeURIComponent(d.location.href));
  req.open("POST", server + "/push/" + token, true);
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
      }, 500);
    }
  };
  req.send(data);
};
pp();
void(0);
