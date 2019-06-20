import Engine from './engine.js';
import Player from './player';
import GameMap from './map';
import Camera from './camera.js';
import { createMonsters } from './create_monsters';


const mapJson = require('../assets/map/level01_50x50.json');

let engine = new Engine();
let camera = new Camera([document.getElementById("canvas").width, document.getElementById("canvas").height], [0, 0], );

// engine.phyDebug = true;
let map = new GameMap(mapJson, "assets/map/level01_tileset.png", camera);
engine.addObject(map);
engine.addColliders(map.getColliders());
engine.safeZone = map.safeZone;
engine.offset = camera.offset;

let hero = new Player(64, 256, engine, camera.offset);
engine.addObject(hero);
engine.addColliders(hero);

createMonsters(engine, "#01", 4, 11, 19, 4, 9, camera.offset, hero);
createMonsters(engine, "#02", 3, 22, 30, 3, 7, camera.offset, hero);
createMonsters(engine, "#03", 2, 6, 12, 10, 15, camera.offset, hero);
createMonsters(engine, "#04", 2, 9, 15, 23, 26, camera.offset, hero);
    
engine.update = (dt) => {
    if (engine.input.isKeyDown("ArrowUp")) {
        hero.translate(0, -150 * dt);
        hero.lastFace = hero.facing;
        hero.facing = 1;
    }
    if (engine.input.isKeyDown("ArrowDown")) {
        hero.translate(0, 150 * dt);
        hero.lastFace = hero.facing;
        hero.facing = 2;
    }
    if (engine.input.isKeyDown("ArrowLeft")) {
        hero.translate(-150 * dt, 0);
        hero.lastFace = hero.facing;
        hero.facing = 3;
    }
    if (engine.input.isKeyDown("ArrowRight")){
        hero.translate(150 * dt, 0);
        hero.lastFace = hero.facing;
        hero.facing = 4;
    }
    if (engine.input.isKeyDown("Space")) {
        hero.attack();
        engine.input.downkeys.Space = false;
    }
    if (!engine.input.isKeyDown("ArrowUp") &&
        !engine.input.isKeyDown("ArrowDown") &&
        !engine.input.isKeyDown("ArrowLeft") &&
        !engine.input.isKeyDown("ArrowRight")){
        hero.facing = hero.lastFace;
    }
    camera.update(hero.position[0], hero.position[1]);
};
    
