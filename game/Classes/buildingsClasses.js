class Building {
    constructor(angle, width, height) {
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