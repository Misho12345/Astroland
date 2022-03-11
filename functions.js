function namiraneNaNeshtosiUgul(cX, cY, x, y) {
    let ugul = Math.atan2(y - cY, x - cX);
    if (y >= cY) {
        return ugul;
    } else {
        return Math.PI * 2 + ugul;
    }
}
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

let zelensopolImages = [document.getElementById("zelensopol1"),
                        document.getElementById("zelensopol2"),
                        document.getElementById("zelensopol3"),
                        document.getElementById("zelensopol4")];

let bigBrainEnemyImages = [document.getElementById("bigBrainEnemy1"),
                           document.getElementById("bigBrainEnemy2"),
                           document.getElementById("bigBrainEnemy3"),
                           document.getElementById("bigBrainEnemy4")];

let enemyBullet = document.getElementById("enemyBullet");


let THICCenemyImages = [document.getElementById("THICCenemy1"),
                        document.getElementById("THICCenemy2"),
                        document.getElementById("THICCenemy3")];


function randomEnemyIndex() {
    let randomEnemyIndexNumber = randomInteger(100);
    if (randomEnemyIndexNumber < 70) {
        randomEnemyIndexNumber = 0;
    } else if (randomEnemyIndexNumber > 70 && randomEnemyIndexNumber < 90) {
        randomEnemyIndexNumber = 1;
    } else if (randomEnemyIndexNumber > 90) {
        randomEnemyIndexNumber = 2;
    }

    //return randomEnemyIndexNumber;
    return 1;
}

let rocketImages = [document.getElementById("rocket1"),
                    document.getElementById("rocket2"),
                    document.getElementById("rocket3")];