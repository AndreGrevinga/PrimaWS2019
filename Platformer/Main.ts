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
  let spaceTimer: number = 0;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtHare: f.TextureImage = new f.TextureImage();
    let lastSpaceStatus: boolean = false;
    txtHare.image = img;
    Hare.generateSprites(txtHare);

    f.RenderManager.initialize(true, false);
    game = new f.Node("Game");
    hare = new Hare("Hare");
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
      let spaceStatus = keysPressed[f.KEYBOARD_CODE.SPACE];
      if (spaceStatus) {
        spaceTimer++;
      } else if (!lastSpaceStatus) {
        spaceTimer = framerate;
      }
      lastSpaceStatus = spaceStatus;
      if (hare.speed.y == 0) {
        spaceTimer = 0;
      }
      processInput();
      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = _event.type == "keydown";
  }

  function processInput(): void {
    if (keysPressed[f.KEYBOARD_CODE.A]) {
      hare.act(ACTION.WALK, DIRECTION.LEFT);
      return;
    }
    if (keysPressed[f.KEYBOARD_CODE.D]) {
      hare.act(ACTION.WALK, DIRECTION.RIGHT);
      return;
    }
    if (keysPressed[f.KEYBOARD_CODE.SPACE] && spaceTimer < framerate / 3) {
      hare.act(ACTION.JUMP);
      return;
    }
    if (hare.speed.y != 0) {
      hare.act(ACTION.FALL);
      return;
    }
    hare.act(ACTION.IDLE);
  }
  function createLevel(): f.Node {
    let level: f.Node = new f.Node("Level");
    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.2);
    floor.cmpTransform.local.scaleX(2);
    floor.cmpTransform.local.translateY(0.15);
    floor.cmpTransform.local.translateX(1.5);
    level.appendChild(floor);

    return level;
  }
}
