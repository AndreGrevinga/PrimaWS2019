namespace Platformer {
  export import f = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};
  const framerate: number = 60;
  export let game: f.Node;
  export let level: f.Node;
  let hare: Hare;
  let jumpTimer: number = 0;
  let background: Background;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let images: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");
    let hareImg: HTMLImageElement = images[0];
    let backgroundImg: HTMLImageElement = images[1];
    let txtHare: f.TextureImage = new f.TextureImage();
    let txtBackground: f.TextureImage = new f.TextureImage();
    let lastjumpStatus: boolean = false;
    txtHare.image = hareImg;
    txtBackground.image = backgroundImg;
    Hare.generateSprites(txtHare);

    f.RenderManager.initialize(true, false);
    game = new f.Node("Game");
    hare = new Hare("Hare");
    background = new Background(txtBackground);
    background.cmpTransform.local.scaleY(50);
    background.cmpTransform.local.scaleX(150);
    game.appendChild(background);
    game.appendChild(hare);
    level = createLevel();
    game.appendChild(level);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(15);
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, framerate);

    function update(_event: f.Eventƒ): void {
      let jumpStatus = keysPressed[f.KEYBOARD_CODE.W];
      if (jumpStatus) {
        jumpTimer++;
      } else if (!lastjumpStatus) {
        jumpTimer = framerate;
      }
      lastjumpStatus = jumpStatus;
      if (hare.speed.y == 0) {
        jumpTimer = 0;
      }
      let hareTranslation: f.Vector3 = hare.cmpTransform.local.translation;
      let cameraTranslation: f.Vector3 = cmpCamera.pivot.translation;
      cmpCamera.pivot.translateX(hareTranslation.x - cameraTranslation.x);
      cmpCamera.pivot.translateY(hareTranslation.y - cameraTranslation.y);
      processInput();
      viewport.draw();
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = _event.type == "keydown";
  }

  function processInput(): void {
    let action: ACTION = ACTION.IDLE;
    let direction: DIRECTION;
    if (keysPressed[f.KEYBOARD_CODE.A]) {
      action = ACTION.WALK;
      direction = DIRECTION.LEFT;
    } else if (keysPressed[f.KEYBOARD_CODE.D]) {
      action = ACTION.WALK;
      direction = DIRECTION.RIGHT;
    } else if (hare.speed.y != 0) {
      action = ACTION.FALL;
    }

    hare.act(action, direction);

    if (keysPressed[f.KEYBOARD_CODE.W] && jumpTimer < framerate / 3) {
      hare.act(ACTION.JUMP);
    }
  }
  function createLevel(): f.Node {
    let level: f.Node = new f.Node("Level");
    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(1);
    floor.cmpTransform.local.translateY(0.15);
    floor.cmpTransform.local.translateX(1);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(1);
    floor.cmpTransform.local.translateY(0.3);
    floor.cmpTransform.local.translateX(2);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(1);
    floor.cmpTransform.local.translateY(0.45);
    floor.cmpTransform.local.translateX(3);
    level.appendChild(floor);

    return level;
  }
}
