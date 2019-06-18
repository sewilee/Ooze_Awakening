import GameObject from './game_object';
import Input from './input';
import Box from './play_box';
import Villain from './villain';
import Player from './player';

class Engine{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.phyDebug = false;
        
        this.lastTime = new Date().getTime();
        this.objs = [];
        this.colliders = [];
        this.villains = [];
        this.missiles = [];
        this.hero = null;

        this.input = new Input;

        // this.gameOver = false;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    endGame(){
        const canvas = document.getElementById("canvas-endGame");
        const ctx = canvas.getContext('2d');

        ctx.font = "48pt Patrick Hand SC";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
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
        if(colliders instanceof Villain){
            this.villains.push(colliders)
        } else if (colliders instanceof Player){
            this.hero = colliders;
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

    villainsInTheArea(x, y, offset){
        const villains = [];
        this.villains.forEach(badGuy => {
            const villPos = { x: badGuy.position[0] + 32 + offset[0], y: badGuy.position[1] + 64 + offset[1]};
            const heroPos = { x: x + 32, y: y + 32 };

            let dx = villPos.x - heroPos.x;
            let dy = villPos.y - heroPos.y;

            let length = Math.sqrt(dx ** 2 + dy ** 2);
            
            if(length <= 600){
                villains.push(badGuy);
            }
        });

        return villains
    }

    getVillain(x, y, offset){
        let value = false;
        this.villains.forEach(badGuy => {
            const { subWidth, subHeight } = badGuy.renderables[0];
            // let dx = subWidth / 8;
            let dy = subHeight / 4;
            // const badGuyPos = new Box(badGuy.position[0], badGuy.position[1], subHeight, subWidth);
            const badGuyPos = new Box(badGuy.position[0], badGuy.position[1] + dy, subHeight - dy, subWidth);
            let result = badGuyPos.isInside(x, y, offset);
            if(result === true){
                // console.log("hit");
                value = badGuy;
            }
        });
        return value;
    }

    loop(){
        if(this.gameOver){
            this.endGame();
        } else {
            let time = new Date().getTime();
            let dt = (time - this.lastTime) / 2000;
            
            //do update here
            if(this.update){
                this.update(dt);
            }
            
            this.ctx.fillStyle = "lightgrey";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            //do drawing here
            this.objs.forEach((obj, idx) => {
                if(obj instanceof Villain && obj.health <= 0){
                    this.objs.splice(idx, 1);
                } else {
                    // debugger
                    obj.update(this, dt);
                    obj.draw(this.ctx, this.canvas);
                }
            });
            
            if (this.hero.gameOver === true) {
                this.gameOver = true;
            }
            
            if(this.phyDebug){
                this.colliders.forEach(collider => {
                    collider.draw(this.ctx, this.offset);
                });
            }
    
            this.lastTime = time;
            window.requestAnimationFrame(this.loop.bind(this));
        }
        
    }
}

export default Engine;