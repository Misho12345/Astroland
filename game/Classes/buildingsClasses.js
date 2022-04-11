class Building {
    constructor(angle, width, height) {
        this.defA = angle;
        this.angle;

        this.width = width;
        this.height = height;

        this.frame = 0;
        this.maxHp;
        this.hp;

        this.x, this.y;
        this.h = planet.diameter / 2 + this.height / 4;

        this.idx;
        this.audio, this.audio_volume;
    }

    draw() {
        this.angle = this.defA + planet.angle + Math.PI / 2;
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (this.idx > 0) this.frame += 0.1;
        if (!shop && !paused && player && buildingsTypes[this.idx].cps > 0) player.coins += buildingsTypes[this.idx].cps / 100;

        if (buildingsTypes[this.idx].name != "rocket") {
            ctx.fillStyle = "#555c";
            ctx.fillRect(this.x + this.width / 4 - 5, this.y - 85, this.width / 2 + 10, 50);

            ctx.fillStyle = "red";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2, 40);

            ctx.fillStyle = "lime";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2 * (this.hp / this.maxHp), 40);
        }

        let id = buildingsTypes[this.idx].name + (buildingsTypes[this.idx].name == "rocket" ? "ship" : "") + Math.floor(this.frame) % 3;
        ctx.drawImage(document.getElementById(id), this.x, this.y, this.width, this.height);

        ctx.restore();

        if (this.audio) {
            if (this.audio.currentTime == 0)
                this.audio.play();

            this.audio_volume = 1 - (distance(
                this.x + this.width / 2,
                this.y + this.height / 2,
                player.x + player.width / 2,
                player.y + player.height / 2)) / (planet.diameter / 2);

            if (this.audio_volume > 1) this.audio_volume = 1;
            else if (this.audio_volume < 0) this.audio_volume = 0;

            this.audio.volume = this.audio_volume;
        }
    }
}

buildingsClasses.push(
    class Station extends Building {
        constructor(angle, width, height) {
            super(angle, width, height);
            this.idx = 0;
            if (buildingsTypes[this.idx].audio_src) this.audio = new Audio(buildingsTypes[this.idx].audio_src);
            this.maxHp = buildingsTypes[this.idx].hp;
            this.hp = this.maxHp;
        }
    },
    class Drill1 extends Building {
        constructor(angle, width, height) {
            super(angle, width, height);
            this.idx = 1;
            if (buildingsTypes[this.idx].audio_src) this.audio = new Audio(buildingsTypes[this.idx].audio_src);
            this.maxHp = buildingsTypes[this.idx].hp;
            this.hp = this.maxHp;
        }
    },
    class Drill2 extends Building {
        constructor(angle, width, height) {
            super(angle, width, height);
            this.idx = 2;
            if (buildingsTypes[this.idx].audio_src) this.audio = new Audio(buildingsTypes[this.idx].audio_src);
            this.maxHp = buildingsTypes[this.idx].hp;
            this.hp = this.maxHp;
        }
    },
    class Drill3 extends Building {
        constructor(angle, width, height) {
            super(angle, width, height);
            this.idx = 3;
            if (buildingsTypes[this.idx].audio_src) this.audio = new Audio(buildingsTypes[this.idx].audio_src);
            this.maxHp = buildingsTypes[this.idx].hp;
            this.hp = this.maxHp;
        }
    },
    class Rocket extends Building {
        constructor(angle, width, height) {
            super(angle, width, height);
            this.idx = 4;

            if (buildingsTypes[this.idx].audio_src) {
                this.audio = new Audio(buildingsTypes[this.idx].audio_src);
                this.audio.addEventListener("ended", () => this.audio.currentTime = 0)
            }

            this.maxHp = buildingsTypes[this.idx].hp;
            this.hp = this.maxHp;
        }
    }
);