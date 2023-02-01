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
          game.player.speedY -= 1;
        }
        if (event.key === "ArrowDown") {
          game.player.speedY += 1;
        }
        if (event.key === "ArrowLeft") {
          game.player.speedX -= 1;
        }
        if (event.key === "ArrowRight") {
          game.player.speedX += 1;
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
      this.y = canvas.height - this.height;
      this.speedY = 0;
      this.speedX = 0;
    }
    update() {

      this.speedY -= gravity;
      this.y += this.speedY;
      this.x += this.speedX
      consoleLog(this.speedY, this.speedX, this.x, this.y)
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new taxiCopterCopter(this);
      this.input = new InputHandler(this);
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  const consoleLog = (ySpeed, xSpeed, x, y) => {
    document.getElementById('ySpeed').innerHTML = `y speed: ${ySpeed}`
    document.getElementById('xSpeed').innerHTML = `y speed: ${xSpeed}`
    document.getElementById('x').innerHTML = `y speed: ${x}`
    document.getElementById('y').innerHTML = `y speed: ${y}`
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})