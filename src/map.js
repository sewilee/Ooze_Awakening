import GameObject from "./game_object";
import Renderable from "./renderable";
import Box from "./play_box";

class GameMap extends GameObject{
    constructor(mapJSON, mapImg, camera) {
        super();
        this.scale = 2;
        this.renderable = new Renderable(mapImg, 704, 800, 22, 25, 0, 550, 0, this.scale);
        this.data = mapJSON;
        this.colliders = [];
        this.camera = camera;

        if(this.data){
            this.data.layers.forEach(layer => {
                if(layer.type === "objectgroup"){
                    layer.objects.forEach(obj => {
                        this.colliders.push(
                            new Box(obj.x * this.scale, obj.y * this.scale, obj.height * this.scale, obj.width * this.scale));
                    });
                }
            });
        }
    }

    getColliders(){
        return this.colliders;
    }
    
    draw(ctx){
        const { offset } = this.camera
        this.data.layers.forEach(layer => {
            if(layer.type === "tilelayer"){
                for(let y = 0; y < this.data.height; y++){
                    for(let x = 0; x < this.data.width; x++ ){
                        this.renderable.frame = layer.data[(y * this.data.height) + x] - 1;
                        ctx.save();
                        ctx.translate(
                            offset[0] + this.position[0] + x * this.renderable.subWidth * this.renderable.scale,
                            offset[1] + this.position[1] + y * this.renderable.subHeight * this.renderable.scale
                        );

                        this.renderable.draw(ctx);
                        ctx.restore();
                    }
                }
            }
        
        });
        super.draw(ctx);
    }
}

export default GameMap;