var wrapper = document.createElement("div");
wrapper.setAttribute("class", "ribbon");
wrapper.innerHTML = '<a href="#" onclick="document.body.removeChild(this.parentElement);">Push Popped!</a>';
document.body.appendChild(wrapper);
