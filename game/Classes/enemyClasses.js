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
        if (!player || this.deathTimer != -2) return;

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
        if (this.hp <= 0 && !this.dead) {
            this.deathTimer = 39;
            if (player) player.coins += this.coinsPer;
            this.dead = true;
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

        if (this.updates % 20 == 0) {
            this.frame++;
            if (this.frame > 3) this.frame = 0;
        }

        this.angle = this.defA + planet.angle - Math.PI / 2;

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
            ctx.drawImage(enemyDeath[Math.floor(this.deathTimer / 10)], this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
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