![](https://github.com/sewilee/Ooze_Awakening/blob/master/assets/readMe/Slime_title.svg)

### Introduction | [Live](https://sewilee.github.io/Ooze_Awakening/)
The Legend of Slime is an adventure game.

Ooze the Slime, born as one of the lowest ranked monsters in the Forgotten Forest, ventures out of the village for the first time. It's one and only dream? To become a hero.

![](assets/readMe/slime-clip.gif)

### Technologies
* JavaScript
* HTML Canvas
* CSS
* Adobe Photoshop
* Adobe Illustrator

### Features
* Scrolling Tilemaps
* Collison Detection
    * Player vs Static Objects
    * Monster vs Player
    * Player vs Items
    * Player's attack vs Monsters
    ```    
    getMissileCollision(x, y, offset, dy){
        let value = false;
        this.missiles.forEach((bullet, idx) => {
            const { subWidth, subHeight } = bullet.renderables[0];
            const bulletPos = new Box(bullet.position[0] + 16, bullet.position[1], subHeight, 32);
            let dh = 128 - dy;
            let result = bulletPos.hit(x, y, offset, 64, dh);
            if(result === true){
                value = bullet; 
                let missileIndex = this.objs.indexOf(bullet);
                this.objs.splice(missileIndex, 1);
                this.missiles.splice(idx, 1);
            }
        });
        return value;
    }
    ```
* Player and Monster Encounter
    * Hero
        * move
        * attack
    * Monster
        * move
        * attack
        * homing feature
        ```
        checkHeroPosition(){
            let villian = {x: this.position[0] + 32, y: this.position[1] + 32, r:64};
            let hero = {x: this.heroPos[0], y: this.heroPos[1], w: 64, h: 64};

            let distX = Math.abs(villian.x - hero.x - hero.w / 2);
            let distY = Math.abs(villian.y - hero.y - hero.h / 2);

            if (distX > (hero.w / 2 + villian.r + 150)){return this.following = false;}
            if (distY > (hero.h / 2 + villian.r + 150)){return this.following = false;}

            if (distX > hero.w / 2) { return this.following = true; }
            if (distY > hero.h / 2) { return this.following = true; }
        }
        ```
* Custom Artwork and Animations

![](assets/images/items.png)

![](assets/images/slime-art.png)

![](assets/images/monster-hp_03.png)

* Health Count

![](assets/images/hearts.png)
```
updateHealth(hp){
    this.currentHealth += hp;
    switch(this.currentHealth){
        case 0:
            this.gameOver = true;
        default: 
            return fadeOutText(`${hp} HP`);
    }
}
```

### Development Timeline
Day 1: 
- learn canvas mapping, animation, scrolling, sprites
- project skeleton & wireframe
    
Day 2: 
- learn player interaction, collision and map scrolling

Day 3: 
- learn and separate components to classes
- animate default hero sprite, map sprite

Day 4: 
- add collisions and map scrolling feature
- add css to front page

Day 5: 
- add hero and villian abilites feature

Day 6: 
- draw custom sprites and implement

Day 7: 
- add health counter
