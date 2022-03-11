let canvas = document.getElementById("canvas");
let canvasUI = document.getElementById("canvasUI");

const ctx = canvas.getContext("2d");
const context = canvas.getContext("2d");
const ctxUI = canvasUI.getContext("2d");
const contextUI = canvasUI.getContext("2d");

let bullets = [], enemyClasses = [], enemies = [];

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasUI.width = window.innerWidth;
    canvasUI.height = window.innerHeight;
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

enemyClasses.push(
    class smallEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "smallEnemy";
        this.updates = 0;
        this.frame = 0;
        this.sizeX = 100;
        this.sizeY = 100;

    }
    pucane() {
        bullets.push(new Bullet(this.x,
            this.y,
            Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
            Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
            "enemyBullet",
            15,
            5,
            1,
        ));
    }
    update() {
        this.updates++;
        if (this.updates % 500 == 0) {
            this.pucane();
        }
        if (this.updates % 50 == 0) {
            this.frame++;
            if (this.frame > 3) {
                this.frame = 0;
            }
        }
    }
    draw() {
        ctx.drawImage(zelensopolImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
    }
    
},
    class bigBrainEnemy {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.type = "bigBrainEnemy";
            this.updates = 0;
            this.frame = 0;
            this.sizeX = 100;
            this.sizeY = 200;

        }
        pucane() {
            bullets.push(new Bullet(this.x,
                this.y,
                Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                "bigBrainBullet",
                30,
                2,
                1,
            ));
        }
        update() {
            this.updates++;
            if (this.updates % 500 == 0) {
                this.pucane();
            }
            if (this.updates % 50 == 0) {
                this.frame++;
                if (this.frame > 3) {
                    this.frame = 0;
                }
            }
        }
        draw() {
            ctx.drawImage(bigBrainEnemyImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
        }

    },
    class THICCenemy {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.type = "THICCenemy";
            this.updates = 0;
            this.frame = 0;
            this.sizeX = 200;
            this.sizeY = 200;

        }
        pucane() {
            bullets.push(new Bullet(this.x,
                this.y,
                Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y) + Math.PI / 10),
                Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y) + Math.PI / 10),
                "enemyBullet",
                20,
                5,
                1,
            ));
            bullets.push(new Bullet(this.x,
                this.y,
                Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y)),
                "enemyBullet",
                20,
                7.5,
                1,
            ));
            bullets.push(new Bullet(this.x,
                this.y,
                Math.cos(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y) - Math.PI / 10),
                Math.sin(namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y) - Math.PI / 10),
                "enemyBullet",
                20,
                5,
                1,
            ));
        }
        update() {
            this.updates++;
            if (this.updates % 500 == 0) {
                this.pucane();
            }
            if (this.updates % 7.5 == 0) {
                this.frame++;
                if (this.frame > 2) {
                    this.frame = 0;
                }
            }
        }
        draw() {
            ctx.drawImage(THICCenemyImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
        }

    },)

class Bullet {
    constructor(x_, y_, dX_, dY_, color_, r_, speed_, damage_) {
        this.x = x_;
        this.y = y_;
        this.dX = dX_;
        this.dY = dY_;
        this.color = color_;
        this.r = r_;
        this.speed = speed_;
        this.frame = 0;
        this.updates = 0;
        this.angle = 0;
        this.damage = damage_;
    }

    update() {
        if (this.color == "bigBrainBullet") {
            this.dX = namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y);
            this.dY = namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y);
        }
        this.x += Math.cos(this.dX) * this.speed;
        this.y += Math.sin(this.dY) * this.speed;
        this.updates++;
        if (this.updates % 5 == 0) {
            this.frame++;
            if (this.frame > 2) {
                this.frame = 0;
            }
        }
        this.angle = namiraneNaNeshtosiUgul(this.x, this.y, player.x, player.y);
    }

    draw() {
        ctx.beginPath();
        if (this.color == "enemyBullet") {
            ctx.drawImage(enemyBullet, this.x - this.r, this.y - this.r, this.r, this.r);
        } else if (this.color == "bigBrainBullet") {
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-this.x, -this.y);
            ctx.drawImage(rocketImages[this.frame], this.x - this.r, this.y - this.r, this.r, this.r);
            ctx.rotate(-this.angle);
            ctx.restore();
        } else {
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.r / 4;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
        }
        
    }
}

class Player {
    constructor(width, height) {
        this.x, this.y;
        this.hp = 20;
        this.width = width;
        this.height = height;

        this.angle = Math.PI / -2;
        this.h = planet.diameter / 2 + this.height / 4;
        this.defA = this.angle;

        this.cooldown = 15;
        this.dir = 0;
        this.order = 0;
        this.state = 0;

        this.coins = 100;
        this.coinsState = 0;
        this.cooldownC = 10;
    }

    draw() {
        for (let i = 0; i < this.hp; i++) {
            if (i % 2 == 0) {
                ctxUI.drawImage(heart1, i * 20, 0, 20, 30);
            } else {
                ctxUI.drawImage(heart2, i * 20, 0, 20, 30);
            }
        }
        for (let i = this.hp; i < 20; i++) {
            if (i % 2 == 0) {
                ctxUI.drawImage(ded1, i * 20, 0, 20, 30);
            } else {
                ctxUI.drawImage(ded2, i * 20, 0, 20, 30);
            }
        }

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
        }

        ctx.drawImage(document.getElementById("player" + (this.state > 0 ? this.dir : 0) + "_" + this.state), this.x, this.y, this.width, this.height);
        
        ctx.restore();
    }

    showCoins() {
        ctxUI.drawImage(document.getElementById("coin" + this.coinsState % 12), canvasUI.width - 280, 50);

        if (this.cooldownC < 1) {
            this.cooldownC = 10;
            this.coinsState++;
        } else this.cooldownC--;

        ctxUI.fillStyle = "yellow";
        ctxUI.strokeStyle = "orange";

        ctxUI.lineWidth = 3;

        ctxUI.font = "90px Comic Sans MS";

        ctxUI.fillText(this.coins, canvasUI.width - 200, 125);
        ctxUI.strokeText(this.coins, canvasUI.width - 200, 125)
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
        ctx.rotate((this.angle + Math.PI / 2));
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
