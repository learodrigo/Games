// Help function
function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh){
    return ax < bx + bw && bx < ax + aw && ay < by + bh && by < ay + ah;
};


//Bullet
function createBullets(x, y, vely, w, h, color){
    this.x = x;
    this.y = y;
    this.vely = vely;
    this.width = w;
    this.height = h;
    this.color = color;
};

createBullets.prototype.update = function () {
    this.y += this.vely;
};

// Screen
function display(width, height){
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
};

display.prototype.drawSprite = function (sp, x, y) {
    this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

display.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

display.prototype.drawBullet = function (bullet) {
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
};

// Sprite
function Sprite(img, x, y, w, h){
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

// Input handlers
function inputHandler(){
    this.down = {};
    this.pressed = {};

    var _this = this;
    document.addEventListener("keydown", function(evt){
        _this.down[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt){
        delete _this.down[evt.keyCode];
        delete _this.pressed[evt.keyCode];
    });
};

inputHandler.prototype.isDown = function (code) {
    return this.down[code];
};

inputHandler.prototype.isPressed = function (code) {
    if (this.pressed[code]){
        return false;
    } else if (this.down[code]){
        return this.pressed[code] = true;
    }

    return false;

};
