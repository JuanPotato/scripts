// ==UserScript==
// @name         Mod threads
// @namespace    awkward_potato
// @version      0.1
// @description  help mod threads while not a mod
// @author       awkward_potato
// @include      https://forums.oneplus.net/threads/*
// @grant        none
// ==/UserScript==
var frame = document.getElementsByClassName('redactor_textCtrl')[0];
var body = frame.contentWindow.document.getElementsByTagName('body')[0];


if ($('input[value="Post Reply"]').length > 0 || $('input[value="Reply to Conversation"]').length > 0 || $('input[value="Reply to Thread"]').length > 0) {
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if($('input[value="Post Reply"]').length > 0) {
            $('form#QuickReply').after('<div id="emojis" style="margin-left: 0px;"></div>');
        }else{
            $('form.Preview').after('<div id="emojis" style="margin: 20px auto 10px auto;"></div>');
        }
    }else{
        if($('input[value="Post Reply"]').length > 0) {
            $('form#QuickReply').after('<div id="emojis" style="margin-left: 140px;"></div>');
        }else{
            $('form.Preview').after('<div id="emojis" style="margin: 10px auto;max-width: 800px;"></div>');
        }
    }
    
        iframe2.contentWindow.document.getElementsByTagName('body')[0].innerHTML=message;
    });
}
