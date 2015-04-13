// ==UserScript==
// @name         No parrots plz :(
// @namespace    awkward_potato
// @version      0.1
// @description  removes all parrot gifs
// @author       awkward_potato
// @match        *://*/*
// @grant        none
// ==/UserScript==
//If you are going to manually add some then you need to know this
// *= means contains. So img[src*=hi] would select any img with "hi" in the src
// = just means equals :p
var block = [
    'img[src*="http://imgs.su/users/25384/"]',
    'img[src="http://imgs.su/users/25384/1428422886.jpg"]',
    'img[src="http://imgs.su/users/25384/1428752821.jpg"]',
    'img[src*="http://uskirill.com/parrot/img/"]', 
    'img[src*="https://forums.oneplus.net/attachments/1428422886-gif."]',
    'img[src*="https://forums.oneplus.net/attachments/anticlockwise-gif."]',
    'img[src*="https://forums.oneplus.net/attachments/clockwise-gif."]',
    'img[src="https://forums.oneplus.net/attachments/c__data_users_defapps_appdata_internetexplorer_temp_saved-images_9-gif.290805/"]',
    'img[src="https://forums.oneplus.net/data/attachments/290/290976-13d2c87d597ba5c56edff9a85dcef8df.jpg"]',
    'img[src*="https://forums.oneplus.net/data/avatars/l/28/28769.jpg"]'
];

for(var i = 0; i < block.length; i++)
    $(block[i]).remove();
