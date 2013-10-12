// create the iframe
var iframe = document.createElement("iframe");

//iframe.setAttribute("src", "http://www.reddit.com/submit?url=http%3A%2F%2Fturntable.fm
//var currUrl = escape(document.URL);
var currUrl = "http://www.reddit.com/submit?url="+encodeURIComponent(document.URL);
console.log(currUrl);
iframe.setAttribute("src", currUrl);
iframe.style.position= "absolute";
iframe.style.display = "none";
iframe.style.width = "50%";
iframe.style.height = "80%";
iframe.style.top = "10%";
iframe.style.left = "25%";
iframe.style.zIndex = "101";

var backdrop = document.createElement("div");
backdrop.style.backgroundColor = "black";
backdrop.style.zIndex = "100";
backdrop.style.opacity= "0.5";
backdrop.style.display= "none";
backdrop.style.width= "100%";
backdrop.style.height= "100%";
backdrop.style.display= "100%";
backdrop.style.position = "absolute";
backdrop.style.top = "0px";
backdrop.style.left= "0px";

document.body.appendChild(backdrop);
document.body.appendChild(iframe);

function toggleIframe() {
  if(iframe.style.display == "block") {
    iframe.style.display = "none";
    backdrop.style.display = "none";
  }
  else {
    iframe.style.display = "block";
    backdrop.style.display = "block";
  }
}


// bind the question mark to toggle the iframe
$(document).bind('keyup', function(e) {
    if(e.keyCode === 191 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        toggleIframe();
    }
});
