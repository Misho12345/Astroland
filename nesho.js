let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bullets = [], enemyClasses = [], enemies = [];

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

let elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Update();
    Draw();

    setTimeout(init, 10);
}

enemyClasses.push(class smallEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "smallEnemy";
        this.updates = 0;
    }
    pucane() {
        bullets.push(new Bullet(this.x,
            this.y,
            Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
            Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
            "lime",
            100,
            5,
            1,
        ));
    }
    update() {
        this.updates++;
        if (this.updates % 500 == 0) {
            this.pucane();
        }
    }
    draw() {

    }
    
})

class Bullet {
    constructor(x_, y_, dX_, dY_, color_, r_, speed_, damage_) {
        this.x = x_;
        this.y = y_;
        this.dX = dX_;
        this.dY = dY_;
        this.color = color_;
        this.r = r_;
        this.speed = speed_;
        this.damage = damage_;
    }

    update() {
        this.x += Math.cos(this.dX) * this.speed;
        this.y += Math.sin(this.dY) * this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.r/4;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
}

class Player {
    constructor(width, height) {
        this.x, this.y;
        this.width = width;
        this.height = height;

        this.angle = Math.PI / -2;
        this.h = planet.diameter / 2 + this.height / 4;

        this.defA = this.angle;

        this.cooldown = 15;
        this.dir = 0;
        this.order = 0;
        this.state = 0;
    }

    draw() {
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (this.state > 0) {
            if (this.cooldown < 1) {
                if (this.state == 1) {
                    this.state = (this.order == 0) ? 2 : 3;
                    this.order = 1 - this.order;
                }
                else this.state = 1;

                this.cooldown = 15;
            } else this.cooldown--;
        }
        else {
            if (this.dir == 0 && this.angle < this.defA) {
                planet.angle += speed;
                player.angle += speed;
            }
            else if (this.dir == 1 && this.angle > this.defA) {
                planet.angle -= speed;
                player.angle -= speed;
            }
            else this.angle = this.defA;

            console.log(this.angle - this.defA)
        }

        ctx.drawImage(document.getElementById("player" + (this.state > 0 ? this.dir : 0) + "_" + this.state), this.x, this.y, this.width, this.height);
        
        ctx.restore();
    }
}

class Planet {
    constructor(diameter) {
        this.diameter = diameter;
        this.angle = Math.PI / -2;

        this.x, this.y;
    }

    draw() {
        this.x = canvas.width / 2 - this.diameter / 2;
        this.y = canvas.height / 2 - this.diameter / 2;

        ctx.translate(this.x + this.diameter / 2, this.y + this.diameter / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.diameter / 2, -this.y - this.diameter / 2);

        ctx.drawImage(document.getElementById("planet"), this.x, this.y, this.diameter, this.diameter);

        ctx.translate(this.x + this.diameter / 2, this.y + this.diameter / 2);
        ctx.rotate(-this.angle -Math.PI / 2);
        ctx.translate(-this.x - this.diameter / 2, -this.y - this.diameter / 2);
    }
}

window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
});
