namespace Platformer {
  export import f = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", start);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};
  const framerate: number = 60;
  export let game: f.Node;
  export let level: f.Node = new f.Node("level");
  let character: Character;
  let jumpTimer: number = 0;
  let background: f.Node = new f.Node("Background");
  let gameIsStarted: boolean = false;
  let musicIsPlaying: boolean = false;

  function start(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let txtCharacter: f.TextureImage = loadTexture("character");
    let lastjumpStatus: boolean = false;

    let backgrounds: NodeListOf<HTMLImageElement> = document.querySelectorAll(
      "img"
    );
    Character.generateSprites(txtCharacter);

    f.RenderManager.initialize(false, false);
    game = new f.Node("Game");
    character = new Character("character");

    game.appendChild(character);
    LevelLoader.generateLevel("/Platformer/Resources/Level.json");
    game.appendChild(level);

    let distance: number = 20;
    for (let i = 0; i < backgrounds.length; i++) {
      let txt: f.TextureImage = new f.TextureImage();
      let backgroundImg: HTMLImageElement = backgrounds[i];
      if (backgroundImg.id == "paralaxBackground") {
        txt.image = backgroundImg;
        let bg: Background = new Background(txt, distance);
        bg.cmpTransform.local.scaleY(9 * 3);
        bg.cmpTransform.local.scaleX(16 * 3);
        background.appendChild(bg);
        distance = distance - 3;
      }
    }
    game.appendChild(background);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(15);
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();
    Audio.start();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);
    document.getElementById("playBtn").addEventListener("click", () => {
      if (!gameIsStarted) {
        Audio.play(AUDIO.BACKGROUND);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, framerate);
        gameIsStarted = true;
        musicIsPlaying = true;
      }
    });
    document.getElementById("muteBtn").addEventListener("click", () => {
      Audio.play(AUDIO.BACKGROUND, !musicIsPlaying);
      musicIsPlaying = !musicIsPlaying;
    });

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);

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

  function loadTexture(_elementID: string): f.TextureImage {
    let image: HTMLImageElement = <HTMLImageElement>(
      document.getElementById(_elementID)
    );
    let texture: f.TextureImage = new f.TextureImage();
    texture.image = image;
    return texture;
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
}
