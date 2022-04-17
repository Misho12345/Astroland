let planet = new Planet(canvas.width * 2);
let player = new Player(100, 200);
let boss = new Boss();

let updates = 0;

let enemyTimer = 800, minEnemyTimer = 300;

let cap = Math.PI / 20;
let speed = Math.PI / 720;

buildings.push(new Building(-planet.angle + Math.PI + player.angle - player.defA, 0));

function Update() {
    updates++;

    window.onresize = resizePage();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();

        if (!enemies[i]) enemies.splice(i, 1);

        if (enemies[i].deathTimer <= 0 && enemies[i].deathTimer != -2) {
            //player.coins += enemies[i].coinsPer;    
            enemies.splice(i, 1);
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

    if (!player) return;
    boss.update();

    if (player.hp <= 0 || buildings.length == 0) {
        dead = true;

        buildings.forEach(building => {
            if (building.audio)
                building.audio.pause();
        });
    }

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

    if ((isKeyPressed[38] || isKeyPressed[87] || isKeyPressed[32]) && !player.up) {
        player.gravitySpeed = -15;
        player.up = true;
        player.h++;
    }

    if (updates % enemyTimer == 0 && !boss.spawned) {
        if (enemyTimer < minEnemyTimer) {
            enemyTimer = minEnemyTimer;
        }
        enemies.push(new (enemyClasses[randomEnemyIndex()])(randomInteger(300) + planet.diameter / 2 + 300, randomInteger(Math.PI * 2 * 100) / 100));
        // updates=999;
    }

    for (let i = 0; i < bullets.length; i++) {
        if (this.collided || bullets[i].x < -10000 || bullets[i].y < -10000 || bullets[i].x > 10000 || bullets[i].y > 10000) {
            bullets.splice(i, 1);
            i--;
        }
        else bullets[i].update();

        if (bullets[i] && bullets[i].color == "bigBrainBullet" && bullets[i].fuel < 0) {
            bullets.splice(i, 1);
            i--;
        }
    };
}

function Draw() {
    ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height);

    if (!isKeyPressed[77]) ctx.translate(0, planet.diameter - canvas.width + 250);
    else {
        context.scale(0.2, 0.2);
        if (boss.spawned) {
            ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter);
        } else {
            ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2);
        }
    }

    buildings.forEach(building => {
        if (building.turet) {
            ctx.beginPath();
            ctx.arc(building.x + building.width / 2, building.y + building.height / 2, building.turet.range, 0, 2 * Math.PI);
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#0ff6';
            ctx.fillStyle = '#0ff1';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    });

    planet.draw();

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].hp <= 0 || buildings[i] == rocket) buildings.splice(i, 1);
        else buildings[i].draw();
    }

    enemies.forEach(enemy => {
        if (enemy) enemy.draw();
    });

    boss.draw();
    bullets.forEach(bullet => bullet.draw());

    if (player) {
        player.draw();
        player.showCoins();
    }

    if (rocket) rocket.draw();
}