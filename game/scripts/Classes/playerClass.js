class Player {
    constructor(width, height) {
        this.x, this.y;
        this.maxHp = 20;
        this.hp = this.maxHp;
        this.width = width;
        this.height = height;

        this.angle = Math.PI / -2;
        this.h = planet.diameter / 2 + this.height / 4;
        this.defA = this.angle;

        this.cooldown = 15;
        this.dir = 0;
        this.order = 0;
        this.state = 0;

        this.weaponIdx = 0;
        this.weapon;
        this.gunTime = 0;
        this.gunShot = false;
        this.gunPossibleToShot = false;

        this.coins = 0;
        this.coinsState = 0;
        this.cooldownC = 10;

        this.up = false;
        this.gravitySpeed = 0;
        this.gravity = 0.5;

        this.mobKills = 0;
    }

    update() {
        this.weapon = weapons[this.weaponIdx];

        this.gunPossibleToShot = (isMousePressed && !isKeyPressed[77]);

        if (this.gunPossibleToShot && this.gunTime >= this.weapon.fireSpeed) {
            let angle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

            let audio = new Audio(this.weapon.audio_src);
            audio.play();
            audio.volume = this.weapon.audio_volume;

            for (let i = 0; i < this.weapon.bulletCount; i++)
                bullets.push(new Bullet(
                    this.x + this.width / 2 + Math.cos(angle) * this.weapon.width,
                    this.y + this.height / 2 + Math.sin(angle) * this.weapon.width - this.weapon.height / 4,
                    (angle + (randomInteger(this.weapon.inaccuracy) - this.weapon.inaccuracy / 2) / 100 * Math.PI),
                    (angle + (randomInteger(this.weapon.inaccuracy) - this.weapon.inaccuracy / 2) / 100 * Math.PI),
                    this.weapon.bulletColor,
                    this.weapon.radius,
                    this.weapon.bulletSpeed,
                    this.weapon.dmg
                ));

            this.gunTime = 0;
            this.gunShot = true;
        }
        this.gunTime++;

        if (this.gunTime > 10) this.gunShot = false;

        if (this.h > planet.diameter / 2 + this.height / 4 && this.up) {
            this.gravitySpeed += this.gravity;
            this.h -= this.gravitySpeed;
        } else {
            this.up = false;
            this.gravitySpeed = 0;
            this.h = planet.diameter / 2 + this.height / 4;
        }

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
    }

    draw() {
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (this.gunShot && this.state == 0) {
            if (angleCalc(mouseX, mouseY, this.x - this.width / 2, this.y - this.height / 2) > Math.PI / 2 &&
                angleCalc(mouseX, mouseY, this.x - this.width / 2, this.y - this.height / 2) < Math.PI / 2 * 3) {
                ctx.drawImage(document.getElementById("player1_1"), this.x, this.y, this.width, this.height);
            } else {
                ctx.drawImage(document.getElementById("player0_1"), this.x, this.y, this.width, this.height);
            }
        } else {
            ctx.drawImage(document.getElementById("player" + (this.state > 0 ? this.dir : 0) + "_" + this.state), this.x, this.y, this.width, this.height);
        }

        ctx.restore();

        let gunAngle = angleCalc(this.x + this.width / 2, this.y + this.height / 2, mouseX, mouseY);

        ctx.save();

        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(gunAngle);
        context.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        let images = this.weapon.images;

        if (this.state != 0 || this.gunShot) {
            if (gunAngle >= Math.PI / 2 && gunAngle <= Math.PI * 1.5) {
                ctx.drawImage(this.gunShot ? images.L_firing : images.L_normal, this.x + this.width / 2, this.y + this.height / 2 - 25, this.weapon.width, this.weapon.height);
            } else {
                ctx.drawImage(this.gunShot ? images.R_firing : images.R_normal, this.x + this.width / 2, this.y + this.height / 2 - 25, this.weapon.width, this.weapon.height);
            }
        }

        //ctx.rotate(-gunAngle);
        ctx.restore();

        //ctxUI.fillRect(mouseX, mouseY, 50, 50);

        for (let i = 0; i < this.hp; i++) {
            if (i % 2 == 0) ctxUI.drawImage(heart1, 20 + i * 20, 20, 20, 30);
            else ctxUI.drawImage(heart2, 20 + i * 20, 20, 20, 30);
        }
        for (let i = this.hp; i < this.maxHp; i++) {
            if (i % 2 == 0) ctxUI.drawImage(dead1, 20 + i * 20, 20, 20, 30);
            else ctxUI.drawImage(dead2, 20 + i * 20, 20, 20, 30);
        }
    }

    showCoins() {
        let coins = Math.floor(this.coins)
        let pos = canvas.width - 25;

        ctxUI.fillStyle = "yellow";
        ctxUI.strokeStyle = "orange";

        ctxUI.lineWidth = 3;
        ctxUI.textAlign = "right";
        ctxUI.font = "90px Common Pixel, sans-serif";

        let space = ctxUI.measureText(coins.toString()).width;

        ctxUI.drawImage(document.getElementById("coin" + this.coinsState % 12), pos - space - 100, 50);

        if (this.cooldownC < 1) {
            this.cooldownC = 10;
            this.coinsState++;
        } else this.cooldownC--;

        ctxUI.fillText(coins, pos, 117.5);
        ctxUI.strokeText(coins, pos, 117.5);
    }
}