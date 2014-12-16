// ==UserScript==
// @name         Mod threads
// @namespace    awkward_potato
// @version      0.1
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
$('li.active').before(begging);
$('li.active').before(likes);
begging.click(function(){
    body.innerHTML = 'Asking for invites is not allowed<br>Please join a thread where they give out invites.'+body.innerHTML;
});

likes.click(function(){
    body.innerHTML = 'Like farming is not allowed'+body.innerHTML;
});
}
