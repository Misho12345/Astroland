resizePage();

function init() {
    if (dead) gameOverMenu.style.display = "block";
    else if (shop) shopMenu.style.display = "block";
    else if (paused) pauseMenu.style.display = "block";
    else {
        if (shopMenu.style.display != "none")
            shopMenu.style.display = "none";

        if (pauseMenu.style.display != "none")
            pauseMenu.style.display = "none";

        Update();
    }

    ctx.globalAlpha = 1;
    ctxUI.globalAlpha = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxUI.clearRect(0, 0, canvas.width, canvas.height);

    Draw();

    setTimeout(init, 10);
}


window.addEventListener("keydown", e => {
    isKeyPressed[e.keyCode] = 1;

    if (!dead && (e.keyCode == 27 || e.keyCode == 80)) {
        if (shop) shop = false;
        else {
            paused = !paused;
            if (paused) {
                buildings.forEach(building => {
                    if (building.audio)
                        building.audio.pause();
                });
            } else {
                buildings.forEach(building => {
                    if (building.audio)
                        building.audio.play();
                });
            }            
        }
    }

    if (e.keyCode == 83 && !dead && !rocket && !paused) {
        shop = !shop;
        if (shop) {
            changeShopItems(0);
            items.scrollTop = 0;

            buildings.forEach(building => {
                if (building.audio)
                    building.audio.pause();
            });
        } else buildings.forEach(building => {
            if (building.audio)
                building.audio.play();
        });
    }
});

window.addEventListener("keyup", e => {
    isKeyPressed[e.keyCode] = 0;
});

canvasUI.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY - planet.diameter / 2 - 250;
});

window.addEventListener("mousedown", () => isMousePressed = 1);

window.addEventListener("mouseup", () => isMousePressed = 0);

video.addEventListener('ended', () => {
    if (rocket) location.href = '../index.html';
});
