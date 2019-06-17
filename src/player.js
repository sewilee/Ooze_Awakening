import GameObject from './game_object';
import Renderable from './renderable';

class Player extends GameObject{
    constructor(x, y, engine, offset){
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;
        this.hearts = 3;
        this.health = 4 * this.hearts;

        this.facing = 0
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

    updateHealth(hp){
        // console.log("-5")
        // this.health += hp;
        // debugger
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
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.position[0] + this.offset[0], this.position[1] + this.offset[1], 64, 64);
        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        this.renderables[this.facing].draw(ctx);

        // debugger
        // this.camera.update(this.position[0], this.position[1]);


        ctx.restore();
    }
}

export default Player;

