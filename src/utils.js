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
        ctx.font = "24pt Patrick Hand SC";
        ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        ctx.fillText(text, canvas.width/2, canvas.height/2);

        alpha = alpha - 0.05; // decrease opacity (fade out)
        if (alpha < 0) {
            canvas.width = canvas.width;
            clearInterval(interval);
        }
    }, 10);
};
