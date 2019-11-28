namespace FudgeCraft {
  export import f = FudgeCore;

  window.addEventListener("load", hndLoad);

  export let game: f.Node = new f.Node("FudgeCraft");
  export let grid: Grid = new Grid();
  let control: Control = new Control();
  let viewport: f.Viewport;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    f.RenderManager.initialize(true);
    f.Debug.log("Canvas", canvas);

    //let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    //cmpCamera.pivot.translate(new f.Vector3(4, 6, 20));
    //cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    //cmpCamera.backgroundColor = f.Color.WHITE;
    let camera: CameraOrbit = new CameraOrbit(75);

    let cmpLight: f.ComponentLight = new f.ComponentLight(
      new f.LightDirectional(f.Color.WHITE)
    );
    cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
    game.addComponent(cmpLight);
    let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(
      new f.LightAmbient(f.Color.DARK_GREY)
    );
    game.addComponent(cmpLightAmbient);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
    f.Debug.log("Viewport", viewport);
    viewport.draw();

    startRandomFragment();
    game.appendChild(control);

    viewport.draw();
    f.Debug.log("Game", game);

    window.addEventListener("keydown", hndKeyDown);

    //test();
  }

  function hndKeyDown(_event: KeyboardEvent): void {
    if (_event.code == f.KEYBOARD_CODE.SPACE) {
      control.freeze();
      startRandomFragment();
    }

    let transformation: Transformation = Control.transformations[_event.code];
    if (transformation) move(transformation);

    // ƒ.RenderManager.update();
    viewport.draw();
  }

  function move(_transformation: Transformation): void {
    let animationSteps: number = 10;
    let fullRotation: number = 90;
    let fullTranslation: number = 1;
    let move: Transformation = {
      rotation: _transformation.rotation
        ? f.Vector3.SCALE(_transformation.rotation, fullRotation)
        : new f.Vector3(),
      translation: _transformation.translation
        ? f.Vector3.SCALE(_transformation.translation, fullTranslation)
        : new f.Vector3()
    };

    let timers: f.Timers = f.Time.game.getTimers();
    if (Object.keys(timers).length > 0) return;

    let collisions: GridElement[] = control.checkCollisions(move);
    if (collisions.length > 0) return;

    move.translation.scale(1 / animationSteps);
    move.rotation.scale(1 / animationSteps);

    f.Time.game.setTimer(10, animationSteps, function(): void {
      control.move(move);
      // ƒ.RenderManager.update();
      viewport.draw();
    });
  }

  export function startRandomFragment(): void {
    let fragment: Fragment = Fragment.getRandom();
    control.cmpTransform.local = f.Matrix4x4.IDENTITY;
    control.setFragment(fragment);
  }
}
