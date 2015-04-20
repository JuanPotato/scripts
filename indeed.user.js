// ==UserScript==
// @name         Like -> Indeed!
// @version      0.1
// @description  Transform the Like button to "Indeed!" and unlike into "Pshaw!"
// @author       awkward_potato
// @match        *forums.oneplus.net/*
// @grant        none
// ==/UserScript==

$(document).ready(function () {
	function change() {
		$(".LikeLabel:contains(Like)").text("Indeed!");
		$(".LikeLabel:contains(Unlike)").text("Pshaw!");
	}
	$(document).ajaxStop(function () {
		change();
	});
	change();
});
