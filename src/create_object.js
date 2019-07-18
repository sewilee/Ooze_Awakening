import Villain from "./villain";
import { random } from './utils';
import Item from "./item";


export const createMonsters = (engine, area, numMonsters, minX, maxX, minY, maxY, offset, hero) => {
    const multiplier = 64;
    for (let i = 0; i < numMonsters; i++) {
        let ranPosX = random(minX * multiplier, maxX * multiplier);
        let ranPosY = random(minY * multiplier, maxY * multiplier);
        let ranFace = random(0, 1);
        let ranDis = random(128, 448);

        let badGuy = new Villain(ranPosX, ranPosY, engine, offset, ranDis, ranFace, hero);
        badGuy.id = `${area}.0${i}`;
        engine.addObject(badGuy);
        engine.addColliders(badGuy);
    }
};

export const createHealthPots = (engine, x, y, offset, effect, id) => {
    const multiplier = 64;
    let pos = [x * multiplier, y * multiplier];
    let healthPot = new Item(pos, offset, effect, id);

    engine.addObject(healthPot);
    engine.addColliders(healthPot);
}