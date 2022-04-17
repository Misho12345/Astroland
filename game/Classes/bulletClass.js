class Bullet {
    constructor(x_, y_, dX_, dY_, color_, r_, speed_, damage_) {
        this.x = x_;
        this.defX = x_;
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
        this.fuel = 1000;

        this.collided = false;

        this.hit = new Audio("./game/Audio/bullet_hit.mp3");

        this.volume = 0.15 - (distance(
            this.x + this.r,
            this.y + this.r,
            player.x + player.width / 2,
            player.y + player.height / 2)) / (planet.diameter / 3);

        if (this.volume > 1) this.volume = 1;
        else if (this.volume < 0 || !this.volume) this.volume = 0;

        this.hit.volume = this.volume;
    }

    update() {
        if (this.collided) return;

        if (areColliding(boss.x - boss.width / 3, boss.y - boss.height / 3, boss.width / 3 * 2, boss.height / 3 * 2,
            this.x - this.r, this.y - this.r, this.r * 2, this.r * 2) && this.color != 'enemyBullet' && this.color != "bigBrainBullet") {
            boss.hp -= this.damage;
            this.collided = true;
        }

        if (distance(this.x, this.y, planet.x + planet.diameter / 2, planet.y + planet.diameter / 2) < planet.diameter / 2) {
            this.collided = true;
            this.hit.play();

            return;
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

                enemies[i].hp -= this.damage;
                this.hit.play();
                this.collided = true;

                return;
            }
            else if (areColliding(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2,
                player.x, player.y, player.width, player.height) &&
                (this.color == "enemyBullet" || this.color == "bigBrainBullet")) {
                console.log(this.damage);
                player.hp -= this.damage;
                this.hit.play();
                this.collided = true;

                return;
            }
            else {
                buildings.forEach(building => {
                    if (areColliding(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2,
                        building.x, building.y, building.width, building.height) &&
                        (this.color == "enemyBullet" || this.color == "bigBrainBullet")) {

                        if (!building.buildingType.indestructible) building.hp -= this.damage;
                        this.hit.play();
                        this.collided = true;

                        return;
                    }
                });
            }
        }
    }

    draw() {
        if (this.collided) return;

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