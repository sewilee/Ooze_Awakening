import GameObject from './game_object';
import Renderable from './renderable';

class Player extends GameObject{
    constructor(x, y, engine, offset){
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;

        this.facing = 0

        this.renderables = [
            new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 16, 7, 10),  //still
            new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 16, 7, 15),  //up
            new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 16, 7, 15),  //down
            new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 0, 7, 15),   //left 
            new Renderable("assets/images/klz_W4.png", 512, 192, 8, 3, 8, 7, 15),   //right
        ]
    }

    translate(x, y){
        let collider = this.engine.getCollision(
        x + this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2,
        y + this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10,
        this.offset
        )
        if (collider !== false){
            x = 0;
            y = 0;
        }
        super.translate(x, y);
    }

    draw(ctx){
        super.draw(ctx);
        ctx.save();
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);

        // this.camera.update(this.position[0], this.position[1]);

        this.renderables[this.facing].draw(ctx);

        ctx.restore();
    }
}

export default Player;

