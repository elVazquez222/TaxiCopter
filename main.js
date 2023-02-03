import { debounce } from './helpers.js';
import { destinations } from './destinations.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - window.innerHeight * .1;
  const taxiCopterWidth = 120;
  const taxiCopterHeight = 60;
  const gravity = -.00981;
  const landingAreas = [];

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        if (event.key === "ArrowUp") {
          game.taxiCopter.landedOn = null;

          if(game.taxiCopter.landedOn !== null || game.taxiCopter.speedY === 0) {
            game.taxiCopter.starting = true;
          } else {
            game.taxiCopter.starting = false;
          }

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
    constructor(game, id, width, height, x, y = null) {
      this.game = game;
      this.id = id;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y ?? window.innerHeight - this.height;
    }
    draw(context) {
      const textSize = 50;
      ctx.fillStyle = "white";
      context.fillRect(this.x, this.y - textSize, this.width, this.height);
      context.strokeText(this.id, this.x + (this.width / 2) - 4, this.y);
      ctx.font = `${textSize}px serif`;
      landingAreas.push({
        xStart: this.x,
        xEnd: this.x + this.width,
        yStart: this.y,
        yEnd: this.y + this.height
      })
    }
  }
  class taxiCopterCopter {
    constructor(game) {
      this.game = game;
      this.width = taxiCopterWidth;
      this.height = taxiCopterHeight;
      this.x = 20;
      this.y = canvas.height - this.height - 1;
      this.speedY = 0;
      this.speedX = 0;
      this.starting = false;
      this.landedOn = {x: this.x, y: this.y}; // :{x:number, y:number}|null
    }
    update() {
      consoleLog(this.speedY, this.speedX, this.x, this.y);

      this.speedY !== 0 && debounce(checkLanding(this));

      if (this.landedOn !== null && this.speedY !== 0) {
        console.log(this.landedOn);
        this.speedY = 0;
        this.speedX = 0;
        this.y = this.landedOn.y;
        this.x = this.landedOn.x;
        return;
      }

      this.speedY -= !this.landedOn ? gravity : 0;
      this.y += this.speedY;
      this.x += this.speedX
    }
    draw(context) {
      ctx.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Game {
    constructor(width, height, destinations) {
      this.width = width;
      this.height = height;
      this.taxiCopter = new taxiCopterCopter(this);
      this.destinations = destinations.map(destination => {
        const desti = new Destination(this, destination.id, destination.width, destination.height, destination.x, destination.y);
        return desti;
      })
      this.input = new InputHandler(this);
    }
    update() {
      this.taxiCopter.update();
    }
    draw(context) {
      this.taxiCopter.draw(context);
      this.destinations.forEach(destination => destination.draw(context));
    }
  }

  const game = new Game(canvas.width, canvas.height, destinations);

  const consoleLog = (ySpeed, xSpeed, x, y, canvasHeight, taxiHeight) => {
    document.getElementById('ySpeed').innerHTML = `y speed: ${ySpeed}`
    document.getElementById('xSpeed').innerHTML = `x speed: ${xSpeed}`
    document.getElementById('x').innerHTML = `x: ${x}`
    document.getElementById('y').innerHTML = `y: ${y}`
    document.getElementById('y').innerHTML = `y: ${y}`
    document.getElementById('bottomReached').innerHTML = `gelandet: ${y + taxiHeight >= canvasHeight}`
  }

  const checkLanding = (taxiCopter) => {

    if(taxiCopter.y + taxiCopter.height - 1 >= canvas.height && taxiCopter.speedY > 0) {
      taxiCopter.landedOn = {x: taxiCopter.x, y:  taxiCopter.y };
      return;
    };

    landingAreas.forEach(area => {
      if(
          taxiCopter.y + taxiCopterHeight - 1 >= area.yStart - taxiCopterHeight
          && taxiCopter.y + taxiCopterHeight - 1 < area.yEnd - taxiCopterHeight
          && taxiCopter.x > area.xStart && taxiCopter.x < area.xEnd && taxiCopter.speedY > 0
        ) {
          taxiCopter.landedOn = {x: taxiCopter.x, y: taxiCopter.y + 5 };
        };
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
})