import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
    const welcome = new Welcome(document)
    
    welcome.startScreen();
    welcome.playGame();
});

class Welcome{  
    constructor(document){
        this.document = document;
        this.playing = false;

    }
    
    startScreen(){
        const startCanvas = this.document.getElementById("canvas");
        const startCtx = startCanvas.getContext('2d');
        
        const img = new Image();
        img.src = "assets/images/startGame.png";
        img.onload = function () {
            startCtx.strokeStyle = "black";
            startCtx.lineWidth = 10;
            startCtx.strokeRect(0, 0, startCanvas.width, startCanvas.height);
            startCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
            startCtx.fillRect(0, 0, startCanvas.width, startCanvas.height);
            startCtx.drawImage(img, 0, 0);
        };
    }

    playGame(){
        this.document.addEventListener('keydown', (e) => {
            if(e.code === "Space" && !this.playing){
                this.playing = true;
                return new Game();
            } else {
                e.preventDefault();
            }
        });
    }
}
        
        
        