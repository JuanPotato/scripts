// ==UserScript==
// @name         pokemon vortex
// @version      0.1
// @description  Battle a single battle thousands of times, easily
// @author       awkward_potato
// @match        http://zeta.pokemon-vortex.com/battle.php?*
// @grant        none
// ==/UserScript==

function startBattle() {
	$("input[value*='Attack']").submit();
	$("input[value*='Continue']").submit();
	$("a:contains('Rebattle Opponent')").click();
}
/*
the script will run on any url with the battle.php on the pokemon game website
if the url is not the one you wanted to battle it will go to it
you can disable the script using the boolen up there or just normally disable a userscript
it will then press the available button every two seconds (to make sure you get the xp)
It was very simple once I found out why it wasn't looping as I thought it was
it only changes the webpage when you start a new battle (I thought on every click :p)
 */
var battle = "http://zeta.pokemon-vortex.com/battle.php?gymleader=Brock";
if (window.location.href == battle) {
	setInterval(function () {
		startBattle();
	}, 2000);
} else {
	window.location.href = battle;
}
