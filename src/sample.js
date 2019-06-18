var stage, w, h, loader;
var player;
var npc;
var playerDirection = "RIGHT";
var playerSTATE = "IDLE"; //
var spriteSheetKahoona = "https://farm1.staticflickr.com/772/20801037743_6c4ea2f91b_k.jpg";
var spriteSheetNinja = "https://farm1.staticflickr.com/694/22704795114_e7bb9d1146_k.jpg";

//Holds the display text
var displayTextArray = [];


function init() {
    stage = new createjs.Stage(document.getElementById("testCanvas"));
    w = stage.canvas.width;
    h = stage.canvas.height;


    //load assets
    loader = new createjs.LoadQueue(false);
    loader.on("complete", handleComplete, this);
    loader.crossOrigin = "";
    loader.loadFile({ id: "player", src: spriteSheetKahoona });
    loader.loadFile({ id: "cpu", src: spriteSheetNinja });
}

function handleComplete(evt) {

    // Define a spritesheet. Note that this data was exported by Zoë.
    var spriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": [loader.getResult("player")],
        "frames": {
            "width": 110,
            "regY": 0,
            "height": 104,
            "regX": 55,
            "count": 188
        },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        //Levi is my character's name	
        "animations": {
            "Melee": [124, 145, "Ready"],
            "Damage": [146, 155, "Ready"],
            "Running": [95, 123, "LeviRunCycle"],
            "LeviRunCycle": [100, 123, "LeviRunCycle"],
            "LeviWalk": [0, 24, "LeviWalkCycle"],
            "LeviWalkCycle": [4, 24, "LeviWalkCycle"],
            "Tired": [25, 44],
            "Miss": [166, 187, "Ready"],
            "Dodge": [156, 165, "Ready"],
            "Ready": [45, 94, "Ready"],
            "TakeHit": [45, 57, "Damage"],
            "Parry": [45, 58, "Dodge"]
        }
    });

    player = new createjs.Sprite(spriteSheet, "Ready");
    player.x = 100;
    player.y = 50;

    npc = new createjs.Sprite(spriteSheet, "Ready");
    npc.x = 500;
    npc.y = 50;
    npc.scaleX *= -1;

    // Add Sprite to the stage, and add it as a listener to Ticker to get updates each frame.

    stage.addChild(npc);
    stage.addChild(player);
    //stage.addEventListener("stagemousedown", handleAttack);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

}
//===ENGINE=========================//
function tick(event) {

    switch (xKeyHeld) {
        case "LEFT":
            player.x -= 3;
            break;
        case "RIGHT":
            if (player.x < npc.x - 85)
                player.x += 3;
            break;
    }

    switch (yKeyHeld) {
        case "UP":
            player.y -= 3;
            //kahoona.scaleX += 0.1;
            //kahoona.scaleY += 0.1;
            break;
        case "DOWN":
            player.y += 3;
            //kahoona.scaleX *= 1.01;
            //kahoona.scaleY *= 1.01;
            break;
    }

    //Text animation
    //Add display

    updateText(displayTextArray);
    stage.update(event);
}

//====CONTROLLER=====================//

//document.getElementById("body").onkeydown = handleKeyDown();
//document.onkeyup = handleKeyUp;
document.onkeyup = handleKeyUp.bind(this);
document.onkeydown = handleKeyDown.bind(this);
document.getElementById("testCanvas").onkeydown = handleKeyDown;
//KEYS
var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;

var xKeyHeld = "NONE";
var yKeyHeld = "NONE";

//kahoona is the hero model

function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }

    //Only move when in idle state
    //Attack animation must finish before movement can occur
    switch (e.keyCode) {
        //====SPACE KEY======
        case KEYCODE_SPACE:
            if (player.currentAnimation != "Melee") {
                player.gotoAndPlay("Melee");
                playerSTATE = "Melee";
                xKeyHeld = yKeyHeld = "NONE";

                //hit collision


                var xDistance = Math.abs(player.x - npc.x);
                //if close enough and hit roll
                if (xDistance < 100) {
                    if (determineHit(player1, enemy1)) {
                        npc.gotoAndPlay("TakeHit");
                        var damage = Math.ceil(Math.random() * 6);
                        createText(damage.toString(), "#990000", npc);
                        damageHP(enemy1, damage);
                    } else {
                        player.gotoAndPlay("Miss");
                        npc.gotoAndPlay("Parry");
                        //Creates textd
                        createText("Miss", "#3498db", player);
                    }

                }
            }//END of if != melee
            break;
        //====*SPACE KEY=======

        case KEYCODE_D:
        case KEYCODE_RIGHT:
            runningState("RIGHT");
            break;

        case KEYCODE_A:
        case KEYCODE_LEFT:
            runningState("LEFT");
            break;

        case KEYCODE_W:
        case KEYCODE_UP:
            runningState("UP");
            break;

        case KEYCODE_S:
        case KEYCODE_DOWN:
            runningState("DOWN");
            break;

    }

    // Running state
    function runningState(direction) {
        if (player.currentAnimation != "Melee") {
            if (playerSTATE != "RUN") {
                player.gotoAndPlay("Running");
                playerSTATE = "RUN";
            }

            if (direction == "UP" || direction == "DOWN") {
                yKeyHeld = direction;
            } else {
                //FIX DIRECTION CHANGE
                if (playerDirection != direction)
                    player.scaleX *= -1;
                playerDirection = direction;
                xKeyHeld = direction;
            }
        }
    }


}

function handleKeyUp(e) {
    console.log("keyup");
    if (!e) { //For browser compatability
        var e = window.event;
    }

    switch (e.keyCode) {

        case KEYCODE_D:
        case KEYCODE_RIGHT:
            xKeyHeld = "NONE";
            resetState();
            break;

        case KEYCODE_A:
        case KEYCODE_LEFT:
            xKeyHeld = "NONE";
            resetState();
            break;

        case KEYCODE_W:
        case KEYCODE_UP:
            yKeyHeld = "NONE";
            resetState();
            break;

        case KEYCODE_S:
        case KEYCODE_DOWN:
            yKeyHeld = "NONE";
            resetState();
            break;

    }
    /*
    resets the state of the character
    */
    function resetState() {
        if (xKeyHeld === "NONE" && yKeyHeld === "NONE" && playerSTATE === "RUN") {
            playerSTATE = "IDLE";
            player.gotoAndPlay("Ready");
        }
    }

}

//======BATTLE RPG ENGINE======//
//==============================//
//Stats Initiate
var player1 = {
    name: "Kahoona",
    level: 1,
    str: 5,
    dex: 3,
    int: 2,
    end: 4,
    hp: 1,
    eSprite: player //the sprite
};
var enemy1 = {
    name: "Enemy1",
    level: 1,
    str: 4,
    dex: 3,
    int: 2,
    end: 6,
    hp: 1,
    eSprite: npc //sprite
}

initiateCharacter(player1, "player1_hp", "player1_stats");
initiateCharacter(enemy1, "enemy1_hp", "enemy1_stats");
//Function InitiateCharacter
//Sets up the initial stats screen
function initiateCharacter(character, charHP_id, charStats_id) {
    //Sets up HP and displays
    character.hp = character.end * 3 + character.level * 3;
    document.getElementById(charHP_id).innerHTML = "HP " + character.hp;
    //Sets up rest of stats
    var tempStatString = "<p>STR " + character.str
        + "</p><p>DEX " + character.dex
        + "</p><p>INT " + character.int
        + "</p><p>END " + character.end
        + "</p>";
    document.getElementById(charStats_id).innerHTML = tempStatString;
}



//Handles Damage and Hit Chance
function determineHit(attacker, defender) {
    if (attacker.dex + roll(6, 2) >= defender.dex + roll(6, 2)) {
        //hit 
        return true;
    } else {
        //miss 
        console.log('miss');
        return false;
    }

}

//Simple Roll Function
function roll(maxRoll, noOfDice) {
    var total = 0;
    for (var i = noOfDice; i > 0; i--) {
        var tempRoll = Math.ceil(Math.random() * maxRoll);
        total += tempRoll;
    }
    return total;
}

//=====================
//create Text Function
//TEXT, COLOR, the displayObject the text displays over
function createText(text_string, color_string, target) {
    var text_miss = new createjs.Text(text_string, "48px VT323", color_string);


    //delay before the text appears
    setTimeout(function () {
        stage.addChild(text_miss);
    }, 400); //# of frames when parry happens

    displayTextArray.push(text_miss);


    text_miss.x = target.x - 25;
}

//==TextUpdate==========
//tweens each text from the array and animates and once complete will delete
function updateText(textArray) {
    if (textArray.length > 0) {
        for (var i = 0; i < textArray.length; i++) {
            createjs.Tween.get(textArray[i])
                .wait(400)

                .to({ scaleX: 1.2, scaleY: 1.2 }, 400)
                .to({ alpha: 0, visible: false }, 800)
                .call(handleComplete);
            function handleComplete() {
                textArray.splice(i, 1); //removes the text from the array
            }
        }
    }
}
//=========//

function damageHP(target, damage) {
    if (target.hp - damage < 0) {
        //dead
        target.hp = 0;
        document.getElementById("enemy1_hp").innerHTML = "KOed";
        createjs.Tween.get(npc) //change NPC
            .to({ alpha: 0, visible: false }, 1000)
            .call(handleComplete);
        function handleComplete() {
            stage.removeChild(npc);
        }

    } else {
        target.hp -= damage;
        document.getElementById("enemy1_hp").innerHTML = "HP " + target.hp;
    }
}

