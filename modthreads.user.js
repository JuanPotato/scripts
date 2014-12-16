// ==UserScript==
// @name         Mod threads
// @namespace    awkward_potato
// @version      0.4
// @description  help mod threads while not a mod
// @author       awkward_potato
// @include      https://forums.oneplus.net/threads/*
// @grant        none
// ==/UserScript==
if ($('input[value="Post Reply"]').length > 0
/* || $('input[value="Reply to Conversation"]').length > 0 || $('input[value="Reply to Thread"]').length > 0*/
) {
var frame = document.getElementsByClassName('redactor_textCtrl')[0];
var body = frame.contentWindow.document.getElementsByTagName('body')[0];
var begging = $('<li><a class="button">begging</a></li>');
var likes = $('<li><a class="button">likes</a></li>');
var dupe = $('<li><a class="button">dupe</a></li>');
var dupsearch = $('<li><input id="dupsearch" type="text" placeholder="search dupe"></li>')
$('li.active').before(dupsearch);
$('li.active').before(dupe);
$('li.active').before(begging);
$('li.active').before(likes);
dupe.click(function(){
    var dupurl = document.getElementById("dupsearch").value;
    var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
    $.post('/conversations/insert', {
                            keywords:test,
                            title_only:1,
                            users:,
                            date:,
                            _xfToken:token
                            });
    body.innerHTML = 'Duplicate thread<br>Please search before starting a new thread.<br>'+dupurl+body.innerHTML;
});
begging.click(function(){
body.innerHTML = 'Asking for invites is not allowed<br>Please join a thread where they give out invites.<br>'+body.innerHTML;
});

likes.click(function(){
    body.innerHTML = 'Like farming is not allowed.<br>'+body.innerHTML;
});
}
