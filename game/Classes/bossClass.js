class Boss {
    constructor() {
        this.spawned = false;
        this.width = 800
        this.height = 700;
        this.hp;
        this.x, this.y, this.angle, this.h;
        this.frame, this.phase;
        this.updates;
        this.lazerPhase;
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
            this.lazerPhase = false
        }
        if (this.spawned) {
            this.angle = planet.angle - this.defA;
            this.updates++;
            if (this.updates % 33 == 0) {
                //this.frame++;
            }
            console.log("no");
            if (this.lazerPhase) {
                this.lazerShot();
            }
            if (this.updates % 200 == 0) {
                this.shot();
            }
        }
    }
    lazerShot() {

    }
    shot() {
        if (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) > 0
            && angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) < Math.PI / 2) {
            this.lazerPhase = false;
            this.rightShot();
        } else if (angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) > Math.PI / 4 * 3
            && angleCalc(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2) < Math.PI) {
            this.lazerPhase = false;
            this.leftShot();
        } else {
            this.lazerPhase = true;
        }
    }
    rightShot() {
        console.log("das");
        bullets.push(new Bullet(this.x + this.width / 30 * 11.5, this.y + this.height / 4,
            (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)),
            (angleCalc(this.x + this.width / 30 * 11.5, this.y + this.height / 4, player.x + player.width / 2, player.y + player.height / 2)),
            'enemyBullet',
            30,
            2,
            1,
            bullets.length
        ));
        console.log(bullets.length);
    }
    leftShot() {

    }
    draw() {
        if (this.spawned) {
            this.x = Math.cos(this.angle) * this.h + canvas.width / 2;
            this.y = Math.sin(this.angle) * this.h + canvas.height / 2;


            ctx.save();

            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle + Math.PI / 2);
            ctx.translate(-this.x, -this.y);

            context.fillStyle = "yellow";
            context.drawImage(bossImages[this.phase][this.frame], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

            this.drawBossBar();



            ctx.restore();


        }
    }
    drawBossBar() {
        context.font = "50px Pixel Cyr";
        //context.fillStyle = 'red';
        context.strokeStyle = '#D81002';
        context.fillRect(this.x - this.width / 2 + this.width / 6, this.y - this.height / 2 - this.height / 6, this.width / 6 * 4, 30);
    }


}