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
        this.fuel = 1000;
    }

    update() {
        if (distance(this.x, this.y, planet.x + planet.diameter / 2, planet.y + planet.diameter / 2) < planet.diameter / 2) {
            this.x = -100000;
            this.y = -100000;
        }

        if (this.color == "bigBrainBullet") {
            this.dX = angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
            this.dY = angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
            this.fuel--;
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