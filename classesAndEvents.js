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

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

let pauseMenu = document.getElementById("pause-menu");

function resizePage() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasUI.width = window.innerWidth;
    canvasUI.height = window.innerHeight;

    pauseMenu.style.width = window.innerWidth;
    pauseMenu.style.height = window.innerHieght;
}
resizePage();

function init() {
    if (!paused) {
        if (pauseMenu.style.display != "none") {
            pauseMenu.style.display = "none";
        }

        Update();

        ctx.globalAlpha = 1;
        ctxUI.globalAlpha = 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxUI.clearRect(0, 0, canvas.width, canvas.height);

        Draw();
    } else pauseMenu.style.display = "block";

    setTimeout(init, 10);
}

enemyClasses.push(
    class smallEnemy {
        constructor(h, angle_) {

            this.h = h;
            this.angle = angle_;
            this.x = planet.x + Math.cos(this.angle) * this.h;
            this.y = planet.y + Math.sin(this.angle) * this.h;


            this.type = "smallEnemy";
            this.updates = 0;
            this.frame = 0;
            this.sizeX = 100;
            this.sizeY = 100;

        }

        shooting() {
            bullets.push(new Bullet(this.x,
                this.y,
                (angleCalc(this.x, this.y, player.x + player.width/2, player.y + player.height/2)),
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
                "enemyBullet",
                15,
                5,
                1,
                bullets.length
            ));
        }

        update() {
            this.updates++;
            if (this.updates % 500 == 0) this.shooting();

            if (this.updates % 50 == 0) {
                this.frame++;

                if (this.frame > 3) this.frame = 0;
            }

            this.x = this.defX + Math.cos(planet.angle) * 1000;
            this.y = this.defY + Math.sin(planet.angle) * 1000;
            //this.x += Math.cos(planet.angle)
            //this.y += Math.sin(planet.angle)
        }
        draw() {
            ctx.drawImage(green_blobImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
        }

    },
    class bigBrainEnemy {
        constructor(h, angle_) {
            this.h = h;
            this.angle = angle_;
            this.x = planet.x + Math.cos(this.angle) * this.h;
            this.y = planet.y + Math.sin(this.angle) * this.h;
            this.type = "bigBrainEnemy";
            this.updates = 0;
            this.frame = 0;
            this.sizeX = 100;
            this.sizeY = 200;

        }

        shooting() {
            bullets.push(new Bullet(this.x,
                this.y,
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
                "bigBrainBullet",
                30,
                2,
                1,
                bullets.length
            ));
        }

        update() {
            this.updates++;
            if (this.updates % 500 == 0) this.shooting();
            if (this.updates % 50 == 0) {
                this.frame++;

                if (this.frame > 3) this.frame = 0;
            }
            if ((isKeyPressed[39] || isKeyPressed[68]) && player.angle >= player.defA + cap) {
                this.angle -= speed;
            } else if ((isKeyPressed[37] || isKeyPressed[65]) && player.angle <= player.defA - cap) {
                this.angle += speed;
            }
            this.x = planet.x + planet.diameter / 2 + Math.cos(this.angle) * this.h;
            this.y = planet.y + planet.diameter / 2 + Math.sin(this.angle) * this.h;
        }
        draw() {
            ctx.drawImage(bigBrainEnemyImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
        }

    },
    class bigEnemy {
        constructor(n, angle_) {
            this.h = h;
            this.angle = angle_;
            this.x = planet.x + Math.cos(this.angle) * this.h;
            this.y = planet.y + Math.sin(this.angle) * this.h;
            this.type = "bigEnemy";
            this.updates = 0;
            this.frame = 0;
            this.sizeX = 200;
            this.sizeY = 200;

        }
        shooting() {
            bullets.push(new Bullet(this.x,
                this.y,
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) + Math.PI / 3),
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) + Math.PI / 3),
                "enemyBullet",
                20,
                5,
                1,
                bullets.length
            ));

            bullets.push(new Bullet(this.x,
                this.y,
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2)),
                "enemyBullet",
                20,
                7.5,
                1,
                bullets.length
            ));
            bullets.push(new Bullet(this.x,
                this.y,
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) - Math.PI / 3),
                (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) - Math.PI / 3),
                "enemyBullet",
                20,
                5,
                1,
                bullets.length
            ));
        }

        update() {
            this.updates++;
            if (this.updates % 500 == 0) this.shooting();

            if (this.updates % 7.5 == 0) {
                this.frame++;

                if (this.frame > 2) this.frame = 0;
            }
            if ((isKeyPressed[39] || isKeyPressed[68]) && player.angle >= player.defA + cap) {
                this.angle -= speed;
            } else if ((isKeyPressed[37] || isKeyPressed[65]) && player.angle <= player.defA - cap) {
                this.angle += speed;
            }
            this.x = planet.x + planet.diameter / 2 + Math.cos(this.angle) * this.h;
            this.y = planet.y + planet.diameter / 2 + Math.sin(this.angle) * this.h;
        }

        draw() {
            ctx.drawImage(bigEnemyImages[this.frame], this.x - this.sizeX / 2, this.y - this.sizeY / 2, this.sizeX, this.sizeY)
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
    }

    draw() {
        ctx.beginPath();
        if (this.color == "enemyBullet") {
            ctx.drawImage(enemyBullet, this.x - this.r, this.y - this.r, this.r, this.r);
        }
        else if (this.color == "bigBrainBullet") {
            ctx.save();
            ctx.translate(this.x - this.r, this.y - this.r);
            ctx.rotate(this.angle);
            ctx.translate(-this.x + this.r, -this.y + this.r);
            ctx.drawImage(rocketImages[this.frame], this.x - this.r, this.y - this.r, this.r, this.r);
            ctx.rotate(-this.angle);
            ctx.restore();
        } else if (this.color == "uziBullet") {
            ctx.drawImage(uziBullet, this.x - this.r, this.y - this.r, this.r, this.r);
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

        this.weapon = 'uzi';
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
        if (isMousePressed && !isKeyPressed[77]) {
            this.gunPossibleToShot = true;
        } else {
            this.gunPossibleToShot = false;
        }
        if (this.weapon == 'pistol') {
            if (this.gunPossibleToShot && this.gunTime >= 75) {
                let anglejhdsak = angleCalc(this.x + this.width / 2,this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    (anglejhdsak + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                    (anglejhdsak + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                    "red",
                    5,
                    10,
                    5,
                    bullets.length
                ));

                console.log(bullets);
                this.gunTime = 0;
                this.gunShot = true;
            }
            this.gunTime++;
        }
        if (this.weapon == 'shotgun') {
            if (isMousePressed && this.gunTime >= 100) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height/2, mouseX, mouseY);
                for (let i = 0; i < 8; i++) {
                    bullets.push(new Bullet(
                        this.x + Math.cos(anglejhdsak) * 75 + this.width/2,
                        this.y + Math.sin(anglejhdsak) * 75 + this.height/2,
                        (anglejhdsak + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
                        (anglejhdsak + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
                        "green",
                        3,
                        7.5,
                        3));
                }
                this.gunTime = 0;
            }
            this.gunTime++;
        }
        if (this.weapon == 'rifle') {
            if (this.gunPossibleToShot && this.gunTime >= 20) {
                let anglejhdsak = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI)*100,
                    this.y + this.height / 2 + Math.sin(anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI)*100 - 15,
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    (anglejhdsak + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    "red",
                    5,
                    10,
                    5,
                    bullets.length
                ));

                console.log(bullets);
                this.gunTime = 0;
                this.gunShot = true;
            }
            this.gunTime++;
        }
        if (this.weapon == 'uzi') {
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

                console.log(bullets);
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

        let gunAngle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX , mouseY );
        //console.log(gunAngle);
        ctx.save();

        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(gunAngle);
        context.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        
        if (this.weapon == 'pistol') {
            if (!this.gunShot) {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(pistol1LImage, this.x + this.width/2, this.y  + this.height/4, 50, 50);
                } else {
                    ctx.drawImage(pistol1Image, this.x + this.width / 2, this.y + this.height / 2, 50, 50);
                }
            } else {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(pistol2Image, this.x + this.width / 2, this.y + this.height/4 , 50, 50);
                } else {
                    ctx.drawImage(pistol2LImage, this.x + this.width / 2, this.y + this.height / 2, 50, 50);
                }
            }

        }
        else if (this.weapon == 'rifle') {
            if (!this.gunShot) {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(rifle1LImage, this.x + this.width/2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(rifle1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            } else {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(rifle2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(rifle2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            }
        } else if (this.weapon == 'shotgun') {
            if (!this.gunShot) {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(shotgun1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(shotgun1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            } else {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(shotgun2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(shotgun2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            }
        }
        else if (this.weapon == 'uzi') {
            if (!this.gunShot) {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
                    ctx.drawImage(uzi1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                } else {
                    ctx.drawImage(uzi1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 75, 50);
                }
            } else {
                if (gunAngle >= 0.5 * Math.PI && gunAngle <= 1.5 * Math.PI) {
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
        let pos = canvas.width - this.coins.toString().length * 42.5 - 60;

        ctxUI.drawImage(document.getElementById("coin" + this.coinsState % 12), pos - 90, 50);

        if (this.cooldownC < 1) {
            this.cooldownC = 10;
            this.coinsState++;
        } else this.cooldownC--;

        ctxUI.fillStyle = "yellow";
        ctxUI.strokeStyle = "orange";

        ctxUI.lineWidth = 3;
        ctxUI.font = "90px Comic Sans MS";

        ctxUI.fillText(this.coins, pos, 122.5);
        ctxUI.strokeText(this.coins, pos, 122.5)
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
        this.defA = angle;
        this.angle;

        this.width = width;
        this.height = height;

        this.level = 0;
        this.frame = 0;

        this.x, this.y;
        this.h = planet.diameter / 2 + this.height / 4;

        if (this.type == "house") this.level = 0;
        this.type;
    }

    draw() {
        this.angle = this.defA + planet.angle - 1.5 * Math.PI;
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
            
        if (this.type != "house") this.frame += 0.1;

        ctx.drawImage(document.getElementById(this.type + this.level.toString() + Math.floor(this.frame) % 3), this.x, this.y, this.width, this.height)

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

function mousedownFunction() {
    console.log(event.clientX, event.clientY);
}

window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;

    if (e.keyCode == 27 || e.keyCode == 83) {
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

window.addEventListener("mousedown", e => {
    isMousePressed = 1;
    mousedownFunction();
});

window.addEventListener("mouseup", e => isMousePressed = 0);
