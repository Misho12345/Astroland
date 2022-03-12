let planet = new Planet(canvas.width * 2);
let player = new Player(100, 200);

let updates = 0;

let cap = Math.PI / 20;
let speed = Math.PI / 720;

function Update() {
    window.onresize = resizeCanvas();
    player.update();

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
        else if (isKeyPressed[37] || isKeyPressed[65]) {
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
        enemies.push(new (enemyClasses[randomEnemyIndex()])(randomInteger(300) + planet.diameter / 2, randomInteger(Math.Pi * 2 * 100) / 100));
    }

    enemies.forEach(enemy => enemy.update());
    bullets.forEach(bullet => {
        if (bullet == undefined) {
            bullet = bullets[bullets.length - 1];
            bullets.pop();
        }
        else bullet.update();
    });

    if ((isKeyPressed[38] || isKeyPressed[87]) && !player.up) {
        player.gravitySpeed = -15;
        player.up = true;
        player.h++;
    }
}

function Draw() {
    ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height);

    if (!isKeyPressed[77]) ctx.translate(0, planet.diameter - canvas.width + 250);
    else {
        ctx.scale(0.2, 0.2);
        ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2);
    }

    planet.draw();

    enemies.forEach(enemy => enemy.draw());
    bullets.forEach(bullet => bullet.draw());

    player.draw();
    player.showCoins();
}