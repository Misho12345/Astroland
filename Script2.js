var player = new Player(canvas.width / 2 - 50, 100, 100);
var planet = new Planet(canvas.width * 2);

function Update() {
    if (isKeyPressed[39] || isKeyPressed[68]) player.angle += Math.PI / 1440;
    if (isKeyPressed[37] || isKeyPressed[65]) player.angle -= Math.PI / 1440;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    
}

function Draw() {
    let a = 3;
    //ctx.translate(canvas.width/a, 0);
    if (!isKeyPressed[77]) { ctx.translate(0,planet.diameter-150);  };
    planet.draw();
    player.draw();

}