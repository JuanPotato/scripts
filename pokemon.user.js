// ==UserScript==
// @name         pokemon vortex tools
// @version      0.2
// @description  tools, wonderful tools
// @author       awkward_potato
// @match        http://zeta.pokemon-vortex.com/*
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

/**********ON/OFF SETTINGS**********/
var doBattle = false;
var findPokemon = true;
var findLevels = false;
var findLevelsAndUp = false;

/**********FINDING SETTINGS**********/
var pokemonToFind = ["turtwig", "squirtle"];//make sure you get the right spelling
//TIP: You can also use the above setting as a general keyword searcher in the pokemon you see
//e.g. "shiny", "dark"
var levelsToFind = ["6","3"]; //keep this a string array, 
var levelsAndUpToFind = 7; //dont make this a string or array
var scanFreq = 300; //time to wait between every time the script checks if you saw what you wanted (in milliseconds)

/**********FIGHTING SETTINGS**********/
var battle = "http://zeta.pokemon-vortex.com/battle.php?gymleader=Giovanni";
var attackFreq = 1000; //time to wait between every click while fighting (in milliseconds)

/**********IGNORE EVERYTHING PAST THIS**********/
var battleUrl = "zeta.pokemon-vortex.com/battle.php";
var findUrl = "zeta.pokemon-vortex.com/map.php";

if (doBattle) {
    if (window.location.href.indexOf(battleUrl) > -1) {
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
    }
}

if (findPokemon) {
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
    if (window.location.href.indexOf(findUrl) > -1) {
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
    }
}
