window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 1500;
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
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.speedX = 0;
    }
    update() {
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})