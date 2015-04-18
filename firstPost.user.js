// ==UserScript==
// @name         First Post
// @version      0.2
// @description  Find the first post of a user
// @author       awkward_potato
// @match        *://forums.oneplus.net/members/*
// @grant        none
// ==/UserScript==

$(document).ready(function () {
	$(".userBlurb").append('<li><a rel="nofollow" id="first" data-wr_replaced="true">Find first post by this user</a></li>');
	$("#first").click(function () {
		var dateJoined = $("dl:contains(Joined)").first().children("dd").text().replace(/,/g, '').split(" ");

		switch (dateJoined[0]) {
		case "Jan":
			dateJoined[0] = 1;
			break;
		case "Feb":
			dateJoined[0] = 2;
			break;
		case "Mar":
			dateJoined[0] = 3;
			break;
		case "Apr":
			dateJoined[0] = 4;
			break;
		case "May":
			dateJoined[0] = 5;
			break;
		case "Jun":
			dateJoined[0] = 6;
			break;
		case "Jul":
			dateJoined[0] = 7;
			break;
		case "Aug":
			dateJoined[0] = 8;
			break;
		case "Sep":
			dateJoined[0] = 9;
			break;
		case "Oct":
			dateJoined[0] = 10;
			break;
		case "Nov":
			dateJoined[0] = 11;
			break;
		case "Dec":
			dateJoined[0] = 12;
			break;
		}

		dateJoined[1] = parseInt(dateJoined[1]);
		dateJoined[2] = parseInt(dateJoined[2]);
		console.log(dateJoined);
		var newDate = new Date(dateJoined[2], dateJoined[0] - 1, dateJoined[1]);
		var time = newDate.getTime().toString().substring(0, 10);
		var url = "https://forums.oneplus.net/search/member?user_id=" + document.location.href.match(/\.(\d+)/)[1] + "&before=";
		posted(url, time);

		function getNew() {
			dateJoined[1] += 5;
			if (dateJoined[1] > 28) {
				dateJoined[1] = 0;
				dateJoined[0] += 1;
			}
			if (dateJoined[0] > 12) {
				dateJoined[0] = 0;
				dateJoined[2] += 1;
			}
			newDate = new Date(dateJoined[2], dateJoined[0] - 1, dateJoined[1]);
			time = newDate.getTime().toString().substring(0, 10);
			url = "https://forums.oneplus.net/search/member?user_id=" + document.location.href.match(/\.(\d+)/)[1] + "&before=";
			posted(url, time);
		}

		function posted(url, time) {
			$.get(url + time, function (data) {
				if ($(data).find(":contains(No results found.)").length) {
					getNew();
				} else {
					alert("you can find the post at: " + url + time + "\ntype Ctrl+C to copy this message so you can visit the link.\n or you can click the link again, it is set as the search link");
					$("#first").unbind("click");
					$("#first").attr("href", url + time);
				}
			});
		}
	});
});
