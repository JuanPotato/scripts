// ==UserScript==
// @name         pokemon vortex tools
// @version      0.6
// @description  tools, wonderful tools
// @author       awkward_potato
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @match        *.pokemon-vortex.com/*
// @grant        none
// ==/UserScript==

/**********LOGIN SETTING**********/
var autoLogin = true; //auto-login when logged out

var username = "";
var password = "";

/**********ON/OFF SETTINGS**********/
var doBattle        = false; //enable battles same battle over and over again
var forceBattle     = false; //enable being sent to the battle url when at dashboard
var findPokemon     = false; //enable finding pokemon alerts
var findLevels      = false; //enable find specific pokemon levels
var findLevelsAndUp =  true; //enable finding pokemon levels and up
var autoWalkFind    = false; //enable walking+finding without you doing work

/**********FINDING SETTINGS**********/
var pokemonToFind = ["shiny"]; //the pokemon you want to be alerted of
//make sure you get the right spelling
//TIP: You can also use the above setting as
//a general keyword searcher in the pokemon you see
//e.g. "shiny", "dark"

var levelsToFind = ["9"]; //The specific levels you want to be alerted for
//keep this a string array

var levelsAndUpToFind = 30; //level and up to alert about pokemon
//dont make this a string or array

var scanFreq = 100; //time to wait between every time the script checks if you saw what you wanted (in milliseconds)

/**********FIGHTING SETTINGS**********/
var battle = "/battle.php?bid="; 
//change this to your battle url, but make sure you remove everything up to the /battle.php?jglasd=dfjklgdfj
//Even though it does automatically :P

var firstPokemonPrefAtt = 0; // 0 = don't pick
var seconPokemonPrefAtt = 0; // 0 = don't pick
var thirdPokemonPrefAtt = 0; // 0 = don't pick
var fourtPokemonPrefAtt = 0; // 0 = don't pick
var fifthPokemonPrefAtt = 0; // 0 = don't pick
var sixthPokemonPrefAtt = 0; // 0 = don't pick

var firstPokemonName = ""; // These names just need to be unique
var seconPokemonName = ""; // Capitalization is ignored
var thirdPokemonName = ""; // if empty it will be skipped
var fourtPokemonName = ""; // if not found it will be skipped
var fifthPokemonName = ""; // Make sure you spell right :p
var sixthPokemonName = ""; // 
var attackFreq = 700; //time to wait between every click while fighting (in milliseconds)

/**********IGNORE EVERYTHING PAST THIS**********/
var pokeNames = [firstPokemonName, seconPokemonName, thirdPokemonName, fourtPokemonName, fifthPokemonName, sixthPokemonName];
var pokeAtts  = [firstPokemonPrefAtt, seconPokemonPrefAtt, thirdPokemonPrefAtt, fourtPokemonPrefAtt, fifthPokemonPrefAtt, sixthPokemonPrefAtt];
var battleUrl    = ".pokemon-vortex.com/battle.php";
var findUrl      = ".pokemon-vortex.com/map.php";
var loginUrl     = "www.pokemon-vortex.com/login.php";
var dashboardUrl = ".pokemon-vortex.com/dashboard.php";

if(battle.indexOf(".com")>-1){
    battle = battle.split(".com")[1];
}

if (doBattle && window.location.href.indexOf(battleUrl) > -1) {
    function startBattle() {
        for(var d = 0; d < 6; d++)
            if(pokeAtts[d] !== 0 && $("h3:contains('Your')").text().toLowerCase().indexOf(pokeNames[d].toLowerCase()) > -1 && pokeNames[d] !== "")
                $("input#attack"+pokeAtts[d]).click();

        if($("input[value*='Continue']").length)
            $("input[value*='Continue']").submit();
        if($("input[value*='Attack']").length)
            $("input[value*='Attack']").submit();
        if($("a:contains('Rebattle Opponent')").length)
            $("a:contains('Rebattle Opponent')").click();
    }
    if (window.location.href.indexOf(battle) >-1) {
        setInterval(function () {
            startBattle();
        }, attackFreq);
    } else {
        window.location.href = battle;
    }
}else if ((findPokemon || findLevels || findLevelsAndUp) && window.location.href.indexOf(findUrl) > -1) {
    var a;
    var b;
    var finderOn = false;
    var whichMove = 1;

    function fireKey(el, key) {
        //Set key to corresponding code. This one is set to the left arrow key.
        //37 = left, 38 = up, 39 = right, 40 = down;
        if (document.createEventObject) {
            var eventObj = document.createEventObject();
            eventObj.keyCode = key;
            el.fireEvent("onkeydown", eventObj);
        } else if (document.createEvent) {
            var eventObj = document.createEvent("Events");
            eventObj.initEvent("keydown", true, true);
            eventObj.which = key;
            el.dispatchEvent(eventObj);
        }
    }


    function found(thing){
        if($('#pkmnappear').first().html().toLowerCase().indexOf(thing.toLowerCase()) > -1){
            alert("WOAH THERE FRIEND YOU MIGHT NEED TO SLOW DOWN!!!");
            finderOn = false;
            clearInterval(a);
            if(autoWalkFind){
                clearInterval(b);
            }
            return true;
        }else{
            return false;
        }
    }

    function setFinder(){
        finderOn = true;

        if(autoWalkFind){
            b = setInterval(function(){
                switch(whichMove){
                    case 1:
                        fireKey(document,37);
                        whichMove = 2;
                        break;
                    case 2:
                        fireKey(document,38);
                        whichMove = 3;
                        break;
                    case 3:
                        fireKey(document,39);
                        whichMove = 4;
                        break;
                    case 4:
                        fireKey(document,40);
                        whichMove = 1;
                        break;
                }
            },2000);
        }

        a = setInterval(function () {
            if(findPokemon)
                for (var i = 0; i < pokemonToFind.length; i++)
                    found(pokemonToFind[i]);

            if(findLevels)
                for (var i = 0; i < levelsToFind.length; i++)
                    found("Level: " + levelsToFind[i] + " ");

            if(findLevelsAndUp)
                for(var l = levelsAndUpToFind; l<101;l++)
                    if (found("Level: " + l + " "))
                        break;

        }, scanFreq);
    }

    setFinder();
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37: case 38: case 39: case 40: case 87: case 65: case 83: case 68: if(!finderOn)setFinder();
                break;
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
