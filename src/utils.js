export const random = (min, max) => {
    const ranNum =  Math.random() * (max - min) + min;
    return Math.floor(ranNum);
};

export const fadeOutText = (text) => {
    let alpha = 1.0;
    const canvas = document.getElementById("canvas-dmg")
    const ctx = canvas.getContext('2d');

    let interval = setInterval(() => {
        canvas.width = canvas.width;
        ctx.font = "16pt Arial";
        ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        ctx.fillText(text, canvas.width/2, canvas.height/2);

        alpha = alpha - 0.05; // decrease opacity (fade out)
        if (alpha < 0) {
            canvas.width = canvas.width;
            clearInterval(interval);
        }
    }, 10);
};

export const displayHearts = (heartArr) => {
    const canvas = document.getElementById("canvas-dmg")
    const ctx = canvas.getContext('2d');

    const heartIMG = new Image();
    heartIMG.src = "assets/images/hearts.png";
    debugger
    heartArr.forEach( (heart, idx) => {
        ctx.drawImage(heartIMG, heart * 32, 0, 32, 32, idx * 32, 0, 32, 32 )
    });
};
