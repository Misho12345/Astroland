let canvas = document.getElementById("canvas");
let canvasUI = document.getElementById("canvasUI");

let mouseX = 0, mouseY = 0, isMousePressed = 0;

const ctx = canvas.getContext("2d");
const context = canvas.getContext("2d");

const ctxUI = canvasUI.getContext("2d");
const contextUI = canvasUI.getContext("2d");

let bullets = [], enemyClasses = [], enemies = [];
let buildings = [];

let shop = false;
let paused = false;
let dead = false;

let rocket;
let rocketSpeed = 0;

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

let shopMenu = document.getElementById("shop-menu");
let pauseMenu = document.getElementById("pause-menu");
let gameOverMenu = document.getElementById("game-over-menu");
let video = document.getElementById("endScreen");

let items = document.getElementById("items");

let buildingsTypes = [
    {
        name: "station",
        price: 50,
        url: "url(./pics/station.png)",
        hp: 50,
        tip: "use as a shield",
        width: 512,
        height: 256
    },
    {
        name: "drill-lv1",
        price: 150,
        url: "url(./pics/drill-lv10.png)",
        hp: 20,
        cps: 1,
        tip: "gives you more and more coins",
        animation: true,
        width: 256,
        height: 256,
        audio_src: "./game/Audio/drill.mp3"
    },
    {
        name: "drill-lv2",
        price: 300,
        url: "url(./pics/drill-lv20.png)",
        hp: 25,
        cps: 3,
        tip: "gives you more and more coins",
        animation: true,
        width: 256,
        height: 256,
        audio_src: "./game/Audio/drill.mp3"
    },
    {
        name: "drill-lv3",
        price: 500,
        url: "url(./pics/drill-lv30.png)",
        hp: 30,
        cps: 5,
        tip: "gives you more and more coins",
        animation: true,
        width: 256,
        height: 256,
        audio_src: "./game/Audio/drill.mp3"
    },
    {
        name: "turet",
        price: 1000,
        url: "url(./pics/turet.png)",
        hp: 50,
        tip: "use to protect other buildings like drills",
        width: 384,
        height: 416,

        turet: {
            parent_angle: undefined,
            width: 384,
            height: 384,
            dmg: 3,
            fireSpeed: 100,
            dps: 3,
            bulletCount: 1,
            bulletSpeed: 15,
            bulletColor: "yellow",
            radius: 10,
            range: 750,
            audio_src: "./game/Audio/pistol.mp3",
            audio_volume: 1,

            gunTime: 0,
            angle: 0,
            target_idx: 0,
            x: 0,
            y: 0,

            shoot() {
                if (this.gunTime >= this.fireSpeed) {
                    let audio = new Audio(this.audio_src);
                    audio.play();
                    audio.volume = this.audio_volume;

                    for (let i = 0; i < this.bulletCount; i++)
                        bullets.push(new Bullet(
                            this.x + this.width / 2 + Math.cos(this.angle) * this.width / 2,
                            this.y + this.height / 2 + Math.sin(this.angle) * this.height / 2,
                            this.angle + this.parent_angle,
                            this.angle + this.parent_angle,
                            this.bulletColor,
                            this.radius,
                            this.bulletSpeed,
                            this.dmg
                        ));

                    this.gunTime = 0;
                    this.gunShot = true;
                }
            },

            getTarget() {
                let min_idx = -1;

                for (let i = 0; i < enemies.length; i++) {
                    let _distance = distance(enemies[i].x, enemies[i].y, this.x, this.y);

                    if (_distance <= this.range && (min_idx == -1 || _distance < enemies[min_idx]))
                        min_idx = i;
                }

                this.target_idx = min_idx;
            },

            update() {
                let target = enemies[this.target_idx];

                if (this.target_idx == -1 || !target || target.dead ||
                    distance(target.x + target.width / 2, target.y + target.height / 2, this.x + this.height / 2, this.y + this.width / 2) > this.range) {

                    if (target && target.dead) this.gunShot = false;
                    this.getTarget();
                }
                else this.shoot();

                if (this.gunTime > 10) this.gunShot = false;
                this.gunTime++;
            },

            draw(x, y) {
                let target = enemies[this.target_idx];

                if (this.x != x) this.x = x;
                if (this.y != y) this.y = y;

                if (target && !target.dead) {
                    this.angle = angleCalc(
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        target.x + target.width / 2,
                        target.y + target.height / 2);
                }

                ctx.save();

                context.translate(this.x + this.width / 2, this.y + this.height / 2);
                context.rotate(this.angle);
                context.translate(-this.x - this.width / 2, -this.y - this.height / 2);

                ctx.drawImage(document.getElementById("turet_head" + (this.gunShot ? 1 : 0)), this.x, this.y, this.width, this.height);

                ctx.restore();
            }
        }
    },
    {
        name: "rocket",
        price: 5000,
        url: "url(./pics/rocket.png)",
        animation: true,
        indestructible: true,
        tip: "escape from the planet and win the game",
        width: 256,
        height: 512
    }
];

let weapons = [
    {
        name: "pistol",
        price: 0,
        url: "url(./pics/pistol1.png)",
        dmg: 3,
        fireSpeed: 75,
        dps: 4,
        bulletCount: 1,
        bulletSpeed: 10,
        bulletColor: "red",
        radius: 5,
        inaccuracy: 3,
        width: 50,
        height: 50,
        images: {
            L_normal: document.getElementById("pistol1L"),
            R_normal: document.getElementById("pistol1"),
            L_firing: document.getElementById("pistol2L"),
            R_firing: document.getElementById("pistol2")
        },
        audio_src: "./game/Audio/pistol.mp3",
        audio_volume: 1
    },
    {
        name: "shotgun",
        price: 50,
        url: "url(./pics/shotgun1.png)",
        dmg: 1,
        fireSpeed: 100,
        dps: "1 - 8",
        bulletCount: 8,
        bulletSpeed: 7.5,
        bulletColor: "green",
        radius: 3,
        inaccuracy: 20,
        width: 100,
        height: 50,
        images: {
            L_normal: document.getElementById("shotgun1L"),
            R_normal: document.getElementById("shotgun1"),
            L_firing: document.getElementById("shotgun2L"),
            R_firing: document.getElementById("shotgun2")
        },
        audio_src: "./game/Audio/shotgun.mp3",
        audio_volume: 0.3
    },
    {
        name: "uzi",
        price: 150,
        url: "url(./pics/uzi1.png)",
        dmg: 1,
        fireSpeed: 8,
        dps: 12.5,
        bulletCount: 1,
        bulletSpeed: 10,
        bulletColor: "uziBullet",
        radius: 5,
        inaccuracy: 10,
        width: 75,
        height: 50,
        images: {
            L_normal: document.getElementById("uzi1L"),
            R_normal: document.getElementById("uzi1"),
            L_firing: document.getElementById("uzi2L"),
            R_firing: document.getElementById("uzi2")
        },
        audio_src: "./game/Audio/uzi.mp3",
        audio_volume: 0.2
    },
    {
        name: "rifle",
        price: 250,
        url: "url(./pics/rifle1.png)",
        dmg: 7.5,
        fireSpeed: 20,
        dps: 37.5,
        bulletCount: 1,
        bulletSpeed: 10,
        bulletColor: "red",
        radius: 5,
        inaccuracy: 0,
        width: 130,
        height: 50,
        images: {
            L_normal: document.getElementById("rifle1L"),
            R_normal: document.getElementById("rifle1"),
            L_firing: document.getElementById("rifle2L"),
            R_firing: document.getElementById("rifle2")
        },
        audio_src: "./game/Audio/rifle.mp3",
        audio_volume: 0.2
    }
];

let utilities = [
    {
        name: "HP",
        price: 5    ,
        url: "url(./pics/heart.png)",
        property: "+2 <abbr title='Health points (a heart)'>HP</abbr>",
        tip: "you can buy it only when you're not at full health",
        func: function () {
            if (player.hp < player.maxHp - 1) {
                player.hp += 2;
                return true;
            }

            return false;
        }
    }
];

let enemyDeath = [
    document.getElementById("enemyDeath1"),
    document.getElementById("enemyDeath2"),
    document.getElementById("enemyDeath3"),
    document.getElementById("enemyDeath4")];

let green_blobImages = [
    document.getElementById("green_blob1"),
    document.getElementById("green_blob2"),
    document.getElementById("green_blob3"),
    document.getElementById("green_blob4")];

let bigBrainEnemyImages = [
    document.getElementById("bigBrainEnemy1"),
    document.getElementById("bigBrainEnemy2"),
    document.getElementById("bigBrainEnemy3"),
    document.getElementById("bigBrainEnemy4")];

let enemyBullet = document.getElementById("enemyBullet");

let uziBullet = document.getElementById("uziBullet");

let bigEnemyImages = [
    document.getElementById("bigEnemy1"),
    document.getElementById("bigEnemy2"),
    document.getElementById("bigEnemy3"),
    document.getElementById("bigEnemy2")];

let rocketImages = [
    document.getElementById("rocket1"),
    document.getElementById("rocket2"),
    document.getElementById("rocket3")];

let bossImages = [];
for (let i = 0; i < 2; i++)
    bossImages[i] = [];

for (let i = 0; i < 6; i++)
    bossImages[0].push(document.getElementById("Bossp1f" + i));

bossImages[0] = [
    document.getElementById("Bossp1f1"),
    document.getElementById("Bossp1f2"),
    document.getElementById("Bossp1f3"),
    document.getElementById("Bossp1f4"),
    document.getElementById("Bossp1f5"),
    document.getElementById("Bossp1f6")
];

let heart1Image = document.getElementById("heart1");
let heart2Image = document.getElementById("heart2");
let dead1Image = document.getElementById("dead1");
let dead2Image = document.getElementById("dead2");

let lazerBodyImage = document.getElementById("lazerBodyImage");

let lazerDustImages = [
    document.getElementById("lazerDust1"),
    document.getElementById("lazerDust2"),
    document.getElementById("lazerDust3"),
    document.getElementById("lazerDust4")
];

