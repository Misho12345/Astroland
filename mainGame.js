let planet = new Planet(canvas.width * 2);
let player = new Player(100, 200);

let updates = 0;
let buildingCooldown = 0;

let cap = Math.PI / 20;
let speed = Math.PI / 720;

function Update() {
    window.onresize = resizePage();
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

    updates++;
    if (updates % 1000 == 0) {
        enemies.push(new (enemyClasses[randomEnemyIndex()])(randomInteger(900) + planet.diameter / 2 + 300  , randomInteger(Math.PI * 2 * 100) / 100));
       // updates=999;
    }

    enemies.forEach(enemy => enemy.update());
    bullets.forEach(bullet => {
        if (bullet == undefined) {
            bullet = bullets[bullets.length - 1];
            bullets.pop();
        }
        else bullet.update();
        if (bullet.x < -10000 || bullet.y < -10000 || bullet.x > 10000 || bullet.y > 10000 ) {
            bullet = bullets[bullets.length - 1];
            bullets.pop();
        }
        
    });
    for (let i = 0; i < bullets.length;i++) {
        if (bullets[i].color == "bigBrainBullet" && bullets[i].fiel < 0) {
            console.log("banana");
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
            i--;
        }
    }

    if ((isKeyPressed[38] || isKeyPressed[87]) && !player.up) {
        player.gravitySpeed = -15;
        player.up = true;
        player.h++;
    }

    if (buildingCooldown < 1) {
        if (isKeyPressed[66]) {
            buildingCooldown = 50;
            buildings.push(new House(-planet.angle + Math.PI + player.angle - player.defA, 512, 256));
        }
        if (isKeyPressed[67]) {
            buildingCooldown = 50;
            buildings.push(new Drill(-planet.angle + Math.PI + player.angle - player.defA, 256, 256));
        }
        if (isKeyPressed[86]) {
            buildingCooldown = 50;
            buildings.push(new Rocket(-planet.angle + Math.PI + player.angle - player.defA, 256, 512));
        }
    } else buildingCooldown--;
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

    enemies.forEach(enemy => enemy.draw());
    bullets.forEach(bullet => bullet.draw());

    player.draw();
    player.showCoins();
}