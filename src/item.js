import GameObject from './game_object';
import Renderable from './renderable';

class Item extends GameObject{
    constructor(position, offset, effect, id){
        super();
        this.position = position;
        this.offset = offset;
        this.effect = this.itemEffect(effect);
        this.used = false;
        this.id = id;
        const img = "assets/images/items.png";

        this.renderables = [
            new Renderable(img, 320, 64, 5, 1, 0),
            new Renderable(img, 320, 64, 5, 1, 1),
            new Renderable(img, 320, 64, 5, 1, 2),
        ];
    }

    itemEffect(effect){
        let effectObject = {};
        let effectSplit = effect.split("/");

        effectObject.name = effectSplit[0];
        effectObject.health = Number(effectSplit[1]);
        this.image = Number(effectSplit[2]);

        return effectObject;
    }


    draw(ctx){
        super.draw(ctx);
        ctx.save();
        
        // this.movement();

        // ctx.strokeStyle = "blue";
        // ctx.strokeRect(this.position[0] + this.offset[0], this.position[1] + this.offset[1], 64, 64);
        
        ctx.translate(this.position[0] + this.offset[0], this.position[1] + this.offset[1]);
        this.renderables[this.image].draw(ctx);


        ctx.restore();
    }
}

export default Item;  