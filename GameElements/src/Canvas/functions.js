import { MapObject } from "./classes";

export function CreateMapConfig(WORLD_HEIGTH, WORLD_WIDTH) {
  return {
    width: WORLD_WIDTH,
    heigth: WORLD_HEIGTH,
  };
}

export function isCollision(mapObject, player) {
  if (
    mapObject.posX + mapObject.objectWidth >= player.posX &&
    mapObject.posX <= player.posX + player.playerWidth &&
    mapObject.posY + mapObject.objectHeigth >= player.posY &&
    mapObject.posY <= player.posY + player.playerHeigth
  )
    return true;
}

export function MakeMapObjectCollisonBorder(array, player, oldX, oldY) {
  for (let i = 0; i < array.length; i++) {
    if (isCollision(array[i], player)) {
      player.posX = oldX;
      player.posY = oldY;
    }
  }
}

export function getClickPosisionXY(canvas, camera, mapObjects) {
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width; // Kluczoa zmienna do odpwidniego ustawiani kliknieica
    const scaleY = canvas.height / rect.height;

    const getClickX = Math.floor((e.clientX - rect.left) * scaleX);
    const getClickY = Math.floor((e.clientY - rect.top) * scaleY);

    const worldX = getClickX + camera.cameraPosX;
    const worldY = getClickY + camera.cameraPosY;

    // Wykrywanie obiektów na mapie oraz dodanie
    // funkcjonalności OnClick

    for (let i = 0; i < mapObjects.length; i++) {
      if (
        worldX >= mapObjects[i].posX &&
        worldX <= mapObjects[i].posX + mapObjects[i].objectWidth &&
        worldY >= mapObjects[i].posY &&
        worldY <= mapObjects[i].posY + mapObjects[i].objectHeigth
      ) {
        alert(`Kliknięto na ${mapObjects[i].name}`);
      }
    }
  });
}

export function initializeMapObjects() {
  const home = new MapObject("Dom", 100, 100, "green");
  const arena = new MapObject("Arena", 1400, 1500, "yellow");
  const shop = new MapObject("Sklep", 1200, 1100, "pink");
  const storehouse = new MapObject("Magazyn", 1700, 1100, "red");

  return [home, arena, shop, storehouse];
}
