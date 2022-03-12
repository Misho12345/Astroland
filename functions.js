function angleCalc(cX, cY, x, y) {
    let angle = Math.atan2(y - cY, x - cX);
    if (y >= cY) return angle;
    else return Math.PI * 2 + angle;
}
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

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


let bigEnemyImages = [
    document.getElementById("bigEnemy1"),
    document.getElementById("bigEnemy2"),
    document.getElementById("bigEnemy3")];

function randomEnemyIndex() {
    let randomEnemyIndexNumber = randomInteger(100);

    if (randomEnemyIndexNumber < 70) return 0;
    if (randomEnemyIndexNumber < 90) return 1;
    return 2;
}

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

let rifle1Image = document.getElementById("rifle1");
let rifle1LImage = document.getElementById("rifle1L");
let rifle2Image = document.getElementById("rifle2");
let rifle2LImage = document.getElementById("rifle2L");

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
