// ==UserScript==
// @name         Dark Theme
// @version      0.1
// @description  Makes the forums a dark theme
// @author       awkward_potato
// @include      *forums.oneplus.net*
// @grant        none
// @license      MIT License; http://opensource.org/licenses/MIT
// ==/UserScript==
var el = 'html,#top,.primaryContent,.discussionListItem .posterAvatar, .discussionListItem .stats,.discussionListItem,.Menu .secondaryContent,.Menu .primaryContent,.Menu .sectionFooter,#content .pageContent,.secondaryContent';
var style='',style2='';
var co = ['.sidebar .section h3,.sidebar .section h3 a'];
style = el + '{background-color:black;color:white !important;}';
style2 = co + '{color:white !important;}';
$('<style type="text/css"></style').text(style+style2).appendTo('head');
$('footer .neversettle-image').removeClass('neversettle-image');
