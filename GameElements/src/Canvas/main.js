import { Camera, MapObject, Player } from "./classes.js";
import {
  getClickPosisionXY,
  MakeMapObjectCollisonBorder,
} from "./functions.js";

export function keyPressedObject() {
  const keysPressed = {};

  function down(e) {
    keysPressed[e.key.toLowerCase()] = true;
  }

  function up(e) {
    keysPressed[e.key.toLowerCase()] = false;
  }

  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);

  return {
    keysPressed,
    destroy() {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    },
  };
}

function CanvasConfig(canvas) {
  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGTH = 1080;

  const WORLD_WIDTH = 2000;
  const WORLD_HEIGTH = 2000;

  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGTH;
  ctx.imageSmoothingEnabled = false;

  return { ctx, WORLD_WIDTH, WORLD_HEIGTH };
}

const kowal = new Image();
kowal.src = "./Upgrade.png";

export function createGame(canvas) {
  const { ctx, WORLD_WIDTH, WORLD_HEIGTH } = CanvasConfig(canvas);

  const home = new MapObject(kowal, 100, 100, "HOME");
  const arena = new MapObject(kowal, 1400, 100, "AREAN");
  const shop = new MapObject(kowal, 200, 1100, "SHOP");
  const storehouse = new MapObject(kowal, 1700, 1100, "MAGAZYN");

  const player = new Player(500, 500);
  const camera = new Camera(WORLD_WIDTH, WORLD_HEIGTH);

  const mapObjects = [home, arena, shop, storehouse];
  const keyboard = keyPressedObject();

  let running = true;
  let gameFrame = 0;

  getClickPosisionXY(canvas, camera, mapObjects);

  // Ten GameLoop odpowiada za prawdiłowe dzialanie
  // Jest to odswieżanie ekranu po zmianach
  function GameLoop() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame++;

    const oldX = player.posX;
    const oldY = player.posY;

    player.move(keyboard.keysPressed, WORLD_WIDTH, WORLD_HEIGTH);
    camera.follow(player);

    home.draw(ctx, camera);
    arena.draw(ctx, camera);
    shop.draw(ctx, camera);
    storehouse.draw(ctx, camera);

    player.draw(ctx, camera, gameFrame);

    MakeMapObjectCollisonBorder(mapObjects, player, oldX, oldY);

    requestAnimationFrame(GameLoop);
  }

  GameLoop();

  return {
    destroy() {
      running = false;
      keyboard.destroy();
    },
  };
}
