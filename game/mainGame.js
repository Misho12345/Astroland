let planet = new Planet(canvas.width * 2);
let player = new Player(100, 200);

let updates = 0;

let cap = Math.PI / 20;
let speed = Math.PI / 720;

buildings.push(new House(-planet.angle + Math.PI + player.angle - player.defA, 512, 256));

function Update() {
    if (player && (player.hp <= 0 || buildings.length == 0)) {
        dead = true;
    }

    window.onresize = resizePage();

    if (player) {
        player.update();
        if ((isKeyPressed[39] || isKeyPressed[68]) && (isKeyPressed[37] || isKeyPressed[65])) player.state = 0;
        else {
            if (isKeyPressed[39] || isKeyPressed[68]) {
                if (player.angle >= player.defA + cap) {
                    planet.angle -= speed;
                    player.defA = player.angle - cap;
                }
                else player.angle += speed;

                player.dir = 1;

                if (player.state == 0) player.state = 1;
            }
            else if (isKeyPressed[37] || isKeyPressed[65]) {
                if (player.angle <= player.defA - cap) {
                    planet.angle += speed;
                    player.defA = player.angle + cap;
                }
                else player.angle -= speed;

                player.dir = 0;

                if (player.state == 0) player.state = 1;
            }
            else if (!isKeyPressed[39] && !isKeyPressed[68]) player.state = 0;
        }

        if ((isKeyPressed[38] || isKeyPressed[87]) && !player.up) {
            player.gravitySpeed = -15;
            player.up = true;
            player.h++;
        }
    }

    updates++;
    if (updates % 333 == 0) {
        enemies.push(new (enemyClasses[randomEnemyIndex()])(randomInteger(300) + planet.diameter / 2 + 300, randomInteger(Math.PI * 2 * 100) / 100));
        // updates=999;
    }

    enemies.forEach(enemy => {
        if (enemy) enemy.update();
    });

    for (let i = 0; i < bullets.length; i++) {
        if (!bullets[i] || (bullets[i].x < -10000 || bullets[i].y < -10000 || bullets[i].x > 10000 || bullets[i].y > 10000)) {
            bullets.splice(i, 1);
        }
        else bullets[i].update();
    };

    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i]) {
            enemies.splice(i, 1);
        }

        if (enemies[i].deathTimer <= 0 && enemies[i].deathTimer != -2) {
            //player.coins += enemies[i].coinsPer;    
            enemies.splice(i, 1);
            i--;
        }

        if (i + 1 < enemies.lenght && !enemies[i + 1]) {
            enemies.splice(i + 1, 1);
        }
        if (i - 1 > 0 && !enemies[i - 1]) {
            enemies.splice(i - 1, 1);
        }
    }

    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i] && bullets[i].color == "bigBrainBullet" && bullets[i].fiel < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }

    if (rocket) {
        rocketSpeed += 0.01;
        rocket.h += rocketSpeed;

        if (rocket.h >= 1000 + planet.diameter / 2) {
            canvas.style.display = "none";
            canvasUI.style.display = "none";
            video.play();
            video.style.zoom = 0.2;
        }
    }
}

function Draw() {
    ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height);

    if (!isKeyPressed[77]) ctx.translate(0, planet.diameter - canvas.width + 250);
    else {
        context.scale(0.2, 0.2);
        ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2);
    }

    planet.draw();

    buildings.forEach(build => build.draw());

    enemies.forEach(enemy => {
        if (enemy) enemy.draw();
    });

    bullets.forEach(bullet => bullet.draw());

    if (player) {
        player.draw();
        player.showCoins();
    }

    if (rocket) rocket.draw();
}