var wrapper = document.createElement("div");
wrapper.setAttribute("id", "pp-ribbon");
wrapper.innerHTML = '<a href="#" onclick="document.body.removeChild(this.parentElement); return false;">Push Popped!</a>';
document.body.appendChild(wrapper);
