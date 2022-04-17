function angleCalc(cX, cY, x, y) {
    let angle = Math.atan2(y - cY, x - cX);
    if (y >= cY) return angle;
    else return Math.PI * 2 + angle;
}
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    return (Bx <= Ax + Awidth &&
        Ax <= Bx + Bwidth &&
        By <= Ay + Aheight &&
        Ay <= By + Bheight)
}

function randomEnemyIndex() {
    let randomEnemyIndexNumber = randomInteger(100);

    if (randomEnemyIndexNumber < 60) return 0;
    if (randomEnemyIndexNumber < 80) return 1;
    return 2;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function resizePage() {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    canvas.width = winWidth;
    canvas.height = winHeight;

    canvasUI.width = winWidth;
    canvasUI.height = winHeight;
}

function requestPurchasingABuilding(idx) {
    if (player.coins < buildingsTypes[idx].price || (buildingsTypes[idx].name == "rocket" && boss.spawned)) return;

    player.coins -= buildingsTypes[idx].price;
    buildings.push(new Building(-planet.angle + Math.PI + player.angle - player.defA, idx));

    if (buildingsTypes[idx].name == "rocket") {
        rocket = buildings[buildings.length - 1];
        bullets = [];
        gameEnd = true;
        player = null;

        enemies.forEach(enemy => {
            enemy.deathTimer = 39;
            enemy.hp = 0;
        });
    }
    else buildingsTypes[idx].price = Math.round(0.11 * buildingsTypes[idx].price) * 10;

    changeShopItems(0);

    shop = false;
}

function equipWeapon(idx) {
    player.weaponIdx = idx;

    changeShopItems(1);
}

function requestPurchasingAWeapon(idx) {
    if (player.coins < weapons[idx].price) return;

    player.coins -= weapons[idx].price;
    weapons[idx].price = 0;
    equipWeapon(idx);
}

function requestPurchasingUtilities(idx) {
    if (player.coins < utilities[idx].price) return;

    if (utilities[idx].func()) {
        player.coins -= utilities[idx].price;

        utilities[idx].price++;
        changeShopItems(2);
    }
}
