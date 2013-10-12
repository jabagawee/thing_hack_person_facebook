var iframe = document.createElement("iframe");
//var iframe = document.createElement("webview");

var currUrl = encodeURIComponent(document.URL);
var redditSearch = "http://www.reddit.com/submit?url="+currUrl;
var twitterSearch = "https://twitter.com/search?q="+currUrl;
console.log(twitterSearch);
iframe.setAttribute("src", redditSearch);
iframe.style.position= "fixed";
iframe.style.display = "none";
iframe.style.width = "80%";
iframe.style.height = "80%";
iframe.style.top = "10%";
iframe.style.left = "10%";
iframe.style.zIndex = "999";

var backdrop = document.createElement("div");
backdrop.style.backgroundColor = "black";
backdrop.style.zIndex = "998";
backdrop.style.opacity= "0.5";
backdrop.style.display= "none";
backdrop.style.width= "100%";
backdrop.style.height= "100%";
backdrop.style.display= "100%";
backdrop.style.position = "fixed";
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
