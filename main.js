// create the iframe
var iframe = document.createElement("iframe")

//iframe.setAttribute("src", "http://www.reddit.com/submit?url=http%3A%2F%2Fturntable.fm
iframe.setAttribute("src", "http://www.reddit.com/");
iframe.style.display = "block";
iframe.style.width = "50%";
iframe.style.height = "80%";
iframe.style.top = "0px";
iframe.style.zIndex = "999";

document.body.appendChild(iframe);

function toggleIframe() {
  if(iframe.style.visibility == "visible") {
    iframe.style.visibility = "hidden";
  }
  iframe.style.visibility = "visible"
}


// bind the question mark to toggle the iframe
$(document).bind('keyup', function(e) {
    if(e.keyCode === 191 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        toggleIframe();
    }
});
