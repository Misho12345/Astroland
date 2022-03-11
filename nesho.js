var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Update();
    Draw();

    setTimeout(init, 10);
}

class Player {
    constructor(x, width, height) {
        this.defX = x;
        this.defY = 375;

        this.x = this.defX;
        this.y = this.defXY;

        this.width = width;
        this.height = height;

        this.angle = Math.PI / -2;
    }

    draw() {
        this.x = this.defX + Math.cos(this.angle) * planet.diameter / 2;
        this.y = this.defY + (Math.sin(this.angle) + 1) * planet.diameter / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(Math.PI / 2 * ((this.x + this.width / 2) / planet.diameter - 0.25));
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

        ctx.drawImage(document.getElementById("player"), this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}

class Planet {
    constructor(diameter) {
        this.x = -diameter / 4;
        this.diameter = diameter;
        this.rotation = 0;
    }

    draw() {
        ctx.drawImage(document.getElementById("planet"), this.x, player.defY + player.width, this.diameter, this.diameter);
    }
}

window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
});
