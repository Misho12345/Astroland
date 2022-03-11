var player = new Player(canvas.width / 2 - 50, 100, 100);
var planet = new Planet(canvas.width * 2);

function Update() {
    if (isKeyPressed[39] || isKeyPressed[68]) player.angle += Math.PI / 1440;
    if (isKeyPressed[37] || isKeyPressed[65]) player.angle -= Math.PI / 1440;
}

function Draw() {
    planet.draw();
    player.draw();
}