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
  let character: Character;
  let jumpTimer: number = 0;
  let background: Background;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let images: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");
    let characterImg: HTMLImageElement = images[0];
    let platformImg: HTMLImageElement = images[2];
    let txtCharacter: f.TextureImage = new f.TextureImage();
    let lastjumpStatus: boolean = false;
    txtCharacter.image = characterImg;
    Character.generateSprites(txtCharacter);

    f.RenderManager.initialize(true, false);
    game = new f.Node("Game");
    character = new Character("character");

    //create the parallax background
    let txtBackground: f.TextureImage = new f.TextureImage();
    let txtPlatform: f.TextureImage = new f.TextureImage();
    txtPlatform.image = platformImg;
    let backgroundImg: HTMLImageElement = images[1];
    txtBackground.image = backgroundImg;
    background = new Background(txtBackground, 10);
    background.cmpTransform.local.scaleY(18);
    background.cmpTransform.local.scaleX(64);
    game.appendChild(background);

    game.appendChild(character);
    level = createLevel(txtPlatform);
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
      if (character.speed.y == 0) {
        jumpTimer = 0;
      }
      let characterTranslation: f.Vector3 =
        character.cmpTransform.local.translation;
      let cameraTranslation: f.Vector3 = cmpCamera.pivot.translation;
      cmpCamera.pivot.translateX(characterTranslation.x - cameraTranslation.x);
      cmpCamera.pivot.translateY(characterTranslation.y - cameraTranslation.y);
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
    } else if (character.speed.y != 0) {
      action = ACTION.FALL;
    }

    character.act(action, direction);

    if (keysPressed[f.KEYBOARD_CODE.W] && jumpTimer < framerate / 3) {
      character.act(ACTION.JUMP);
    }
  }

  function createLevel(texture: f.TextureImage): f.Node {
    let level: f.Node = new f.Node("Level");
    let floor: Floor = new Floor(texture);
    floor.cmpTransform.local.scaleY(0.4);
    floor.cmpTransform.local.scaleX(2);
    level.appendChild(floor);

    floor = new Floor(texture);
    floor.cmpTransform.local.scaleY(0.4);
    floor.cmpTransform.local.scaleX(2);
    floor.cmpTransform.local.translateY(0.3);
    floor.cmpTransform.local.translateX(2);
    level.appendChild(floor);

    floor = new Floor(texture);
    floor.cmpTransform.local.scaleY(0.4);
    floor.cmpTransform.local.scaleX(2);
    floor.cmpTransform.local.translateY(0.6);
    floor.cmpTransform.local.translateX(4);
    level.appendChild(floor);

    floor = new Floor(texture);
    floor.cmpTransform.local.scaleY(0.4);
    floor.cmpTransform.local.scaleX(2);
    floor.cmpTransform.local.translateY(0.9);
    floor.cmpTransform.local.translateX(6);
    level.appendChild(floor);

    return level;
  }
}
