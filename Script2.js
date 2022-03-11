let planet = new Planet(canvas.width * 2);
let player = new Player(100, 100);

let cap = Math.PI / 20;
let speed = Math.PI / 720;

function Update() {
    if (isKeyPressed[39] || isKeyPressed[68]) {
        if (player.angle > player.defA + cap) {
            planet.angle -= speed;
            player.defA = player.angle - cap;
        }
        player.angle += speed;
    }
    if (isKeyPressed[37] || isKeyPressed[65]) {
        if (player.angle < player.defA - cap) {
            planet.angle += speed;
            player.defA = player.angle + cap;
        }
        player.angle -= speed;
    }

    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    
}

function Draw() {
    ctx.drawImage(document.getElementById("fon"), 0, 0, canvas.width, canvas.height);

    if (!isKeyPressed[77]) ctx.translate(0, planet.diameter - canvas.width + 250);
    else {
        ctx.scale(0.2, 0.2);
        ctx.translate(canvas.width + planet.diameter / 2, 0 + planet.diameter / 2);
    }

    planet.draw();
    player.draw();
}