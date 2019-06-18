class Box{
    constructor(x, y, h, w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    isInside(x, y, offset, w = 0, h = 0){
        let inX = (x > this.x + offset[0] && x < (this.x + offset[0] + this.w));
        let inY = (y > this.y + offset[1] && y < (this.y + offset[1] + this.h));

        return inX && inY;
    }

    draw(ctx, offset){
        ctx.strokeStyle = "red";
        // ctx.strokeRect(20, 20, 150, 100);
        ctx.strokeRect(this.x + offset[0], this.y + offset[1], this.w, this.h);
    }
}

export default Box;