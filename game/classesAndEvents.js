let canvas = document.getElementById("canvas");
let canvasUI = document.getElementById("canvasUI");

let mouseX = 0, mouseY = 0, isMousePressed = 0;

const ctx = canvas.getContext("2d");
const context = canvas.getContext("2d");

const ctxUI = canvasUI.getContext("2d");
const contextUI = canvasUI.getContext("2d");

let bullets = [], enemyClasses = [], enemies = [];
let buildings = [];

let paused = false, pausing = false;
let dead = false;

let rocket;
let rocketSpeed = 0;

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

let pauseMenu = document.getElementById("pause-menu");
let gameOverMenu = document.getElementById("game-over-menu");
let video = document.getElementById("endScreen");

let weapons = [
    "pistol",
    "shotgun",
    "uzi",
    "rifle"
];

function resizePage() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasUI.width = window.innerWidth;
    canvasUI.height = window.innerHeight;
}
resizePage();

function requestBuildingAndPurchasing(type) {
    switch (type) {
        case "house":
            if (player.coins >= 50) {
                buildings.push(new House(-planet.angle + Math.PI + player.angle - player.defA, 512, 256));
                player.coins -= 50;
            }
            break;

        case "drill":
            if (player.coins >= 150) {
                buildings.push(new Drill(-planet.angle + Math.PI + player.angle - player.defA, 256, 256));
                player.coins -= 150;
            }
            break;

        case "rocket":
            if (player.coins >= 500) {
                rocket = new Rocket(-planet.angle + Math.PI + player.angle - player.defA, 256, 512);
                player.coins -= 500;

                bullets = [];
                gameEnd = true;
                player = null;

                enemies.forEach(enemy => {
                    enemy.deathTimer = 39;
                });
            }
            break;

        default: console.log("E R R O R"); break;

            buildings[buildings.length - 1].idx = buildings[buildings.length - 2].idx + 1;
    }

    paused = false;
}

function requestWeaponUpdrade() {
    if (player.idx < 3 && player.coins >= (player.idx + 1) * 50) {
        player.coins -= (player.idx + 1) * 50;
        player.idx++;

        let price = document.getElementById("coins");

        if (player.idx == 3) price.innerHTML = "max";
        else {
            price.innerHTML = (player.idx + 1) * 50;
            document.getElementById("guns").style.backgroundImage = "url('./pics/" + weapons[player.idx + 1] + "1.png')";
        }
    }

    paused = false;
}

function init() {
    if (!paused && !dead) {
        if (pauseMenu.style.display != "none") {
            pauseMenu.style.display = "none";
        }

        Update();

        ctx.globalAlpha = 1;
        ctxUI.globalAlpha = 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxUI.clearRect(0, 0, canvas.width, canvas.height);

        Draw();
    }
    else if (dead) gameOverMenu.style.display = "block";
    else if (paused) pauseMenu.style.display = "block";

    setTimeout(init, 10);
}

class Enemy {
    constructor(h, angle_) {
        this.h = h;
        this.defA = angle_;
        this.angle = angle_;
        this.x = planet.x + Math.cos(this.angle) * this.h;
        this.y = planet.y + Math.sin(this.angle) * this.h;

        this.type;
        this.bulletColor;

        this.bulletR;
        this.bulletSpeed;

        this.updates = 0;
        this.frame = 0;
        this.width;
        this.height;

        this.dead = false;
        this.deathTimer = -2;
        this.coinsPer;

        //this.hp;
    }

    shooting() {
        bullets.push(new Bullet(this.x, this.y,
            (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
            (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
            this.bulletColor,
            this.bulletR,
            this.bulletSpeed,
            1,
            bullets.length
        ));
    }

    update() {
        if (this.hp <= 0) {
            this.deathTimer = 39;
            player.coins += this.coinsPer;
            this.dead = true;
            this.hp = 69420;
        }
        if (this.deathTimer != -2) {
            this.deathTimer--;
        }

        this.updates++;
        if (this.updates % 500 == 0) {
            this.shooting();
            if (this.type == "bigEnemy") {
                this.bulletSpeed = 7.5;
                this.shooting();
                this.bulletSpeed = 5;
                this.shooting();
            }
        }

        if (this.updates % 50 == 0) {
            this.frame++;
            if (this.frame > 3) this.frame = 0;
        }

        this.angle = this.defA + planet.angle + Math.PI / 2;

        this.x = planet.x + planet.diameter / 2 + Math.cos(this.angle) * this.h;
        this.y = planet.y + planet.diameter / 2 + Math.sin(this.angle) * this.h;
    }

    draw() {
        let arr;

        switch (this.type) {
            case "smallEnemy": arr = green_blobImages; break;
            case "bigBrainEnemy": arr = bigBrainEnemyImages; break;
            case "bigEnemy": arr = bigEnemyImages; break;
            default: console.log("E R R O R");
        }

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (this.deathTimer == -2) {
            ctx.drawImage(arr[this.frame], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        } else if (this.deathTimer >= 0) {
            ctx.drawImage(sopoldeath[Math.floor(this.deathTimer / 10)], this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
        }

        ctx.restore();
    }
}

enemyClasses.push(
    class smallEnemy extends Enemy {
        constructor(h, angle_) {
            super(h, angle_);

            this.coinsPer = 2;

            this.type = "smallEnemy";
            this.width = 100;
            this.height = 100;

            this.bulletColor = "enemyBullet";
            this.bulletR = 15;
            this.bulletSpeed = 5;

            this.hp = 3;
        }
    },
    class bigBrainEnemy extends Enemy {
        constructor(h, angle_) {
            super(h, angle_);

            this.coinsPer = 3;

            this.width = 100;
            this.height = 200;

            this.type = "bigBrainEnemy";
            this.bulletColor = "bigBrainBullet";
            this.bulletR = 30;
            this.bulletSpeed = 2;

            this.hp = 7.5;
        }
    },
    class bigEnemy extends Enemy {
        constructor(h, angle_) {
            super(h, angle_);

            this.coinsPer = 4;

            this.type = "bigEnemy";
            this.width = 200;
            this.height = 200;

            this.bulletColor = "enemyBullet";
            this.bulletR = 20;
            this.bulletSpeed = 5;

            this.hp = 15;
        }
    });

class Bullet {
    constructor(x_, y_, dX_, dY_, color_, r_, speed_, damage_, index_) {
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
        this.index = index_;
        this.fiel = 1000;
    }

    update() {
        if (distance(this.x, this.y, planet.x + planet.diameter / 2, planet.y + planet.diameter / 2) < planet.diameter / 2) {
            this.x = -100000;
            this.y = -100000;
        }

        if (this.color == "bigBrainBullet") {
            this.dX = angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
            this.dY = angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
            this.fiel--;
        }

        this.x += Math.cos(this.dX) * this.speed;
        this.y += Math.sin(this.dY) * this.speed;

        this.updates++;
        if (this.updates % 5 == 0) {
            this.frame++;
            if (this.frame > 2) this.frame = 0;
        }
        this.angle = angleCalc(this.x, this.y, player.x, player.y);

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i] && !enemies[i].dead &&
                areColliding(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2,
                    enemies[i].x - enemies[i].width / 2, enemies[i].y - enemies[i].height / 2,
                    enemies[i].width, enemies[i].height) &&
                this.color != "enemyBullet" &&
                this.color != "bigBrainBullet") {
                //console.log(this.demage,enemies[i].hp);
                enemies[i].hp -= this.damage;
                bullets.splice(this.index, 1);
                /*
                enemies[i].deathTimer = 39;
                player.coins += enemies[i].coinsPer
                enemies[i].dead = true;
                */
                this.index--;
                break;
            }
            else if (areColliding(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2,
                player.x, player.y, player.width, player.height) &&
                (this.color == "enemyBullet" || this.color == "bigBrainBullet")) {

                player.hp -= this.damage;
                this.x = -100000;
                this.y = -100000;
                //bullets.splice(this.index, 1);
                //this.index--;
                break;
            }
            else {
                let collided = false;

                buildings.forEach(building => {
                    if (areColliding(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2,
                        building.x, building.y, building.width, building.height) &&
                        (this.color == "enemyBullet" || this.color == "bigBrainBullet")) {

                        building.hp -= this.damage;
                        bullets.splice(this.index, 1);
                        this.x = -1000000;
                        this.y = -1000000;
                        //this.index--;
                        collided = true;
                    }
                });

                if (collided) break;
            }
        }
    }

    draw() {
        ctx.beginPath();
        if (this.color == "enemyBullet") {
            ctx.drawImage(enemyBullet, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        }
        else if (this.color == "bigBrainBullet") {
            ctx.save();
            ctx.translate(this.x - this.r, this.y - this.r);
            ctx.rotate(this.angle);
            ctx.translate(-this.x + this.r, -this.y + this.r);
            ctx.drawImage(rocketImages[this.frame], this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
            ctx.rotate(-this.angle);
            ctx.restore();
        } else if (this.color == "uziBullet") {
            ctx.drawImage(uziBullet, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
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

        this.idx = 0;
        this.weapon = "pistol";
        this.gunTime = 0;
        this.gunShot = false;
        this.gunPossibleToShot = false;

        this.coins = 0;
        this.coinsState = 0;
        this.cooldownC = 10;

        this.up = false;
        this.gravitySpeed = 0;
        this.gravity = 0.5;
    }

    update() {
        this.weapon = weapons[this.idx];

        if (isMousePressed && !isKeyPressed[77]) {
            this.gunPossibleToShot = true;
        } else {
            this.gunPossibleToShot = false;
        }

        if (this.weapon == 'pistol') {
            if (this.gunPossibleToShot && this.gunTime >= 75) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    (anglejhdsak + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                    (anglejhdsak + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                    "red",
                    5,
                    10,
                    3,
                    bullets.length
                ));

                this.gunTime = 0;
                this.gunShot = true;
            }
            this.gunTime++;
        }
        else if (this.weapon == 'shotgun') {
            if (isMousePressed && this.gunTime >= 100) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);
                for (let i = 0; i < 8; i++) {
                    bullets.push(new Bullet(
                        this.x + Math.cos(anglejhdsak) * 75 + this.width / 2,
                        this.y + Math.sin(anglejhdsak) * 75 + this.height / 2,
                        (anglejhdsak + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
                        (anglejhdsak + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
                        "green",
                        3,
                        7.5,
                        1,
                        bullets.length
                    ));
                }
                this.gunTime = 0;
            }
            this.gunTime++;
        }
        else if (this.weapon == 'rifle') {
            if (this.gunPossibleToShot && this.gunTime >= 20) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100,
                    this.y + this.height / 2 + Math.sin(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100 - 15,
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    "red",
                    5,
                    10,
                    7.5,
                    bullets.length
                ));

                this.gunTime = 0;
                this.gunShot = true;
            }
            this.gunTime++;
        }
        else if (this.weapon == 'uzi') {
            if (this.gunPossibleToShot && this.gunTime >= 7.5) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100,
                    this.y + this.height / 2 + Math.sin(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100 - 15,
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    "uziBullet",
                    5,
                    10,
                    5,
                    bullets.length
                ));

                this.gunTime = 0;
                this.gunShot = true;
            }
            this.gunTime++;
        }

        if (this.gunTime > 10) this.gunShot = false;
    }

    draw() {
        if (this.h > planet.diameter / 2 + this.height / 4 && this.up) {
            this.gravitySpeed += this.gravity;
            this.h -= this.gravitySpeed;
        } else {
            this.up = false;
            this.gravitySpeed = 0;
            this.h = planet.diameter / 2 + this.height / 4;
        }

        for (let i = 0; i < this.hp; i++) {
            if (i % 2 == 0) ctxUI.drawImage(heart1, i * 20, 0, 20, 30);
            else ctxUI.drawImage(heart2, i * 20, 0, 20, 30);
        }
        for (let i = this.hp; i < 20; i++) {
            if (i % 2 == 0) ctxUI.drawImage(dead1, i * 20, 0, 20, 30);
            else ctxUI.drawImage(dead2, i * 20, 0, 20, 30);
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
        } else {
            if (this.dir == 0 && this.angle < this.defA) {
                planet.angle += speed;
                player.angle += speed;
            }
            else if (this.dir == 1 && this.angle > this.defA) {
                planet.angle -= speed;
                player.angle -= speed;
            }
        }

        ctx.drawImage(document.getElementById("player" + (this.state > 0 ? this.dir : 0) + "_" + this.state), this.x, this.y, this.width, this.height);

        ctx.restore();

        let gunAngle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

        ctx.save();

        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(gunAngle);
        context.translate(-this.x - this.width / 2, -this.y - this.height / 2);


        if (this.weapon == 'pistol') {
            if (!this.gunShot) {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(pistol1LImage, this.x + this.width / 2, this.y + this.height / 4, 50, 50);
                } else {
                    ctx.drawImage(pistol1Image, this.x + this.width / 2, this.y + this.height / 2, 50, 50);
                }
            } else {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(pistol2Image, this.x + this.width / 2, this.y + this.height / 4, 50, 50);
                } else {
                    ctx.drawImage(pistol2LImage, this.x + this.width / 2, this.y + this.height / 2, 50, 50);
                }
            }

        }
        else if (this.weapon == 'rifle') {
            if (!this.gunShot) {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(rifle1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(rifle1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            } else {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(rifle2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(rifle2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            }
        }
        else if (this.weapon == 'shotgun') {
            if (!this.gunShot) {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(shotgun1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 130, 50);
                } else {
                    ctx.drawImage(shotgun1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 130, 50);
                }
            } else {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(shotgun2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 130, 50);
                } else {
                    ctx.drawImage(shotgun2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 130, 50);
                }
            }
        }
        else if (this.weapon == 'uzi') {
            if (!this.gunShot) {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(uzi1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                } else {
                    ctx.drawImage(uzi1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                }
            } else {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(uzi2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                } else {
                    ctx.drawImage(uzi2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                }
            }
        }

        //ctx.rotate(-gunAngle);
        ctx.restore();

        //ctxUI.fillRect(mouseX, mouseY, 50, 50);
    }

    showCoins() {
        let coins = Math.floor(this.coins)
        let pos = canvas.width - coins.toString().length * 42.5 - 60;

        ctxUI.drawImage(document.getElementById("coin" + this.coinsState % 12), pos - 90, 50);

        if (this.cooldownC < 1) {
            this.cooldownC = 10;
            this.coinsState++;
        } else this.cooldownC--;

        ctxUI.fillStyle = "yellow";
        ctxUI.strokeStyle = "orange";

        ctxUI.lineWidth = 3;
        ctxUI.font = "90px Comic Sans MS";

        ctxUI.fillText(coins, pos, 122.5);
        ctxUI.strokeText(coins, pos, 122.5)
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
        ctx.rotate(-this.angle - Math.PI / 2);
        ctx.translate(-this.x - this.diameter / 2, -this.y - this.diameter / 2);
    }
}

class Building {
    constructor(angle, width, height) {
        this.idx = 0;

        this.defA = angle;
        this.angle;

        this.width = width;
        this.height = height;

        this.frame = 0;
        this.maxHp = 30;
        this.hp = this.maxHp;

        this.x, this.y;
        this.h = planet.diameter / 2 + this.height / 4;

        this.type;
    }

    draw() {
        if (this.hp <= 0) buildings.splice(this.idx, 1);

        this.angle = this.defA + planet.angle + Math.PI / 2;
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (this.type != "house") this.frame += 0.1;
        if (player && this.type == "drill") player.coins += 0.02;

        if (this.type != "rocketship") {
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + this.width / 4 - 2.5, this.y - 82.5, this.width / 2 + 5, 45);

            ctx.fillStyle = "red";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2, 40);

            ctx.fillStyle = "lime";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2 * (this.hp / this.maxHp), 40);
        }
        ctx.drawImage(document.getElementById(this.type + Math.floor(this.frame) % 3), this.x, this.y, this.width, this.height)

        ctx.restore();
    }
}

class House extends Building {
    constructor(angle, width, height) {
        super(angle, width, height);
        this.type = "house";
    }
}

class Drill extends Building {
    constructor(angle, width, height) {
        super(angle, width, height);
        this.type = "drill";
    }
}

class Rocket extends Building {
    constructor(angle, width, height) {
        super(angle, width, height);
        this.type = "rocketship";
    }
}

window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;

    if (e.keyCode == 27 || e.keyCode == 80) {
        if (!pausing) paused = !paused;
        pausing = true;
    }
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
    pausing = false;
});

canvasUI.addEventListener("mousemove", e => {
    //if (!isKeyPressed[77]) {
    mouseX = event.clientX;
    mouseY = event.clientY - planet.diameter / 2 - 250;
    //}
});

if (typeof mousemove != "undefined") {
    window.addEventListener("mousemove", mousemove);
}

window.addEventListener("mousedown", e => isMousePressed = 1);

window.addEventListener("mouseup", e => isMousePressed = 0);

video.addEventListener('ended', function () {
    if (rocket) window.location.replace("mainPage.html");
});
