var TW_BASE = "https://twitter.com";

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
  if ($(".HNembed").length > 0) { return; } // avoid situations where multiple results might be triggered.

  var HNembed = $("<div />").attr({'id' : 'HNembed'});
  var HNsite = $("<iframe />").attr({'id' : 'HNsite', 'src' : 'about: blank'});

  HNembed.append(HNsite);
  //HNembed.hide();

  $('body').append(HNembed);

  doXHR({'action': 'get', 'url': HNurl}, function(response) {
      var doc = HNsite.get(0).contentDocument;
      response = response.replace(/<head>/, '<head><base target="_blank" href="'+TW_BASE+'"/>');
      doc.open();
      doc.write(response);
      doc.close();
      });
}


var popupContainer = document.createElement("div");
var iframe = document.createElement("iframe");
var backbutton = document.createElement("img");

var currUrl = encodeURIComponent(document.URL);
var redditSearch = "http://www.reddit.com/submit?url="+currUrl;
var twitterSearch = "https://twitter.com/search?q="+currUrl;

console.log(redditSearch);
console.log(twitterSearch);

createPanel(twitterSearch);

iframe.setAttribute("src", redditSearch);
//iframe.setAttribute("src", twitterSearch);

popupContainer.style.backgroundColor = "#CCCCCC";
popupContainer.style.position= "fixed";
popupContainer.style.display = "none";
popupContainer.style.width = "80%";
popupContainer.style.height = "80%";
popupContainer.style.top = "10%";
popupContainer.style.left = "10%";
popupContainer.style.zIndex = "2147483647";

//iframe.sandbox = "allow-forms allow-scripts";
iframe.style.position = "absolute";
iframe.style.width = "100%";
iframe.style.height= "95%";
iframe.style.top= "5%";
iframe.style.display = "none";

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
backbutton.style.height = "5%";
backbutton.onclick = function(event) {
  console.log("back");
  iframe.src = redditSearch;
  };

document.body.appendChild(backdrop);
document.body.appendChild(popupContainer);

popupContainer.appendChild(backbutton);
popupContainer.appendChild(iframe);

function toggleIframe() {
  if(iframe.style.display == "block") {
    iframe.style.display = "none";
    backdrop.style.display = "none";
    popupContainer.style.display = "none";
  }
  else {
    iframe.style.display = "block";
    backdrop.style.display = "block";
    popupContainer.style.display = "block";
  }
}

function dismissIframe() {
  iframe.style.display == "none";
  backdrop.style.display == "none";
  popupContainer.style.display == "none";
}


// bind the question mark to toggle the iframe
$(document).bind('keyup', function(e) {
    if(e.keyCode === 192 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        toggleIframe();
    }
    if(e.keyCode === 27 && iframe.style.display == "block") {
      dismissIframe();
    }
});
