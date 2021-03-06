import GameObject from './game_object';
import Input from './input';
import Box from './play_box';
import Villain from './villain';
import Player from './player';
import Missile from './missile';
import { displayHearts } from './utils';
import Item from './item';

class Engine{
    constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.phyDebug = false;
        
        this.lastTime = new Date().getTime();
        this.objs = [];
        this.colliders = [];
        this.villains = {};
        this.missiles = [];
        this.items = {};
        this.hero = null;
        this.safeZone = null;

        this.input = new Input;
        this.gameStart = true;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    startGame(){
        const canvas = document.getElementById("canvas-startGame");
        const ctx = canvas.getContext('2d');
    }

    endGame(){
        const canvas = document.getElementById("canvas-endGame");
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if(this.hero.currentHealth <= 0){
            const img = new Image();
            img.src = "assets/images/gameOver_01.png";
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
        } else {
            const img = new Image();
            img.src = "assets/images/endgame.png";
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
        }

        document.addEventListener('keypress', (e) => {
            if (e.code === "Space" && this.gameOver) {
                document.location.reload();
            }
        });
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
            this.villains[colliders.id] = colliders;
        } else if (colliders instanceof Player){
            this.hero = colliders;
        } else if (colliders instanceof Missile) {
            this.missiles.push(colliders);
        } else if (colliders instanceof Item) {
            this.items[colliders.id] = colliders;
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

    getItemCollision(x, y, offset){
        let value = false;
        Object.values(this.items).forEach(item => {
            const itemBox = new Box(item.position[0], item.position[1], 64, 64);
            let result = itemBox.isInside(x, y, offset);
            if(result === true){
                value = item;
                item.used = true;
            }
        });

        return value;
    }

    inSafeZone(x, y, offset){
        let value = false;
        let result = this.safeZone.isInside(x, y, offset);
        if( result === true){
            value = true;
        }

        return value;
    }

    getMissileCollision(x, y, offset, dy){
        let value = false;
        this.missiles.forEach((bullet, idx) => {
            const { subWidth, subHeight } = bullet.renderables[0];
            const bulletPos = new Box(bullet.position[0] + 16, bullet.position[1], subHeight, 32);
            let dh = 128 - dy;
            let result = bulletPos.hit(x, y, offset, 64, dh);
            if(result === true){
                value = bullet; 
                let missileIndex = this.objs.indexOf(bullet);
                this.objs.splice(missileIndex, 1);
                this.missiles.splice(idx, 1);
            }
        });
        return value;
    }

    getVillain(x, y, offset){
        let value = false;
        Object.values(this.villains).forEach(badGuy => {
            const { subWidth, subHeight } = badGuy.renderables[0];
            let dy;
            switch(badGuy.health){
                case 1:
                    dy = 64;
                    break;
                case 2:
                    dy = 48;
                    break;
                case 3:
                    dy = 32;
                    break;
            }
            const badGuyPos = new Box(badGuy.position[0], badGuy.position[1] + dy, subHeight - dy, subWidth);
            let result = badGuyPos.isInside(x, y, offset);
            if(result === true){
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
            let dt = (time - this.lastTime) / 1000;
            
            //do update here
            if(this.update){
                this.update(dt);
            }
            
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            displayHearts(this.hero.getHealth());

            //do drawing here
            this.objs.forEach((obj, idx) => {
                if(obj instanceof Villain && obj.health <= 0){
                    this.objs.splice(idx, 1);
                    delete this.villains[obj.id];
                } 
                if(obj instanceof Missile && obj.distance <= 0){
                    this.objs.splice(idx, 1);
                    let missileIndex = this.missiles.indexOf(obj);
                    this.missiles.splice(missileIndex, 1);
                }
                if(obj instanceof Item && obj.used === true){
                    this.objs.splice(idx, 1);
                    delete this.items[obj.id];
                }
                else {
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