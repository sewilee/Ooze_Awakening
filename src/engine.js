import GameObject from './game_object';
import Input from './input';
import Box from './play_box';
import Villian from './villian';

class Engine{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.phyDebug = false;
        
        this.lastTime = new Date().getTime();
        this.objs = [];
        this.colliders = [];
        this.villians = [];

        this.input = new Input;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    addObject(obj){
        if(obj instanceof GameObject){
            this.objs.push(obj);
        } 
        else{
            console.error("Invalid object added")
        }
    }

    addColliders(colliders){
        if(colliders instanceof Villian){
            this.villians.push(colliders)
            // debugger
        } else {
            colliders.forEach(collider => {
                if(collider instanceof Box){
                    this.colliders.push(collider);
                } else {
                    console.error("Collider is not a Box");
                }
            });
        }
    }

    getCollision(x, y, offset){
        let value = false;
        this.colliders.forEach(collider => {
            let result = collider.isInside(x, y, offset);
            if(result === true){
                value = collider;
            }
        });
        return value;
    }

    getVillian(x, y, offset){
        let value = false;
        this.villians.forEach(badGuy => {
            const badGuyPos = new Box(badGuy.position[0] + badGuy.move, badGuy.position[1], 96, 96);
            let result = badGuyPos.isInside(x, y, offset);
            if(result === true){
                // console.log("hit");
                value = badGuyPos;
            }
        });
        return value
    }

    loop(){
        let time = new Date().getTime();
        let dt = (time - this.lastTime) / 1000;

        //do update here
        if(this.update){
            this.update(dt);
        }

        this.ctx.fillStyle = "lightgrey";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //do drawing here
        this.objs.forEach(obj => {
            obj.update(this, dt);
            obj.draw(this.ctx, this.canvas);
        });

        if(this.phyDebug){
            this.colliders.forEach(collider => {
                collider.draw(this.ctx, this.offset);
            });
        }

        this.lastTime = time;
        window.requestAnimationFrame(this.loop.bind(this));
    }
}

export default Engine;