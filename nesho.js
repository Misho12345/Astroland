let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bullets = [], enemyClasses=[];

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Update();
    Draw();

    setTimeout(init, 10);
}
enemyClasses.push(class smallEnemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.updates = 0;
    }
    update() {
        this.updates++;

    }
    draw() {

    }
    pucane() {
        bullets.push(new Bullet(this.x,
            this.y,
            Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                    "green",
                    5,
                    5,
                    1,
                ));
    }
})
class Bullet {
    constructor(x_, y_, dX_, dY_, color_, r_, speed_, demage_) {
        this.x = x_;
        this.y = y_;
        this.dX = dX_;
        this.dY = dY_;
        this.color = color_;
        this.r = r_;
        this.speed = speed_;
        this.demage = demage_;
    }
    update() {
        this.x += Math.cos(this.dX) * this.speed;
        this.y += Math.sin(this.dY) * this.speed;

    }
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }
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

        ctx.rotate(-(Math.PI / 2 * ((this.x + this.width / 2) / planet.diameter - 0.25)));

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
       ctx.drawImage(document.getElementById("planet"), canvas.width / 2 - this.diameter / 2, canvas.height / 2 - this.diameter / 2, this.diameter, this.diameter);

    }
}

window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
});
