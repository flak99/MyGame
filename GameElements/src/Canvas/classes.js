export class Player {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.speed = 3;

    // Dane do spritów
    this.playerImage = new Image();
    this.playerImage.src = "./Player.png";

    // Dane do animacji postaci
    this.frameWidth = 32;
    this.frameHeight = 32;
    this.scale = 3.125;

    // Zostało to zienioen aby miec border poataci równy z
    // wielkoscia klastki. Klata png ma 32x32, a grancie 100x100
    // Aby to zrównac oblciozono skale (3.125) ktróra po wymnoeniu
    // frameWidth * scale = 32 * 3.125 = 100
    this.playerWidth = this.frameWidth * this.scale;
    this.playerHeigth = this.frameHeight * this.scale;

    this.frameX = 0;
    this.animationFrames = 5; // To sa klatki danej animacji dla naszego spreeda mamy 6 obrazkow, ale liczy sie od 0,1,2,3,4,5
    this.frameDelay = 12;

    this.frameIndex = 1;
    this.row = 2;
    this.col = 1;

    // Potrzebne do tego, aby moc korzytsac z odbicia lustrzanego sprita
    this.flip = false;
  }

  updateAnimation(gameFrame) {
    if (!this.playerIsMoving) {
      this.frameX = 0; // idle
      this.row = 0;
      return;
    }
    if (gameFrame % this.frameDelay === 0) {
      this.frameX++;
      if (this.frameX > this.animationFrames) {
        this.frameX = 0;
      }
    }
  }

  move(keysPressed, WORLD_WIDTH, WORLD_HEIGTH) {
    this.playerIsMoving = false;

    if (keysPressed["w"]) {
      this.posY -= this.speed;
      this.playerIsMoving = true;
      this.row = 5;
      this.flip = false;
    }
    if (keysPressed["s"]) {
      this.posY += this.speed;
      this.playerIsMoving = true;
      this.row = 3;
      this.flip = false;
    }
    if (keysPressed["a"]) {
      this.posX -= this.speed;
      this.playerIsMoving = true;
      this.row = 4;
      this.flip = true;
    }
    if (keysPressed["d"]) {
      this.posX += this.speed;
      this.playerIsMoving = true;
      this.row = 4;
      this.flip = false;
    }

    // ograniczenie ruchu do granic mapy
    this.posX = Math.max(
      0,
      Math.min(this.posX, WORLD_WIDTH - this.playerWidth)
    );
    this.posY = Math.max(
      0,
      Math.min(this.posY, WORLD_HEIGTH - this.playerHeigth)
    );
  }

  draw(ctx, camera, gameFrame) {
    this.updateAnimation(gameFrame);

    ctx.save();

    if (this.flip) {
      //Okrelenie nowego punktu pocztku sprita
      //Mamtu tuaj ponowne rtusowanie juz odworconego sprita
      //Gdy flip = true

      const drawX = this.posX - camera.cameraPosX;
      const drawY = this.posY - camera.cameraPosY;

      ctx.translate(drawX + this.playerWidth, drawY);
      ctx.scale(-1, 1);

      ctx.drawImage(
        this.playerImage,
        this.frameX * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        0,
        0,
        this.playerWidth,
        this.playerHeigth
      );
    } else {
      //Skopwione caly kod z draw aby poprawnie dziaalo flipowanie
      // Mozliwe ze bedzie trzeba to porawic
      ctx.drawImage(
        this.playerImage,
        this.frameX * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        this.posX - camera.cameraPosX,
        this.posY - camera.cameraPosY,
        this.playerWidth,
        this.playerHeigth
      );
    }

    ctx.restore();
  }
}

export class MapObject {
  constructor(image, posX, posY, name) {
    this.posX = posX;
    this.posY = posY;
    this.objectWidth = 350;
    this.objectHeigth = 350;
    this.image = image;
    this.name = name;
  }

  draw(ctx, camera) {
    ctx.drawImage(
      this.image,
      this.posX - camera.cameraPosX,
      this.posY - camera.cameraPosY,
      this.objectWidth,
      this.objectHeigth
    );
  }
}

export class Camera {
  constructor(worldWidth, worldHeigth) {
    this.cameraPosX = 0;
    this.cameraPosY = 0;
    this.canvasWidth = 1920;
    this.canvasHeigth = 1080;
    this.worldWidth = worldWidth;
    this.worldHeigth = worldHeigth;

    this.deadZoneWidth = 400;
    this.deadZoneHeigth = 400;
  }

  follow(player) {
    // granice DeadZone
    const deadZoneLeft =
      this.cameraPosX + (this.canvasWidth - this.deadZoneWidth) / 2;
    const deadZoneRight =
      this.cameraPosX + (this.canvasWidth + this.deadZoneWidth) / 2;
    const deadZoneTop =
      this.cameraPosY + (this.canvasHeigth - this.deadZoneHeigth) / 2;
    const deadZoneBottom =
      this.cameraPosY + (this.canvasHeigth + this.deadZoneHeigth) / 2;

    // Logika sprawdzania czy gracz wyszedł poza DeadZone

    // Oś X
    if (player.posX < deadZoneLeft) {
      this.cameraPosX -= deadZoneLeft - player.posX;
    } else if (player.posX + player.playerWidth > deadZoneRight) {
      this.cameraPosX += player.posX + player.playerWidth - deadZoneRight;
    }

    //Oś Y
    if (player.posY < deadZoneTop) {
      this.cameraPosY -= deadZoneTop - player.posY;
    } else if (player.posY + player.playerHeigth > deadZoneBottom) {
      this.cameraPosY += player.posY + player.playerHeigth - deadZoneBottom;
    }

    // Określenie granicy kamery odnośnie świata
    this.cameraPosX = Math.max(
      0,
      Math.min(this.cameraPosX, this.worldWidth - this.canvasWidth)
    );
    this.cameraPosY = Math.max(
      0,
      Math.min(this.cameraPosY, this.worldHeigth - this.canvasHeigth)
    );

    // KONIEC - FOLLOW
  }
}
