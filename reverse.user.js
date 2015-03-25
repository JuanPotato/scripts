// ==UserScript==
// @name         Reverse
// @namespace    https://github.com/JuanPotato/scripts/raw/master/reverse.user.js
// @version      1.1
// @description  reverse posts and pots reversed posts
// @author       Juan Potato (awkward_potato)
// @match        https://forums.oneplus.net/threads/bulc-txet-desrever.284816/*
// @grant        none
// ==/UserScript==
(function ($) {
    $.fn.reverseText = function (params) {
        params = $.extend({
            minlength : 0,
            maxlength : 99999
        }, params);
        this.each(function () {
            var $t = $(this);
            var origText = $t.text(),
                newText = '';
            if (origText.length >= params.minlength && origText.length <= params.maxlength) {
                for (var i = origText.length - 1; i >= 0; i--)
                    newText += origText.substr(i, 1);
                $t.text(newText);
            }
        });
        return this;
    };
})(jQuery);

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function reverse(n) {
    if (n.nodeType == 3) {
        var text = n.data;
        var reversed = "";
        for (var i = text.length - 1; i >= 0; i--)
            reversed += text.charAt(i);
        n.data = reversed;
    } else {
        var kids = n.childNodes;
        var numkids = kids.length;
        for (var i = numkids - 1; i >= 0; i--) {
            reverse(kids[i]);
        }
    }
}
var revButton = $("<li class='active'><a>Reverse|esreveR</a></li>");
revButton.click(function(){
    var posts = document.getElementsByTagName("blockquote");
    for(var i = 0; i<posts.length; i++){
        if(hasClass(posts[i],"messageText"))
            reverse(posts[i]);
    }
});
$(".nav").prepend(revButton);

var revPostButton = $("&nbsp;<button class=\"button\">Reverse</button>");
revPostButton.click(function(e) {
    e.preventDefault();
    $("iframe").first().contents().find("body").reverseText();
});
$('.submitUnit:first input[type=submit]:first').after(revPostButton);
