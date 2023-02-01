window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  // canvas.width = 1500;
  // canvas.height = 1500;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - window.innerHeight * .1;
  const gravity = -.00981;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        if (event.key === "ArrowUp") {
          game.taxiCopter.speedY -= 1;
        }
        if (event.key === "ArrowDown") {
          game.taxiCopter.speedY += 1;
        }
        if (event.key === "ArrowLeft") {
          if (!game.taxiCopter.landed) {
            game.taxiCopter.speedX -= 1;
          }
        }
        if (event.key === "ArrowRight") {
          if (!game.taxiCopter.landed) {
            game.taxiCopter.speedX += 1;
          }
        }
      })
    }
  }
  class Passenger {

  }
  class Destination {

  }
  class taxiCopterCopter {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 60;
      this.x = 20;
      this.y = canvas.height - this.height - 10;
      this.speedY = 0;
      this.speedX = 0;
      this.landed = true;
    }
    update() {
      consoleLog(this.speedY, this.speedX, this.x, this.y)
      this.landed = this.y + this.height - 1 >= canvas.height;
      if (this.landed && this.speedY !== 0) {
        this.speedY = 0;
        this.speedX = 0;
        this.y = canvas.height - this.height;
        return;
      }
      this.speedY -= gravity;
      this.y += this.speedY;
      this.x += this.speedX
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.taxiCopter = new taxiCopterCopter(this);
      this.input = new InputHandler(this);
    }
    update() {
      this.taxiCopter.update();
    }
    draw(context) {
      this.taxiCopter.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  const consoleLog = (ySpeed, xSpeed, x, y, canvasHeight, taxiHeight) => {
    document.getElementById('ySpeed').innerHTML = `y speed: ${ySpeed}`
    document.getElementById('xSpeed').innerHTML = `x speed: ${xSpeed}`
    document.getElementById('x').innerHTML = `x: ${x}`
    document.getElementById('y').innerHTML = `y: ${y}`
    document.getElementById('y').innerHTML = `y: ${y}`
    document.getElementById('bottomReached').innerHTML = `gelandet: ${y + taxiHeight >= canvasHeight}`
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})