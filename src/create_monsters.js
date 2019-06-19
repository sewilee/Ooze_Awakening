import Villain from "./villain";
import { random } from './utils';


export const createMonsters = (engine, area, numMonsters, minX, maxX, minY, maxY, offset, hero) => {
    const multiplier = 64
    for (let i = 0; i < numMonsters; i++) {
        let ranPosX = random(minX * multiplier, maxX * multiplier);
        let ranPosY = random(minY * multiplier, maxY * multiplier);
        let ranDis = random(128, 448);
        let ranFace = random(0, 1);

        let badGuy = new Villain(ranPosX, ranPosY, engine, offset, ranDis, ranFace, hero);
        badGuy.id = `${area}.0${i}`;
        engine.addObject(badGuy);
        engine.addColliders(badGuy);
    }
};