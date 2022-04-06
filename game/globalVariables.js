let canvas = document.getElementById("canvas");
let canvasUI = document.getElementById("canvasUI");

let mouseX = 0, mouseY = 0, isMousePressed = 0;

const ctx = canvas.getContext("2d");
const context = canvas.getContext("2d");

const ctxUI = canvasUI.getContext("2d");
const contextUI = canvasUI.getContext("2d");

let bullets = [], enemyClasses = [], enemies = [];
let buildings = [];

let paused = false, pausing = false;
let dead = false;

let rocket;
let rocketSpeed = 0;

let isKeyPressed = [];
for (let i = 0; i < 256; isKeyPressed[i++] = 0);

let shopMenu = document.getElementById("shop-menu");
let gameOverMenu = document.getElementById("game-over-menu");
let video = document.getElementById("endScreen");

let buildingsButton = document.getElementById("buildings-button");
let weaponsButton = document.getElementById("weapons-button");

let handleBuildingsButtonMouseover = () => buildingsButton.style.backgroundColor = "var(--not-checked-hover-background-color)";
let handleBuildingsButtonMouseout = () => buildingsButton.style.backgroundColor = "var(--not-checked-background-color)";

let handleWeaponsButtonMouseover = () => weaponsButton.style.backgroundColor = "var(--not-checked-hover-background-color)";
let handleWeaponsButtonMouseout = () => weaponsButton.style.backgroundColor = "var(--not-checked-background-color)";

let items = document.getElementById("items");

let buildingsTypes = [
    {
        name: "Station",
        price: 50,
        url: "url(./game/images/buildings/house/house.png)",
        hp: 30,
        cps: 0,
        tip: "use as shield"
    },
    {
        name: "Drill",
        price: 150,
        url: "url(./game/images/buildings/drill/drill0.png)",
        hp: 30,
        cps: 2,
        tip: "gives you more and more coins"
    },
    {
        name: "Rocket",
        price: 500,
        url: "url(./game/images/buildings/rocket/rocket.png)",
        hp: 0,
        cps: 0,
        tip: "escape from the planet and win the game"
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
        bullets: 1,
        bulletSpeed: 10,
        bulletColor: "red",
        radius: 5,
        accuracy: 0
    },
    {
        name: "shotgun",
        price: 50,
        url: "url(./game/images/shotgun/shotgun1.png)",
        dmg: 1,
        fireSpeed: 100,
        dps: "1 ~ 8",
        bullets: 8,
        bulletSpeed: 7.5,
        bulletColor: "green",
        radius: 3,
        accuracy: 0
    },
    {
        name: "uzi",
        price: 150,
        url: "url(./game/images/uzi/uzi1.png)",
        dmg: 1,
        fireSpeed: 8,
        dps: 12.5,
        bullets: 1,
        bulletSpeed: 10,
        bulletColor: "uziBullet",
        radius: 0,
        accuracy: 0
    },
    {
        name: "riffle",
        price: 250,
        url: "url(./game/images/riffle/riffle1.png)",
        dmg: 7.5,
        fireSpeed: 20,
        dps: 37.5,
        bullets: 1,
        bulletSpeed: 10,
        bulletColor: "red",
        radius: 0,
        accuracy: 0
    }
];

let sopoldeath = [
    document.getElementById("sopoldeath1"),
    document.getElementById("sopoldeath2"),
    document.getElementById("sopoldeath3"),
    document.getElementById("sopoldeath4")];

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

let heart1Image = document.getElementById("heart1");
let heart2Image = document.getElementById("heart2");
let dead1Image = document.getElementById("dead1");
let dead2Image = document.getElementById("dead2");

let pistol1Image = document.getElementById("pistol1");
let pistol1LImage = document.getElementById("pistol1L");
let pistol2Image = document.getElementById("pistol2");
let pistol2LImage = document.getElementById("pistol2L");

let riffle1Image = document.getElementById("riffle1");
let riffle1LImage = document.getElementById("riffle1L");
let riffle2Image = document.getElementById("riffle2");
let riffle2LImage = document.getElementById("riffle2L");

let shotgun1Image = document.getElementById("shotgun1");
let shotgun1LImage = document.getElementById("shotgun1L");
let shotgun2Image = document.getElementById("shotgun2");
let shotgun2LImage = document.getElementById("shotgun2L");

let uzi1Image = document.getElementById("uzi1");
let uzi1LImage = document.getElementById("uzi1L");
let uzi2Image = document.getElementById("uzi2");
let uzi2LImage = document.getElementById("uzi2L");
