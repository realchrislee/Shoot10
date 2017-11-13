let bulletDisplay = [
  new Bullet(15, 10),
  new Bullet(30, 10),
  new Bullet(45, 10),
  new Bullet(60, 10),
  new Bullet(75, 10),
  new Bullet(90, 10),
  new Bullet(105, 10),
  new Bullet(120, 10),
  new Bullet(135, 10),
  new Bullet(150, 10),
];

function Bullet(x, y, bDX = 0, bDY = 0) {
  this.x = x;
  this.y = y;
  this.w = 12;
  this.h = 10;
  this.bDX = bDX;
  this.bDY = bDY;

  // bullet
  this.draw = function() {
    // let bullet = new Image();
    // bullet.src = './bullet.png';
    // ctx.drawImage(bullet, this.x, this.y, this.w, this.h);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    this.y -= bDY;
    this.x -= bDX;
    this.draw();
  };
}