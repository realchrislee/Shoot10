let pressed = false;

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 32 && pressed == false) {
    // bDX = 2;
    //limit bullets to 10
    if (turret.count >= 10) {
      console.log('No more bullets');
    } else {
      turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
      turret.count++;
      bulletDisplay.pop();
    }
    pressed = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode == 32) {
    pressed = false;
  }
});

document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.target.id == 'canvas') {
    // bDX = 2;
    //limit bullets to 10
    if (turret.count >= 10) {
      console.log('No more bullets');
    } else {
      turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
      turret.count++;
      bulletDisplay.pop();
    }
  }
});

function Flash() {
  this.o = 1;
  this.draw = function() {
    ctx.fillStyle = `rgba(255,255,255,${o})`;
    ctx.fillReact(0, 0, canvas.width, canvas.height);
  };

  this.update = function() {
    o -= 1;
  };
}

function Score(score) {
  this.x = 620;
  this.y = 20;
  this.score = 'Score: ' + score.toString();

  ctx.fillStyle = 'black';
  ctx.font = '15px sans-serif';
  ctx.fillText(this.score, this.x, this.y);
}

let background = new Image();
background.src = './images/Background2.jpg';

function removeBullets() {
  bulletsToRemove.forEach(bulletIdx => {
    turret.bullets.splice(bulletIdx, 1);
  });

  bulletsToRemove = [];
}

function addBullets() {
  bulletsToAdd.forEach(bullet => {
    turret.bullets.push(bullet);
  });

  bulletsToAdd = [];
}

function removeShips() {
  shipsToRemove.forEach(shipIdx => {
    shipArray.splice(shipIdx, 1);
  });

  shipsToRemove = [];
}

const turret = new Turret(tH);

let score = 0;
function animateBoard() {
  requestAnimationFrame(animateBoard);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  Score(score);
  turret.draw();
  turret.clean();
  removeBullets();
  // console.log(turret.bullets);
  // turret.bullets.forEach(bullet => {
  //
  //   bullet.update();
  // });


  bulletDisplay.forEach(bullet => {
    bullet.update();
  });

  shipArray.forEach((s, i) => {
    for (let j = 0; j < turret.bullets.length; j++) {
      let b = turret.bullets[j];
      if (
        b.x < s.x + s.w &&
        b.x + b.w > s.x &&
        b.y < s.y + s.h &&
        b.h + b.y > s.y &&
        b.x < canvas.width &&
        b.x > 0 &&
        b.y > 0 &&
        b.y < canvas.height
          ){
        score++;
        if (!bulletsToRemove.includes(j) && !shipsToRemove.includes(i)) {
          bulletsToRemove.push(j);
          shipsToRemove.push(i);
        }
        bulletsToAdd.push(
          new Bullet(s.x, s.y+10, 5),
          new Bullet(s.x, s.y+10, -5),
          new Bullet(s.x, s.y+10, 0, 5),
          new Bullet(s.x, s.y+10, 0, -5),
          new Bullet(s.x, s.y+10, 2, 2),
          new Bullet(s.x, s.y+10, -2, -2),
          new Bullet(s.x, s.y+10, 2, -2),
          new Bullet(s.x, s.y+10, -2, 2),
          new Bullet(s.x, s.y+10, 1, 4),
          new Bullet(s.x, s.y+10, -1, 4),
          new Bullet(s.x, s.y+10, 1, -4),
          new Bullet(s.x, s.y+10, -1, -4),
          new Bullet(s.x, s.y+10, 4, 1),
          new Bullet(s.x, s.y+10, 4, -1),
          new Bullet(s.x, s.y+10, -4, -1),
          new Bullet(s.x, s.y+10, -4, 1)
        );
        // Flash.draw();
        // Flash.update();
      }
    }
  });
  
  removeShips();
  removeBullets();
  addBullets();

  shipArray.forEach((s, i) => {
    if (s.x < -20 || s.x > 740) {
      if (shipsToRemove.includes(i)) {
        return;
      } else {
        shipsToRemove.push(i);
      }
    } else {
      s.update();
    }
  });

  removeShips();


  // if (turret.bullets[0] == null && turret.count >= 10) {
  //   alert('Game Over!');
  // }
}

animateBoard();