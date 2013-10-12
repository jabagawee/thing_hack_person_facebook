// create the iframe
// bind the question mark to toggle the iframe
$(document).bind('keyup', function(e) {
    if(e.keyCode === 191 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        toggleIframe();
    }
});
