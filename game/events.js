resizePage();

function requestPurchasingABuilding(type, price) {
    switch (type) {
        case "house":
            if (player.coins >= price) {
                buildings.push(new House(-planet.angle + Math.PI + player.angle - player.defA, 512, 256));
                player.coins -= price;
            }
            break;

        case "drill":
            if (player.coins >= price) {
                buildings.push(new Drill(-planet.angle + Math.PI + player.angle - player.defA, 256, 256));
                player.coins -= price;
            }
            break;

        case "rocket":
            if (player.coins >= price) {
                rocket = new Rocket(-planet.angle + Math.PI + player.angle - player.defA, 256, 512);
                player.coins -= price;

                bullets = [];
                gameEnd = true;
                player = null;

                enemies.forEach(enemy => {
                    enemy.deathTimer = 39;
                    enemy.hp = 0;
                });
            }
            break;

        default: console.log("E R R O R"); break;
    }

    paused = false;
}

function equipWeapon(idx) {
    player.weaponIdx = idx;

    changeShopItems(1);
    changeShopItems(0);
}

function requestPurchasingAWeapon(idx) {
    if (player.coins < weapons[idx].price) return;
    
    player.coins -= weapons[idx].price;
    weapons[idx].price = 0;
    equipWeapon(idx);
}


function init() {
    if (!paused && !dead) {
        if (shopMenu.style.display != "none") {
            shopMenu.style.display = "none";
        }

        Update();

        ctx.globalAlpha = 1;
        ctxUI.globalAlpha = 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxUI.clearRect(0, 0, canvas.width, canvas.height);

        Draw();
    }
    else if (dead) gameOverMenu.style.display = "block";
    else if (paused) shopMenu.style.display = "block";

    setTimeout(init, 10);
}


window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;

    if (e.keyCode == 27 || e.keyCode == 80) {
        if (!pausing) paused = !paused;
        pausing = true;
    }

    if (e.keyCode == 72 && player.hp < 20 && player.coins >= 5) {
        player.coins -= 5;
        player.hp++;
    }
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
    pausing = false;
});

canvasUI.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY - planet.diameter / 2 - 250;
});

window.addEventListener("mousedown", e => isMousePressed = 1);

window.addEventListener("mouseup", e => isMousePressed = 0);

video.addEventListener('ended', () => {
    if (rocket) location.href = './mainPage.html';
});
