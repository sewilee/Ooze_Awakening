class Renderable{
    constructor(
        image = "assets/images/blue-slime-png-2.png", 
        sheetWidth = 50, sheetHeight = 50,
        cols = 1, rows = 1, startFrame = 0,
        frameCount = 0, speed = 1, scale = 1){
        
        this.img = new Image();
        this.img.src = image;

        this.frame = startFrame;
        this.startFrame = startFrame;
        this.frameCount = frameCount;

        this.cols = cols;
        this.rows = rows;

        this.sheetWidth = sheetWidth;
        this.sheetHeight = sheetHeight;

        this.subWidth = this.sheetWidth / this.cols;
        this.subHeight = this.sheetHeight / this.rows;
        
        this.speed = speed;
        this.animeTime = new Date().getTime();

        this.scale = scale;
    }

    draw(ctx){
        let t = new Date().getTime();
        if(t > this.animeTime){
            this.frame++;
            this.animeTime = t + 1000 / this.speed;
        }
        if(this.frame > this.startFrame + this.frameCount){
            this.frame = this.startFrame;
        }
        let posX = (this.frame % this.cols) * this.subWidth;
        let posY = Math.floor(this.frame / this.cols) * this.subHeight;
        ctx.drawImage(this.img, posX, posY, this.subWidth, this.subHeight, 0, 0, this.subWidth * this.scale, this.subHeight * this.scale);
    }

}

export default Renderable;