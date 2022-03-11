let planet = new Planet(canvas.width * 2);
let player = new Player(100, 200);

let updates = 0;

let cap = Math.PI / 20;
let speed = Math.PI / 720;

function Update() {
    window.onresize = resizeCanvas();

    if ((isKeyPressed[39] || isKeyPressed[68]) && (isKeyPressed[37] || isKeyPressed[65])) player.state = 0;
    else {
        if (isKeyPressed[39] || isKeyPressed[68]) {
            if (player.angle >= player.defA + cap) {
                planet.angle -= speed;
                player.defA = player.angle - cap;
            }
            else player.angle += speed;

            if (player.state == 0) {
                player.dir = 1;
                player.state = 1;
            }
        }

        if (isKeyPressed[37] || isKeyPressed[65]) {
            if (player.angle <= player.defA - cap) {
                planet.angle += speed;
                player.defA = player.angle + cap;
            }
            else player.angle -= speed;

            if (player.state == 0) {
                player.dir = 0;
                player.state = 1;
            }
        }
        else if (!isKeyPressed[39] && !isKeyPressed[68]) player.state = 0;
    }

    updates++;
    if (updates % 1000 == 0) {
        enemies.push(new enemyClasses[randomEnemyIndex()](randomInteger(canvas.width), randomInteger(canvas.height)));
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }

    if ((isKeyPressed[38] || isKeyPressed[87]) && !player.up) {
        player.gravitySpeed = -15;
        player.up = true;
        player.h++;
        console.log("amogus");
    }

}

function Draw() {
    ctx.drawImage(document.getElementById("fon"), 0, 0, canvas.width, canvas.height);

    if (!isKeyPressed[77]) ctx.translate(0, planet.diameter - canvas.width + 250);
    else {
        ctx.scale(0.2, 0.2);
        ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2);
    }

    planet.draw();
    

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }

    player.draw();
    player.showCoins();
}