var TW_BASE = "https://twitter.com";
var RDT_BASE = "http://www.reddit.com";
var popupContainer = document.createElement("div");
var tw_iframe = document.createElement("iframe");
var backbutton = document.createElement("img");
var tw_button= document.createElement("img");
var rdt_button = document.createElement("img");
var isRdt = true;
var backcache;

var currUrl = encodeURIComponent(document.URL);
var redditSearch = "http://www.reddit.com/submit?url="+currUrl;
var twitterSearch = "https://twitter.com/search?q="+currUrl;

var port = chrome.extension.connect({}),
    callbacks = [];

port.onMessage.addListener(function(msg) {
    callbacks[msg.id](msg.text);
    delete callbacks[msg.id];
    });

function doXHR(params, callback) {
  params.id = callbacks.push(callback) - 1;
  port.postMessage(params);
}

function createPanel(HNurl) {
  tw_iframe.src = "about:blank";
  doXHR({'action': 'get', 'url': HNurl}, function(response) {
      var base;
      if (isRdt) {
        base = RDT_BASE;
      } else {
        base = TW_BASE;
      }
      var doc= tw_iframe.contentDocument;
      //response = response.replace(/<head>/, '<head><base target="_blank" href="'+TW_BASE+'"/>');
      response = response.replace(/<head>/, '<head><base href="'+base+'"/>');
      response = response.replace(/target="_parent"/g, '');
      backcache = response;
      doc.open();
      doc.write(response);
      doc.close();
      });
}




console.log(redditSearch);
console.log(twitterSearch);

//createPanel(twitterSearch);
createPanel(redditSearch);

//iframe.setAttribute("src", redditSearch);
//iframe.setAttribute("src", twitterSearch);

popupContainer.style.backgroundColor = "#CCCCCC";
popupContainer.style.position= "fixed";
popupContainer.style.display = "none";
popupContainer.style.width = "80%";
popupContainer.style.height = "80%";
popupContainer.style.top = "50px";
popupContainer.style.left = "10%";
popupContainer.style.zIndex = "2147483647";

//iframe.sandbox = "allow-forms allow-scripts";
tw_iframe.style.position = "absolute";
tw_iframe.style.width = "100%";
tw_iframe.style.height= "95%";
tw_iframe.style.top= "50px";
tw_iframe.style.display = "none";

var backdrop = document.createElement("div");
backdrop.style.backgroundColor = "black";
backdrop.style.zIndex = "2147483646";
backdrop.style.opacity= "0.5";
backdrop.style.display= "none";
backdrop.style.width= "100%";
backdrop.style.height= "100%";
backdrop.style.display= "100%";
backdrop.style.position = "fixed";
backdrop.style.top = "0px";
backdrop.style.left= "0px";

backbutton.src = chrome.extension.getURL("images/back.PNG");
backbutton.style.height = "50px";
backbutton.onclick = function(event) {
  console.log("back");
  if (isRdt) {
    createPanel(redditSearch);
  } else {
    createPanel(twitterSearch);
  }
  
};

tw_button.src = chrome.extension.getURL("images/twitter.PNG");
tw_button.style.height = "50px";
tw_button.style.position = "relative";
tw_button.style.right = "0px";
tw_button.onclick = function(event) {
  console.log("Twitter");
  isRdt = false;
  createPanel(twitterSearch);
  };

rdt_button.src = chrome.extension.getURL("images/reddit.PNG");
rdt_button.style.height = "50px";
rdt_button.style.position = "relative";
rdt_button.style.right = "0px";
rdt_button.onclick = function(event) {
  console.log("Reddit");
  isRdt = true;
  createPanel(redditSearch);
  };

document.body.appendChild(backdrop);
document.body.appendChild(popupContainer);

popupContainer.appendChild(backbutton);
popupContainer.appendChild(rdt_button);
popupContainer.appendChild(tw_button);
popupContainer.appendChild(tw_iframe);

function toggleIframe() {
  if(backdrop.style.display == "block") {
    tw_iframe.style.display = "none";
    backdrop.style.display = "none";
    popupContainer.style.display = "none";
  }
  else {
    tw_iframe.style.display = "block";
    backdrop.style.display = "block";
    popupContainer.style.display = "block";
  }
}

function dismissIframe() {
  tw_iframe.style.display == "none";
  backdrop.style.display == "none";
  popupContainer.style.display == "none";
}


// bind the question mark to toggle the iframe
$(document).bind('keyup', function(e) {
    if(e.keyCode === 192 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        toggleIframe();
    }
    if(e.keyCode === 27 && backdrop.style.display == "block") {
      dismissIframe();
    }
});
