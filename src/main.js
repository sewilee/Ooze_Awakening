import Engine from './engine.js';
import Player from './player';
import GameMap from './map';
import Camera from './camera.js';

const mapJson = require('../assets/map/testing.json');

let engine = new Engine();
let camera = new Camera([document.getElementById("canvas").width, document.getElementById("canvas").height], [0, 0], );

// engine.phyDebug = true;
let map = new GameMap(mapJson, "assets/images/p8MLp.png", camera);
engine.addObject(map);
engine.addColliders(map.getColliders());
engine.offset = camera.offset;


let hero = new Player(128, 128, engine, camera.offset);
engine.addObject(hero);

engine.update = (dt) => {
    if (engine.input.isKeyDown("ArrowUp")) {
        hero.translate(0, -150 * dt);
        hero.facing = 1;
    }
    if (engine.input.isKeyDown("ArrowDown")) {
        hero.translate(0, 150 * dt);
        hero.facing = 2;
    }
    if (engine.input.isKeyDown("ArrowLeft")) {
        hero.translate(-150 * dt, 0);
        hero.facing = 3;
    }
    if (engine.input.isKeyDown("ArrowRight")){
        hero.translate(150 * dt, 0);
        hero.facing = 4;
    }
    if (!engine.input.isKeyDown("ArrowUp") &&
        !engine.input.isKeyDown("ArrowDown") &&
        !engine.input.isKeyDown("ArrowLeft") &&
        !engine.input.isKeyDown("ArrowRight")){
        hero.facing = 0;
    }

    camera.update(hero.position[0], hero.position[1]);

};
