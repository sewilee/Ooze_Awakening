import GameObject from './game_object';
import Renderable from './renderable';

class Villian extends GameObject{
    constructor(x, y, engine, offset, distance = 200, facing = 1, hero) {
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;
        this.distance = distance;
        this.moveX = 0;
        this.moveY = 0;
        this.facing = facing;
        this.hero = hero
        this.heroPos = hero.position;
        this.following = false;
        this.attackDMG = -1;

        this.health = 3;
        
        const img = "assets/images/monster-art.png";
        
        this.renderables = [
            new Renderable(img, 512, 128, 8, 1, 0, 7, 15),  //still
            new Renderable(img, 512, 128, 8, 1, 0, 7, 15),  //still
        ]
    }

    translate(x, y){
        super.translate(x, y);
    }

    checkCollision(){
        let x = this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2;
        let y = this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10;

        let collider = this.engine.getCollision( x, y, this.offset )
        if(this.engine.missiles.length > 0){
            let attacked = this.engine.getMissile( x, y, this.offset )
            // debugger
            if(attacked){
                console.log("hit")
            }
        }


        if (collider) { this.distance = this.moveX; }
    }

    attack(){
        this.hero.updateHealth(this.attackDMG);
    }

    checkHeroPosition(){
        let villian = {x: this.position[0] + 32, y: this.position[1] + 32, r:64};
        let hero = {x: this.heroPos[0], y: this.heroPos[1], w: 64, h: 64};

        let distX = Math.abs(villian.x - hero.x - hero.w / 2);
        let distY = Math.abs(villian.y - hero.y - hero.h / 2);

        if (distX > (hero.w / 2 + villian.r + 200)){return this.following = false;}
        if (distY > (hero.h / 2 + villian.r + 200)){return this.following = false;}

        if (distX > hero.w / 2) { return this.following = true; }
        if (distY > hero.h / 2) { return this.following = true; }
    }

    getPosition(){
        let x = this.position[0] + this.offset[0];
        let y = this.position[1] + this.offset[1];
        return [x, y];
    }

    movement(){
    
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
    
            if(this.facing === 0){ 
                this.translate(-1, 0);
                this.moveX-- }
            if(this.facing === 1){ 
                this.translate(1, 0);
                this.moveX++ }
        } 
    }

    followHero(){
        const villPos = { x: this.position[0] + 32, y: this.position[1] + 64 };
        const heroPos = { x: this.heroPos[0] + 32, y: this.heroPos[1] + 32 };
        
        let dx = villPos.x - heroPos.x;
        let dy =  villPos.y - heroPos.y;
        
        let length = Math.sqrt(dx ** 2 + dy ** 2);

        this.moveX = 0;
        this.moveY = 0;
        
        if (length) {
            if ((dx / length) < 0) { this.moveX++ }
            if ((dx / length) > 0) { this.moveX-- }
            if ((dy / length) < 0) { this.moveY++ }
            if ((dy / length) > 0) { this.moveY-- }

            let absLength = Math.abs(length);
            if(absLength <= 64){
                this.moveX = 0;
                this.moveY = 0;

                let time = new Date().getTime();
                let dt = (time - this.lastTime) / 1000;
                if(dt > 1.25){
                    console.log("attack")
                    this.attack();
                    this.lastTime = time;
                }
            }
        }
        
        this.translate(this.moveX, this.moveY);
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.save();
        
        if(this.following){
            this.checkHeroPosition();
            this.checkCollision();
            this.followHero();
    
        } else if (!this.following){   
            this.checkHeroPosition();
            this.checkCollision();
            this.movement();
        }

        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        
        this.renderables[this.facing].draw(ctx);

        ctx.restore();
    }
}

export default Villian;