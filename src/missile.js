import GameObject from './game_object';

class Missile extends GameObject{
    constructor(position, offset, direction, dmg = -1, distance = 128){
        super();
        this.position = position;
        this.offset = offset;
        this.direction = direction;
        // this.move = [0, 0]
        this.dmg = dmg;
        this.distance = distance;
    }

    draw(ctx){
        // if()
        if(this.direction === 0 || this.direction === 2){ this.position[1]++ }
        if(this.direction === 1){ this.position[1]-- }
        if(this.direction === 3){ this.position[0]-- }
        if(this.direction === 4){ this.position[0]++ }
        // debugger
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position[0] + this.offset[0] + 32, this.position[1] + this.offset[1] + 32, 10, 10);
    }
}

export default Missile;  