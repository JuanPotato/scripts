// ==UserScript==
// @name         Duplicate thread
// @namespace    awkward_potato
// @version      1.0
// @description  quickly search and get a link for dupplicate threads
// @author       awkward_potato
// @include      https://forums.oneplus.net/*
// @grant        none
// ==/UserScript==
if ($('input[value="Post Reply"]').length > 0 || $('input[value="Reply to Conversation"]').length > 0 || $('input[value="Reply to Thread"]').length > 0) {
    var frame = document.getElementsByClassName('redactor_textCtrl')[0];
    var body = frame.contentWindow.document.getElementsByTagName('body')[0];
    var dupe = $('<li><a class="button">duplicate</a></li>');
    var dupsearch = $('<li><input id="dupsearch" type="text" placeholder="search"></li>');
    $('li.active').before(dupsearch);
    $('li.active').before(dupe);
    dupe.click(function(){
        var url = '';
        var dupurl = document.getElementById("dupsearch").value;
        var token = document.getElementsByName('_xfToken')[0].getAttribute('value');
        $.post('https://forums.oneplus.net/search/search', {
            keywords:dupurl,
            title_only:1,
            users:null,
            date:null,
            _xfToken:token
        }, function(data,status,xhr){
            console.log(data);
            console.log(status);
            console.log(xhr);
            url = data.match(/\/search\/\d(.*?)#top/gm)[0];
            body.innerHTML = 'Duplicate thread<br>Please search before starting a new thread.<br>https://forums.oneplus.net'+url+'<br>'+body.innerHTML;
        });
    });
}
