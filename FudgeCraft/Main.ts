namespace FudgeCraft {
    import f = FudgeCore;

    let viewport: f.Viewport;
    let game: f.Node;
    let rotate: f.Vector3 = f.Vector3.ZERO();
    let translate: f.Vector3 = f.Vector3.ZERO();
    let fallspeed: number = 2;
    let gravityCounter: number = 0;
    let fallingFragment: Fragment = new Fragment(0);
    let grid: Grid = new Grid();
    
    window.addEventListener("load", hndLoad);
    function hndLoad(_event: Event): void {
        grid.set("Jonas", new Cube(CUBE_TYPE.GREEN, f.Vector3.ZERO()));
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        f.Debug.log("Canvas", canvas);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(2, 10, 50));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());

        game = new f.Node("FudgeCraft");

        fallingFragment.addComponent(new f.ComponentTransform());
        game.appendChild(fallingFragment);

        let fragment: Fragment;
        fragment = new Fragment(1);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(3))));
        game.appendChild(fragment);

        fragment = new Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-3))));
        game.appendChild(fragment);

        let cmpLight: f.ComponentLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        f.Debug.log("Viewport", viewport);

        viewport.draw();

        f.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function update ():void {
        gravityCounter++;
        if (gravityCounter == 60 / fallspeed) {
            fallingFragment.cmpTransform.local.translate(new f.Vector3(0,-1,0));
            f.RenderManager.update();
            viewport.draw();
            gravityCounter = 0;
        }
    }
    function hndKeyDown(_event: KeyboardEvent): void {
        switch (_event.code) {
            case f.KEYBOARD_CODE.ARROW_UP:
                rotate.add(f.Vector3.X(-90));
                break;
            case f.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(f.Vector3.X(90));
                break;
            case f.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(f.Vector3.Y(-90));
                break;
            case f.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(f.Vector3.Y(90));
                break;
            case f.KEYBOARD_CODE.S:
                translate.add(f.Vector3.Y(-1));
                break;
            case f.KEYBOARD_CODE.A:
                translate.add(f.Vector3.X(-1));
                break;
            case f.KEYBOARD_CODE.D:
                translate.add(f.Vector3.X(1));
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.translate(translate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        translate = f.Vector3.ZERO();
        f.RenderManager.update();
        viewport.draw();
    }
}