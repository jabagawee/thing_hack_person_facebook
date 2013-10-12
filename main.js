$(document).bind('keyup', function(e) {
    if(e.keyCode === 191 && !($(e.target).is("input") || $(e.target).is("textarea"))) {
        console.log("go");
    }
});
