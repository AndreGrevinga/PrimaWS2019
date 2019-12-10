namespace FudgeCraft {
  export import f = FudgeCore;

  window.addEventListener("load", hndLoad);

  export let game: f.Node = new f.Node("FudgeCraft");
  export let grid: Grid = new Grid();
  let control: Control = new Control();
  let viewport: f.Viewport;
  let camera: CameraOrbit;
  let speedCameraRotation: number = 0.2;
  let speedCameraTranslation: number = 0.02;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    f.RenderManager.initialize(true);
    f.Debug.log("Canvas", canvas);

    // enable unlimited mouse-movement (user needs to click on canvas first)
    canvas.addEventListener("click", canvas.requestPointerLock);

    // set lights
    let cmpLight: f.ComponentLight = new f.ComponentLight(
      new f.LightDirectional(f.Color.WHITE)
    );
    cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
    // game.addComponent(cmpLight);
    let cmpLightAmbient: f.ComponentLight = new f.ComponentLight(
      new f.LightAmbient(f.Color.DARK_GREY)
    );
    game.addComponent(cmpLightAmbient);

    // setup orbiting camera
    camera = new CameraOrbit(75);
    game.appendChild(camera);
    camera.setRotationX(-20);
    camera.setRotationY(20);
    camera.cmpCamera.getContainer().addComponent(cmpLight);

    // setup viewport
    viewport = new f.Viewport();
    viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
    f.Debug.log("Viewport", viewport);

    // setup event handling
    viewport.activatePointerEvent(f.EVENT_POINTER.MOVE, true);
    viewport.activateWheelEvent(f.EVENT_WHEEL.WHEEL, true);
    viewport.addEventListener(f.EVENT_POINTER.MOVE, hndPointerMove);
    viewport.addEventListener(f.EVENT_WHEEL.WHEEL, hndWheelMove);
    window.addEventListener("keydown", hndKeyDown);

    game.appendChild(control);

    startGame();
    //startTests();

    updateDisplay();
    f.Debug.log("Game", game);
  }

  function startGame(): void {
    grid.push(
      f.Vector3.ZERO(),
      new GridElement(new Cube(CUBE_TYPE.GREY, f.Vector3.ZERO()))
    );
    startRandomFragment();
  }

  export function updateDisplay(): void {
    viewport.draw();
  }

  function hndPointerMove(_event: f.PointerEventƒ): void {
    // console.log(_event.movementX, _event.movementY);
    camera.rotateY(_event.movementX * speedCameraRotation);
    camera.rotateX(_event.movementY * speedCameraRotation);
    updateDisplay();
  }

  function hndWheelMove(_event: WheelEvent): void {
    camera.translate(_event.deltaY * speedCameraTranslation);
    updateDisplay();
  }

  function hndKeyDown(_event: KeyboardEvent): void {
    if (_event.code == f.KEYBOARD_CODE.SPACE) {
      let frozen: GridElement[] = control.freeze();
      let combos: Combos = new Combos(frozen);
      handleCombos(combos);
      startRandomFragment();
    }

    let transformation: Transformation = Control.transformations[_event.code];
    if (transformation) move(transformation);

    updateDisplay();
  }

  function handleCombos(_combos: Combos): void {
    for (let combo of _combos.found)
      if (combo.length > 2)
        for (let element of combo) {
          let mtxLocal: f.Matrix4x4 = element.cube.cmpTransform.local;
          console.log(element.cube.name, mtxLocal.translation.getMutator());
          // mtxLocal.rotateX(45);
          // mtxLocal.rotateY(45);
          // mtxLocal.rotateY(45, true);
          mtxLocal.scale(f.Vector3.ONE(0.5));
        }
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
      updateDisplay();
    });
  }

  export function startRandomFragment(): void {
    let fragment: Fragment = Fragment.getRandom();
    control.cmpTransform.local = f.Matrix4x4.IDENTITY;
    control.setFragment(fragment);
  }
}
