class Building {
    constructor(angle, idx) {
        this.defA = angle;

        this.buildingType = buildingsTypes[idx];

        this.maxHp = this.buildingType.hp;
        this.hp = this.maxHp;

        if (this.buildingType.audio_src) {
            this.audio = new Audio(this.buildingType.audio_src);
            this.audio.addEventListener("ended", () => this.audio.currentTime = 0)
        }

        this.turet = this.buildingType.turet;

        this.width = this.buildingType.width;
        this.height = this.buildingType.height;

        this.frame = 0;

        this.h = planet.diameter / 2 + this.height / 4;
    }

    draw() {
        this.angle = this.defA + planet.angle + Math.PI / 2;
        this.x = Math.cos(this.angle) * this.h + canvas.width / 2 - this.width / 2;
        this.y = Math.sin(this.angle) * this.h + canvas.height / 2 - this.height / 2;

        if (this.buildingType.animation) this.frame += 0.1;
        if (!shop && !paused && player && this.buildingType.cps > 0) player.coins += this.buildingType.cps / 100;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

        if (!this.buildingType.indestructible) {
            ctx.fillStyle = "#555c";
            ctx.fillRect(this.x + this.width / 4 - 5, this.y - 85, this.width / 2 + 10, 50);

            ctx.fillStyle = "red";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2, 40);

            ctx.fillStyle = "lime";
            ctx.fillRect(this.x + this.width / 4, this.y - 80, this.width / 2 * (this.hp / this.maxHp), 40);
        }

        let id = this.buildingType.name + (this.buildingType.name == "rocket" ? "ship" : "") + Math.floor(this.frame) % 3;
        ctx.drawImage(document.getElementById(id), this.x, this.y, this.width, this.height);

        if (this.turet) {
            this.turet.parent_angle = this.angle + Math.PI / 2;
            if (!shop && !paused) this.turet.update();
            this.turet.draw(this.x, this.y);
        }

        ctx.restore();

        if (this.audio && player) {
            if (this.audio.currentTime == 0)
                this.audio.play();

            this.audio_volume = 1 - (distance(
                this.x + this.width / 2,
                this.y + this.height / 2,
                player.x + player.width / 2,
                player.y + player.height / 2)) / (planet.diameter / 3);

            if (this.audio_volume > 1) this.audio_volume = 1;
            else if (this.audio_volume < 0) this.audio_volume = 0;

            this.audio.volume = this.audio_volume;
            console.log(this.x)
        }
    }
}
