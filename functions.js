function angleCalc(cX, cY, x, y) {
    let angle = Math.atan2(y - cY, x - cX);
    if (y >= cY) return angle;
    else return Math.PI * 2 + angle;
}
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

let green_blobImages = [document.getElementById("green_blob1"),
                        document.getElementById("green_blob2"),
                        document.getElementById("green_blob3"),
                        document.getElementById("green_blob4")];

let bigBrainEnemyImages = [document.getElementById("bigBrainEnemy1"),
                           document.getElementById("bigBrainEnemy2"),
                           document.getElementById("bigBrainEnemy3"),
                           document.getElementById("bigBrainEnemy4")];

let enemyBullet = document.getElementById("enemyBullet");


let bigEnemyImages = [document.getElementById("bigEnemy1"),
                      document.getElementById("bigEnemy2"),
                      document.getElementById("bigEnemy3")];

function randomEnemyIndex() {
    let randomEnemyIndexNumber = randomInteger(100);
    if (randomEnemyIndexNumber < 70) {
        randomEnemyIndexNumber = 0;
    } else if (randomEnemyIndexNumber > 70 && randomEnemyIndexNumber < 90) {
        randomEnemyIndexNumber = 1;
    } else if (randomEnemyIndexNumber > 90) {
        randomEnemyIndexNumber = 2;
    }

    return randomEnemyIndexNumber;
    //return 1;
}

let rocketImages = [document.getElementById("rocket1"),
                    document.getElementById("rocket2"),
    document.getElementById("rocket3")];


let heart1Image = document.getElementById("heart1");
let heart2Image = document.getElementById("heart2");
let ded1Image = document.getElementById("ded1");
let ded2Image = document.getElementById("ded2");