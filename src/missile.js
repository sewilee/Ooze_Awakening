import GameObject from './game_object';
import Renderable from './renderable';

class Missile extends GameObject{
    constructor(position, offset, direction, dmg = -1, distance = 128){
        super();
        this.position = position;
        this.offset = offset;
        this.direction = direction;
        this.dmg = dmg;
        this.distance = distance;

        const img = "assets/images/slime-attack02.png";

        this.renderables = [
            new Renderable(img, 256, 64, 4, 1, 0),  //down
            new Renderable(img, 256, 64, 4, 1, 1),  //up
            new Renderable(img, 256, 64, 4, 1, 0),  //down
            new Renderable(img, 256, 64, 4, 1, 2),   //left 
            new Renderable(img, 256, 64, 4, 1, 3),   //right
        ]
    }

    movement(){
        if (this.direction === 0 || this.direction === 2){ this.translate(0, 7) }
        if (this.direction === 1) { this.translate(0, -7) }
        if (this.direction === 3) { this.translate(-7, 0) }
        if (this.direction === 4) { this.translate(7, 0) }

        this.distance -= 8;
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