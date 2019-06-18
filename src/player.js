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

        this.missiles = [];
        this.villians = [];

        this.gameOver = false;

        this.facing = 0;
        this.lastFace = this.facing;
        const img = "assets/images/slime-art.png";

        this.renderables = [
            // new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 0, 7, 10),  //still
            // new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 0, 7, 15),  //up
            // new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 0, 7, 15),  //down
            // new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 0, 7, 15),   //left 
            // new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 8, 7, 15),   //right
            new Renderable(img, 512, 256, 8, 4, 0, 7, 10),  //still
            new Renderable(img, 512, 256, 8, 4, 24, 7, 15),  //up
            new Renderable(img, 512, 256, 8, 4, 0, 7, 15),  //down
            new Renderable(img, 512, 256, 8, 4, 16, 7, 15),   //left 
            new Renderable(img, 512, 256, 8, 4, 8, 7, 15),   //right
        ]
    }

    grabVillains(){
        let pX = this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2;
        let pY = this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10;
        let villains = this.engine.villainsInTheArea(pX, pY, this.offset);
        if(villains.length > 0){
            this.villians = villains;
        }
    }

    updateHealth(hp){
        this.currentHealth += hp;
        switch(this.currentHealth){
            case 0:
                this.gameOver = true;
            case 1:
                return fadeOutText("RUN AWAY!!")
            case 4:
                return fadeOutText("You are about to die");
            case 8:
                return fadeOutText("Maybe you should run");
            default: 
                return fadeOutText("-1 HP");
        }
    }

    translate(x, y){

        let pX = x + this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2;
        let pY = y + this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10;

        let collider = this.engine.getCollision(pX, pY, this.offset);
        let villain = this.engine.getVillain(pX, pY, this.offset);

        if (villain){
            x = 0;
            y = 0;
            // const dmg = villain.attackDMG;
            // this.updateHealth(dmg);
        }

        if (collider){
            x = 0;
            y = 0;
        }
        super.translate(x, y);
    }

    draw(ctx){
        super.draw(ctx);
        ctx.save();

        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        
        if(this.currentHealth < this.prevHealth){
            this.renderables[this.facing].draw(ctx);
            // let img = new Image(); 
            // img.src = "assets/images/klz_W4.png";
            this.prevHealth = this.currentHealth;
        } else {
            this.renderables[this.facing].draw(ctx)
        }

        this.grabVillains();
        
        // this.camera.update(this.position[0], this.position[1]);


        ctx.restore();
    }
}

export default Player;

