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
        this.id = null;

        this.health = 3;
        
        const img_hp03 = "assets/images/monster-hp_03.png";
        const img_hp02 = "assets/images/monster-hp_02.png";
        const img_hp01 = "assets/images/monster-hp_01.png";
        
        this.renderables = [
            new Renderable(img_hp03, 512, 128, 8, 1, 0, 7, 15),
            new Renderable(img_hp01, 512, 128, 8, 1, 0, 7, 15),
            new Renderable(img_hp02, 512, 128, 8, 1, 0, 7, 15),
        ]
    }

    translate(x, y){
        super.translate(x, y);
    }

    updateHealth(hp) {
        this.health += hp;
        // return fadeOutText("DMG");
    }

    checkCollision(){
        let x = this.position[0] + this.offset[0];
        let y = this.position[1] + this.offset[1];
        const { subWidth, subHeight } = this.renderables[0];

        let collider = this.engine.getCollision( x + (subWidth / 2), y + (subHeight / 2), this.offset )

        if(this.engine.missiles.length > 0){
            let dy;
            switch (this.health) {
                case 1:
                    dy = 96;
                    break;
                case 2:
                    dy = 64;
                    break;
                case 3:
                    dy = 32;
                    break;
            }
            let attack = this.engine.getMissileCollision(x, y + dy, this.offset, dy);
            if(attack){
                this.updateHealth(attack.dmg);
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

        if (distX > (hero.w / 2 + villian.r + 150)){return this.following = false;}
        if (distY > (hero.h / 2 + villian.r + 150)){return this.following = false;}

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
        let villPos = {x:0, y:0};
        switch(this.health){
            case 1:
                villPos = { x: this.position[0] + 32, y: this.position[1] + 96 };
                break;
                // debugger
            case 2:
                villPos = { x: this.position[0] + 32, y: this.position[1] + 80 };
                break;
                // debugger
            case 3:
                villPos = { x: this.position[0] + 32, y: this.position[1] + 64 };
                break;
                // debugger
        } 
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
            let distance;
            switch(this.health){
                case 1:
                    distance = 32;
                    break;
                case 2:
                    distance = 48;
                    break;
                case 3:
                    distance = 64;
                    break;
            }

            if(absLength <= distance){
                this.moveX = 0;
                this.moveY = 0;

                let time = new Date().getTime();
                let dt = (time - this.lastTime) / 1000;
                if(dt > 1.25){
                    // console.log("attack")
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

        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.position[0] + this.offset[0], this.position[1] + this.offset[1], 64, 128);
        
        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        
        switch(this.health){
            case 1 || 0:
                this.renderables[1].draw(ctx);
                break;
            case 2:
                this.renderables[2].draw(ctx);
                break;
            case 3:
                this.renderables[0].draw(ctx);
                break;
        }
        // this.renderables[this.facing].draw(ctx);
        ctx.restore();
    }
}

export default Villian;