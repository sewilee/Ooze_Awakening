class Camera{
    constructor(screen = [0, 0]){
        this.screen = screen;
        this.offset = [0, 0];
    }

    update(pX, pY){
        // const { width, height, tilewidth, tileheight } = mapJson;
        
        this.offset[0] = Math.floor((this.screen[0] / 2) - pX);
        this.offset[1] = Math.floor((this.screen[1] / 2) - pY);

        // let tile = [ Math.floor(pX / tilewidth), Math.floor(pY / tileheight)];

        // this.startTile[0] = (tile[0] - 1 - Math.ceil(this.screen[0] / 2)) / tilewidth;
        // this.startTile[1] = (tile[1] - 1 - Math.ceil(this.screen[1] / 2)) / tileheight;
        
        // if(this.startTile[0] < 0){ this.startTile[0] = 0; }
        // if(this.startTile[1] < 0){ this.startTile[1] = 0; }

        // this.endTile[0] = (tile[0] + 1 + Math.ceil(this.screen[0] / 2)) / tilewidth;
        // this.endTile[1] = (tile[1] + 1 + Math.ceil(this.screen[1] / 2)) / tileheight;
        
        // if (this.endTile[0] >= width) { this.endTile[0] = width - 1; }  
        // if (this.endTile[1] >= height) { this.endTile[1] = height - 1; }
    }
}

export default Camera;