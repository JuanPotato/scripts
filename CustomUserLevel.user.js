// ==UserScript==
// @name         Custom user level
// @namespace    awkward_potato
// @version      1.0
// @description  Custom user level
// @author       awkward_potato
// @include      *forums.oneplus.net*
// @name         OnePlus Forum Sidebar
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
if (GM_getValue('level', 'Custom') === 'Custom'){
    GM_setValue('level', prompt('what do you want your custom level to be?'));
}
function name() {
    var level = GM_getValue('level');
    var user = $('a.concealed[title="View your profile"]:first').text();
    var b = document.getElementsByClassName('userTitle');
    for (a = 0; a < b.length; a++) {
        if (b[a].parentNode.innerHTML.indexOf(user) >= 0) {
            b[a].innerHTML = "Level: "+level;
        }
    }
    $('div.muted:contains("Level: ")').html('Level: '+level);
    if (document.URL.indexOf("members") >= 0 && document.URL.indexOf(user) >= 0){
        $('span.userTitle').html('Level: '+level);
    }
}

var customLevelBtn = $('<li><a>Change Custom Level</a></li>');
customLevelBtn.click(function(){
    GM_setValue('level', prompt('what do you want your custom level to be?'));
    name();
});
$('ul.col2:first').append(customLevelBtn);
$('input[type="submit"]:first').click(function(){
    setTimeout(function(){name();}, 3000);
});
name();
