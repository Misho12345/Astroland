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

        this.weapon = weapons[0];
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
        this.gunPossibleToShot = (isMousePressed && !isKeyPressed[77]);

        if (this.weapon == 'pistol') {
            if (this.gunPossibleToShot && this.gunTime >= 75) {
                let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    (angle + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                    (angle + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
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
                let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);
                for (let i = 0; i < 8; i++) {
                    bullets.push(new Bullet(
                        this.x + Math.cos(angle) * 75 + this.width / 2,
                        this.y + Math.sin(angle) * 75 + this.height / 2,
                        (angle + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
                        (angle + (randomInteger(20) / 100 - 10 / 100) * Math.PI),
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
        else if (this.weapon == 'riffle') {
            if (this.gunPossibleToShot && this.gunTime >= 20) {
                let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100,
                    this.y + this.height / 2 + Math.sin(angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100 - 15,
                    (angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    (angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
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
            if (this.gunPossibleToShot && this.gunTime >= 8) {
                let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100,
                    this.y + this.height / 2 + Math.sin(angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI) * 100 - 15,
                    (angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
                    (angle + (randomInteger(5) / 100 - 2.5 / 100) * Math.PI),
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

        if (this.gunPossibleToShot && this.gunTime >= this.weapon.fireSpeed) {
            let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

            bullets.push(new Bullet(
                this.x + this.width / 2,
                this.y + this.height / 2,
                (angle + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                (angle + (randomInteger(3) / 100 - 1.5 / 100) * Math.PI),
                this.weapon.bulletColor,
                5,
                10,
                3,
                bullets.length
            ));

            this.gunTime = 0;
            this.gunShot = true;
        }
        this.gunTime++;

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
        else if (this.weapon == 'riffle') {
            if (!this.gunShot) {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(riffle1LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(riffle1Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                }
            } else {
                if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                    ctx.drawImage(riffle2Image, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
                } else {
                    ctx.drawImage(riffle2LImage, this.x + this.width / 2, this.y + this.height / 2 - 25, 100, 50);
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