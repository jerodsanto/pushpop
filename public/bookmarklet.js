(function() {
  if (!window.PushPop) {
    alert("something went wrong!");
    return;
  }

  var pc = screen.width >= 1024;
  var phone = screen.width <= 700;
  var landscape = Math.abs(window.orientation) == 90;
  var maxFontSize = pc ? 48 : 3600;
  var maxFontRatio = phone ? (landscape ? 6 : 8) : (landscape ? 10 : 14);

  var d = document;
  var req = new XMLHttpRequest();
  var data = new FormData();

  var overlay = d.createElement("div");
  overlay.setAttribute("id", "pp-overlay");

  overlay.style.position = "fixed";
  overlay.style.zIndex = 2147483647;
  overlay.style.left = 0;
  overlay.style.top = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.opacity = 0.9;
  overlay.style.webkitTransition = "opacity 0.25s linear";
  overlay.style.webkitTextSizeAdjust = "none";
  overlay.style.textAlign = "center";
  overlay.style.padding = "147px 0px 0px";
  overlay.style.margin = "0px";
  overlay.style.backgroundColor = "rgb(0, 0, 0)";
  overlay.style.color = "rgb(204, 204, 204)";
  overlay.style.fontFamily = "Helvetica, Arial, sans-serif";
  overlay.style.fontWeight = "bold";
  overlay.style.lineHeight = 1;
  overlay.style.letterSpacing = "normal";
  overlay.style.fontVariant = "normal";
  overlay.style.fontStyle = "normal";
  overlay.style.fontSize = Math.min(maxFontSize, Math.floor(window.innerHeight / maxFontRatio)) + "px";
  overlay.style.paddingTop = Math.floor(window.innerHeight / 3) + "px";

  var message = d.createElement("span");
  message.setAttribute("id", "pp-message");
  message.style.webkitTextSizeAdjust = "none";
  message.style.fontFamily = "Helvetica, Arial, sans-serif";
  message.style.fontWeight = "bold";
  message.style.lineHeight = 1;
  message.style.letterSpacing = "normal";
  message.style.fontVariant = "normal";
  message.style.fontStyle = "normal";

  message.innerHTML = "Pushing...";

  overlay.appendChild(message);
  d.body.appendChild(overlay);

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
