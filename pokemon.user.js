// ==UserScript==
// @name         pokemon vortex tools
// @version      0.4
// @description  tools, wonderful tools
// @author       awkward_potato
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @match        *.pokemon-vortex.com/*
// @grant        none
// ==/UserScript==

/*
the script will run on any url with the battle.php on the pokemon game website
if the url is not the one you wanted to battle it will go to it
you can disable the script using the boolen up there or just normally disable a userscript
it will then press the available button every two seconds (to make sure you get the xp)
It was very simple once I found out why it wasn't looping as I thought it was
it only changes the webpage when you start a new battle (I thought on every click :p)
 */

/**********LOGIN SETTING**********/
var autoLogin = true; //auto-login when logged out

var username = "";
var password = "";

/**********ON/OFF SETTINGS**********/
var doBattle        =  true; //enable battles same battle over and over again
var forceBattle     =  true; //enable being sent to the battle url when at dashboard
var findPokemon     =  true; //enable finding pokemon alerts
var findLevels      = false; //enable find specific pokemon levels
var findLevelsAndUp =  true; //enable finding pokemon levels and up

/**********FINDING SETTINGS**********/
var pokemonToFind = ["turtwig", "squirtle"]; //the pokemon you want to be alerted of
//make sure you get the right spelling
//TIP: You can also use the above setting as
//a general keyword searcher in the pokemon you see
//e.g. "shiny", "dark"

var levelsToFind = ["6","3"]; //The specific levels you want to be alerted for
//keep this a string array

var levelsAndUpToFind = 50; //level and up to alert about pokemon
//dont make this a string or array

var scanFreq = 300; //time to wait between every time the script checks if you saw what you wanted (in milliseconds)

/**********FIGHTING SETTINGS**********/
var battle = "/battle.php?gymleader=Giovanni"; 
//change this to your battle url, but make sure you remove everything up to the /battle.php?jglasd=dfjklgdfj
//Even though it does automatically :P
var attackFreq = 1000; //time to wait between every click while fighting (in milliseconds)

/**********IGNORE EVERYTHING PAST THIS**********/
var battleUrl    = ".pokemon-vortex.com/battle.php";
var findUrl      = ".pokemon-vortex.com/map.php";
var loginUrl     = "www.pokemon-vortex.com/login.php";
var dashboardUrl = ".pokemon-vortex.com/dashboard.php";

if(battle.indexOf(".com")>-1){
    battle = battle.split(".com")[1];
}

if (doBattle && window.location.href.indexOf(battleUrl) > -1) {
    function startBattle() {
        $("input[value*='Attack']").submit();
        $("input[value*='Continue']").submit();
        $("a:contains('Rebattle Opponent')").click();
    }
    if (window.location.href == battle) {
        setInterval(function () {
            startBattle();
        }, attackFreq);
    } else {
        window.location.href = battle;
    }
}else if (findPokemon && window.location.href.indexOf(findUrl) > -1) {
    var a;
    var finderOn = false;
    function found(){
        alert("WOAH THERE FRIEND YOU MIGHT NEED TO SLOW DOWN");
        finderOn = false;
        clearInterval(a);
    }
    function setFinder(){
        finderOn = true;
        a = setInterval(function () {
            if(findPokemon){
                for (var i = 0; i < pokemonToFind.length; i++){
                    console.log("1");
                    if ($('#pkmnappear').first().html().toLowerCase().indexOf(pokemonToFind[i].toLowerCase()) > -1) found();
                }
            }
            if(findLevels){
                console.log("2");
                for (var i = 0; i < levelsToFind.length; i++) {
                    if ($('#pkmnappear').first().html().toLowerCase().indexOf(("Level: " + levelsToFind[i]+" ").toLowerCase()) > -1) found();
                }
            }
            if(findLevelsAndUp){
                console.log("3");
                for(var l = levelsAndUpToFind; l<101;l++){
                    if ($('#pkmnappear').first().html().toLowerCase().indexOf(("Level: " + l+" ").toLowerCase()) > -1){
                        found();
                        console.log("3"+l);
                        break;
                    }
                }
            }
        }, scanFreq);
    }
    setFinder();
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37: if(!finderOn)setFinder();break;
            case 38: if(!finderOn)setFinder();break;
            case 39: if(!finderOn)setFinder();break;
            case 40: if(!finderOn)setFinder();break;
            case 87: if(!finderOn)setFinder();break;
            case 65: if(!finderOn)setFinder();break;
            case 83: if(!finderOn)setFinder();break;
            case 68: if(!finderOn)setFinder();break;
        }
    });
}else if(autoLogin && window.location.href.indexOf(loginUrl) > -1){
    $("#myusername").val(username);
    $("#mypassword").val(password);
    $("input[value*='Log in']").click();
    $("input[value*='Log in']").submit();
}else if(forceBattle && window.location.href.indexOf(dashboardUrl) > -1){
    window.location.href = battle;
}
