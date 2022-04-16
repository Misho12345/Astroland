class Boss {
    constructor() {
        this.spawned = false;
        this.width = 800
        this.height = 700;
        this.hp;
        this.x, this.y, this.angle, this.h;
        this.frame, this.phase;
        this.updates;
        this.lazerFrame = 0;
        this.lazerPhase, this.lazerPhaseTimer = 0, this.lazerPhaseTime = 1000;
    }
    update() {
        if (player.mobKills % 50 == 0 && player.mobKills != 0) {
            this.spawned = true;
            this.hp = player.mobKills * 4;
            this.defHP = this.hp;
            player.mobKills = 0;
            this.defA = planet.angle + Math.PI / 2;
            this.angle = this.defA;
            this.h = player.h + canvas.height / 7.5 * 5;
            this.phase = 0;
            this.frame = 0;
            this.updates = 0;
            this.lazerPhase = false;
            this.lazerFrame = 0;
        }
        if (this.spawned) {

            this.angle = planet.angle - this.defA;
            this.updates++;
            if (this.updates % 45 == 0) {
                this.frame++;
                if (this.frame > 5) {
                    this.frame = 0;
                }
            }
            if (this.updates % 6 == 0) {
                this.lazerFrame++;
                if (this.lazerFrame > 3) {
                    this.lazerFrame = 0;
                }
            }
            //console.log("no");
            if (this.lazerPhase) {
                this.lazerShot();
            } else if (this.updates % 200 == 0) {
                this.h -= 1;
                if (this.h < planet.diameter / 2 + player.height / 4 + canvas.height / 7.5 * 5) {
                    this.h = planet.diameter / 2 + player.height / 4 + canvas.height / 7.5 * 5;
                }
                this.shot();
            } else {
                this.h -= 1;
                if (this.h < planet.diameter / 2 + player.height / 4 + canvas.height / 7.5 * 5) {
                    this.h = planet.diameter / 2 + player.height / 4 + canvas.height / 7.5 * 5;
                }
            }
        }
    }
    lazerShot() {
        this.lazerPhaseTimer++;
        this.h += 1;
        console.log(angleCalc(this.x - this.width / 2, this.y, player.x, player.y));
        if (this.h > planet.diameter / 2 + player.height / 4 + 800) {
            this.h = planet.diameter / 2 + player.height / 4 + 800;
        }
        if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
            angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) {
            this.defA += 0.002;
            this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
            this.y = Math.sin(this.angle) * this.h + canvas.height / 2;
            if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
                angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) { } else { this.defA -= 0.002; }
        } else {
            this.defA -= 0.002;
            this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
            this.y = Math.sin(this.angle) * this.h + canvas.height / 2;
            if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
                angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) { this.defA += 0.002; }
        }
        if (this.lazerPhaseTimer > this.lazerPhaseTime) {
            this.lazerPhase = false;
        }
    }
    movePhase() {
        if (this.hp > this.defHP / 2) {
            if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
                angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) {
                this.defA += 0.002;
                this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
                this.y = Math.sin(this.angle) * this.h + canvas.height / 2;
                if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
                    angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) { } else { this.defA -= 0.002; }
            } else {
                this.defA -= 0.002;
                this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
                this.y = Math.sin(this.angle) * this.h + canvas.height / 2;
                if (angleCalc(this.x - player.width / 2, this.y, player.x, player.y) > Math.PI / 2 &&
                    angleCalc(this.x - player.width / 2, this.y, player.x, player.y) < Math.PI / 2 * 3) { this.defA += 0.002; }
            }
        }
    }
    shot() {
        if ((angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) > 0
            && angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) < Math.PI / 5) ||
            angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) > Math.PI * 1.5) {
            //this.lazerPhase = false;
            this.rightShot();
        } else if (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) > Math.PI / 4 * 3
            && angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) < Math.PI) {
            //this.lazerPhase = false;
            this.leftShot();
        } else if (this.hp <= this.defHP / 2) {
            this.lazerPhase = true;
            this.lazerPhaseTimer = 0;
        }
    }
    rightShot() {
        //console.log("das");
        bullets.push(
            new Bullet(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)),
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)),
                "enemyBullet",
                20,
                2,
                1
            ),
            new Bullet(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)) - Math.PI / 20,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)) - Math.PI / 20,
                "enemyBullet",
                20,
                2,
                1
            ),
            new Bullet(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)) + Math.PI / 20,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2, player.x + player.width / 2, player.y + player.height / 2)) + Math.PI / 20,
                "enemyBullet",
                20,
                2,
                1
            )
        );
        //console.log(bullets.length);
    }
    leftShot() {
        //console.log("das");
        bullets.push(
            new Bullet(this.x - this.width / 20 * 8, this.y + this.height / 4,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)),
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)),
                "enemyBullet",
                20,
                2,
                1
            ),
            new Bullet(this.x - this.width / 20 * 8, this.y + this.height / 4,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)) - Math.PI / 20,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)) - Math.PI / 20,
                "enemyBullet",
                20,
                2,
                1
            ),
            new Bullet(this.x - this.width / 20 * 8, this.y + this.height / 4,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)) + Math.PI / 20,
                (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)) + Math.PI / 20,
                "enemyBullet",
                20,
                2,
                1
            )
        );
        //console.log(bullets.length);
    }
    draw() {
        if (this.spawned) {

            this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
            this.y = Math.sin(this.angle) * this.h + canvas.height / 2;


            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle + Math.PI / 2);
            ctx.translate(-this.x, -this.y);

            if (this.lazerPhase) {
                let lazerTHICCness = 175;
                let lazerLenght = this.h - planet.diameter / 2 + 10;
                context.drawImage(lazerBodyImage, this.x - lazerTHICCness / 2, this.y, lazerTHICCness, lazerLenght);
                context.drawImage(lazerDustImages[this.lazerFrame], this.x - lazerTHICCness / 2 - 30, this.y + lazerLenght - 100, lazerTHICCness + 60, 100)
            }

            context.fillStyle = "yellow";
            context.drawImage(bossImages[this.phase][this.frame], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

            this.drawBossBar();

            ctx.restore();
        }
        context.fillStyle = 'red';
        //context.fillRect(this.x - this.width / 20 * 8, this.y + this.height / 4, 20, 20);
        let x = this.x + this.width / 30 * 11.5
        let y = this.y + this.height / 4 + Math.cos(this.angle) * this.height / 2;
        context.fillRect(x, y, 20, 20);

    }
    drawBossBar() {
        //this.x - this.width / 3, this.y - this.height / 3, this.width / 1.5, 30
        ctx.fillStyle = "#555c";
        ctx.fillRect(this.x - this.width / 3 - 5, this.y - this.height / 1.75 - 5, this.width / 1.5 + 10, 50);

        ctx.fillStyle = "red";
        ctx.fillRect(this.x - this.width / 3, this.y - this.height / 1.75, this.width / 1.5, 40);

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - this.width / 3, this.y - this.height / 1.75, this.width / 1.5 * (this.hp / this.defHP), 40);
    }
}