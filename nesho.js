var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Update();
    Draw();

    setTimeout(init, 10);
}

function Update() {

}

function Draw() {
    ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}