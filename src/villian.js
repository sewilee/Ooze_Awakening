import GameObject from './game_object';
import Renderable from './renderable';
import { rejects } from 'assert';

class Villian extends GameObject{
    constructor(x, y, engine, offset, distance = 200, facing = 1, heroPos) {
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;
        this.distance = distance;
        this.moveX = 0;
        this.moveY = 0;
        this.facing = facing;
        this.heroPos = heroPos;
        this.following = false;
        
        this.renderables = [
            new Renderable("assets/images/mon1_sprite.png", 250, 250, 5, 5, 0, 4, 15, 2),  //still
            new Renderable("assets/images/mon1_sprite.png", 250, 250, 5, 5, 0, 4, 15, 2),  //still
        ]
    }

    translate(x, y){
        super.translate(x, y);
    }

    checkCollision(){
        let collider = this.engine.getCollision(
            this.position[0] + this.moveX + this.offset[0] + this.renderables[0].subWidth / 2,
            this.position[1] + this.moveY + this.offset[1] + this.renderables[0].subHeight - 10,
            this.offset
        )
        if (collider !== false) {
            this.distance = this.moveX;
        }
    }

    checkHeroPosition(){
        let villian = {x: this.position[0] + this.moveX + 32, y: this.position[1] + 32, r:50};
        let hero = {x: this.heroPos[0], y: this.heroPos[1], w: 64, h: 64};

        let distX = Math.abs(villian.x - hero.x - hero.w / 2);
        let distY = Math.abs(villian.y - hero.y - hero.h / 2);

        if (distX > (hero.w / 2 + villian.r + 100)){return this.following = false;}
        if (distY > (hero.h / 2 + villian.r + 100)){return this.following = false;}

        if (distX > hero.w / 2) { return this.following = true; }
        if (distY > hero.h / 2) { return this.following = true; }

    }

    getPosition(){
        let x = this.position[0] + this.moveX;
        let y = this.position[1] + this.moveY;
        return [x, y];
    }

    movement(){
        // debugger
        if(this.following === false){
            if(this.moveX === this.distance || this.moveX === 0){
                switch(this.facing){
                    case 0:
                        this.facing = 1;
                        break;
                    case 1: 
                        this.facing = 0;
                        break; 
                }
            }
    
            if(this.facing === 0){ return this.moveX-- }
            if(this.facing === 1){ return this.moveX++ }
        } 
    }

    followHero(){
        // console.log("surrender your weapons, peasant!")
        // ctx.translate(this.position[0] + dx + this.offset[0], this.position[1] + this.offset[1]);
        const villPos = { x: this.position[0] + this.moveX, y: this.position[1] + this.moveY };
        const heroPos = { x: this.heroPos[0], y: this.heroPos[1] };

        let dx = villPos.x - heroPos.x;
        let dy =  villPos.y - heroPos.y;
        // debugger
        let length = Math.sqrt(dx ** 2 + dy ** 2);
        // debugger
        if (length) {
            this.moveX -= dx / length;
            this.moveY -= dy / length;
        }

        // debugger
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.save();
        
        let dx = this.moveX
        let dy = this.moveY
        
        if(this.following){
            this.checkHeroPosition();
            this.checkCollision();
            this.followHero();
            // debugger
        } else if (!this.following){            
            this.checkHeroPosition();
            this.checkCollision();
            this.movement();
        }
        ctx.translate(this.position[0] + dx + this.offset[0], this.position[1] + dy + this.offset[1]);
        // debugger

        this.renderables[this.facing].draw(ctx);

        ctx.restore();
    }
}

export default Villian;