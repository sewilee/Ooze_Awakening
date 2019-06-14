import GameObject from './game_object';
import Renderable from './renderable';

class Villian extends GameObject{
    constructor(x, y, engine, offset) {
        super();
        this.position = [x, y]
        this.engine = engine;
        this.offset = offset;
        this.move = 0;
        this.facing = 0;

        this.renderables = [
            new Renderable("assets/images/mon1_sprite.png", 250, 250, 5, 5, 0, 4, 15, 2),  //still
            new Renderable("assets/images/mon1_sprite.png", 250, 250, 5, 5, 5, 9, 15, 2),  //still
        ]
    }

    translate(x, y) {
        let collider = this.engine.getCollision(
            x + this.position[0] + this.offset[0] + this.renderables[0].subWidth / 2,
            y + this.position[1] + this.offset[1] + this.renderables[0].subHeight - 10,
            this.offset
        )
        if (collider !== false) {
            x = 0;
            y = 0;
        }
        super.translate(x, y);
    }

    movement(){
        if(this.move === 200){ this.facing = 1; } 
        if(this.move === 0){ this.facing = 0; }

        if(this.facing === 1){ return this.move-- }
        if(this.facing === 0){ return this.move++ }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.save();
        // const { dx, dy } = move();
        let dx = this.move
        // ctx.translate(this.position[0], this.position[1])
        ctx.translate(this.position[0] + dx + this.offset[0], this.position[1] + this.offset[1]);

        this.movement();



        this.renderables[this.facing].draw(ctx);

        ctx.restore();
    }
}

export default Villian;