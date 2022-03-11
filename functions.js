function namiraneNaNeshtosiUgul(cX, cY, x, y) {
    let ugul = Math.atan2(y - cY, x - cX);
    if (y >= cY) {
        return ugul;
    } else {
        return Math.PI * 2 + ugul;
    }
}
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}