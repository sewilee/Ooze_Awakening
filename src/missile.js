import GameObject from './game_object';
import Renderable from './renderable';

class Missile extends GameObject{
    constructor(position, offset, direction, dmg = -1, distance = 32){
        super();
        this.position = position;
        this.offset = offset;
        this.direction = direction;
        // this.move = [0, 0]
        this.dmg = dmg;
        this.distance = distance;

        const img = "assets/images/fireball_0.png";

        this.renderables = [
            new Renderable(img, 512, 512, 8, 8, 48, 7, 15),  //down
            new Renderable(img, 512, 512, 8, 8, 16, 7, 15),  //up
            new Renderable(img, 512, 512, 8, 8, 48, 7, 15),  //down
            new Renderable(img, 512, 512, 8, 8, 0, 7, 15),   //left 
            new Renderable(img, 512, 512, 8, 8, 32, 7, 15),   //right
        ]
    }

    movement(){
        if (this.direction === 0 || this.direction === 2){ this.translate(0, 5) }
        if (this.direction === 1) { this.translate(0, -5) }
        if (this.direction === 3) { this.translate(-5, 0) }
        if (this.direction === 4) { this.translate(5, 0) }

        this.distance -= 5;
    }

    draw(ctx){
        super.draw(ctx);
        ctx.save();
        
        this.movement();

        // ctx.strokeStyle = "blue";
        // ctx.strokeRect(this.position[0] + this.offset[0], this.position[1] + this.offset[1], 64, 64);

        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        this.renderables[this.direction].draw(ctx);


        ctx.restore();
    }
}

export default Missile;  