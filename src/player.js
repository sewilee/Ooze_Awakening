import GameObject from './game_object';
import Renderable from './renderable';
import { fadeOutText } from './utils';
import Missile from './missile';

class Player extends GameObject{
    constructor(x, y, engine, offset){
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;
        this.hearts = 3;
        this.currentHealth = 4 * this.hearts;
        this.prevHealth = this.currentHealth;

        this.villians = [];

        this.gameOver = false;

        this.facing = 0;
        this.lastFace = this.facing;
        this.lastAttack = 0;

        const img = "assets/images/slime-art.png";

        this.renderables = [
            new Renderable(img, 512, 256, 8, 4, 0, 7, 10),  //still
            new Renderable(img, 512, 256, 8, 4, 24, 7, 15),  //up
            new Renderable(img, 512, 256, 8, 4, 0, 7, 15),  //down
            new Renderable(img, 512, 256, 8, 4, 16, 7, 15),   //left 
            new Renderable(img, 512, 256, 8, 4, 8, 7, 15),   //right
        ]
    }

    getHealth(){
        let health = this.currentHealth;
        const hearts = [];

        let numFullHearts = Math.floor(health / 4);
        for(let i = numFullHearts; i > 0; i--){
            hearts.push(0);
        }
        health -= numFullHearts * 4;
        if(health > 0){
            hearts.push(health)
        }
        while(hearts.length < this.hearts){
            hearts.push(4);
        }
        return hearts;
    }

    attack(){
        let time = new Date().getTime();
        let dt = (time - this.lastAttack) / 1000;
        if(dt > .5){
            let x = this.position[0];
            let y = this.position[1];

            const normalAtk = new Missile([x, y], this.offset, this.facing);
            this.engine.addObject(normalAtk);
            this.engine.addColliders(normalAtk);
            this.lastAttack = time;
        }
    }

    // grabVillains(){
    //     let pX = this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2;
    //     let pY = this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10;
    //     let villains = this.engine.villainsInTheArea(pX, pY, this.offset);
    //     if(villains.length > 0){
    //         this.villians = villains;
    //     }
    // }

    updateHealth(hp){
        this.currentHealth += hp;
        switch(this.currentHealth){
            case 0:
                this.gameOver = true;
            default: 
                return fadeOutText(`${hp} HP`);
        }
    }

    translate(x, y){

        let pX = x + this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2;
        let pY = y + this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10;

        let collider = this.engine.getCollision(pX, pY, this.offset);
        let villain = this.engine.getVillain(pX, pY, this.offset);
        let safe = this.engine.inSafeZone(pX, pY, this.offset);
        let item = this.engine.getItemCollision(pX, pY, this.offset);

        if(safe){
            this.gameOver = true;
        }

        if (villain){
            x = 0;
            y = 0;
        }

        if (collider){
            x = 0;
            y = 0;
        }

        if (item){
            const { health } = item.effect;
            let newHealth = this.currentHealth + health;
            if(newHealth >= this.hearts * 4){
                let fullHealth = 4 * this.hearts - this.currentHealth;
                this.updateHealth(fullHealth)
            } else {
                this.updateHealth(health);
            }
        }
        super.translate(x, y);
    }

    draw(ctx){
        super.draw(ctx);
        ctx.save();
        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        
        if(this.currentHealth < this.prevHealth){
            this.renderables[this.facing].draw(ctx);
            this.prevHealth = this.currentHealth;
        } else {
            this.renderables[this.facing].draw(ctx)
        }

        ctx.restore();
    }
}

export default Player;

