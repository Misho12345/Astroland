var player = new Player(canvas.width / 2 - 50, 100, 100);
var planet = new Planet(canvas.width * 2);
let updates = 0;

function Update() {
    if (isKeyPressed[39] || isKeyPressed[68]) player.angle += Math.PI / 1440;
    if (isKeyPressed[37] || isKeyPressed[65]) player.angle -= Math.PI / 1440;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    updates++;
    if (updates % 1000 == 0) {
        enemies.push(new enemyClasses[randomInteger(enemyClasses.length)](randomInteger(canvas.width), randomInteger(canvas.height)));
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }
}

function Draw() {
    ctx.drawImage(document.getElementById("fon"), 0, 0, canvas.width, canvas.height);
    if (!isKeyPressed[77]) { ctx.translate(0, planet.diameter - canvas.width+250); } else { ctx.scale(0.2, 0.2); ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2); };
    planet.draw();
    player.draw();
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
}