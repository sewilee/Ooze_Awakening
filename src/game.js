import Engine from './engine.js';
import Player from './player';
import GameMap from './map';
import Camera from './camera.js';
import { createMonsters } from './create_monsters';

const mapJson = require('../assets/map/level01_50x50.json');

class Game {
    constructor() {
        this.run();
    }

    run() {
        let engine = new Engine();
        let camera = new Camera([document.getElementById("canvas").width, document.getElementById("canvas").height], [0, 0]);

        // engine.phyDebug = true;
        let map = new GameMap(mapJson, "assets/map/level01_tileset.png", camera);
        engine.addObject(map);
        engine.addColliders(map.getColliders());
        engine.safeZone = map.safeZone;
        engine.offset = camera.offset;

        let hero = new Player(12 * 64, 3 * 64, engine, camera.offset);
        engine.addObject(hero);
        engine.addColliders(hero);

        createMonsters(engine, "#01", 3, 16, 25, 4, 7, camera.offset, hero);
        createMonsters(engine, "#02", 2, 26, 30, 4, 8, camera.offset, hero);
        createMonsters(engine, "#03", 2, 31, 35, 6, 8, camera.offset, hero);
        createMonsters(engine, "#04", 4, 36, 41, 7, 16, camera.offset, hero);
        createMonsters(engine, "#05", 1, 8, 15, 8, 10, camera.offset, hero);
        createMonsters(engine, "#06", 2, 9, 12, 11, 19, camera.offset, hero);
        createMonsters(engine, "#07", 3, 10, 14, 20, 29, camera.offset, hero);
        createMonsters(engine, "#08", 2, 8, 14, 30, 35, camera.offset, hero);
        createMonsters(engine, "#09", 1, 11, 14, 36, 41, camera.offset, hero);
        createMonsters(engine, "#10", 3, 17, 28, 40, 45, camera.offset, hero);
        createMonsters(engine, "#11", 3, 29, 39, 40, 44, camera.offset, hero);
        createMonsters(engine, "#12", 3, 35, 39, 26, 39, camera.offset, hero);
        createMonsters(engine, "#13", 1, 27, 32, 32, 34, camera.offset, hero);

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
            if (engine.input.isKeyDown("ArrowRight")) {
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
                !engine.input.isKeyDown("ArrowRight")) {
                hero.facing = hero.lastFace;
            }
            camera.update(hero.position[0], hero.position[1]);
        };
    }
}

export default Game;