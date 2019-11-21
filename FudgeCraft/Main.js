"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var f = FudgeCore;
    let viewport;
    let game;
    let rotate = f.Vector3.ZERO();
    let translate = f.Vector3.ZERO();
    let fallspeed = 2;
    let gravityCounter = 0;
    let fallingFragment = new FudgeCraft.Fragment(0);
    let grid = new FudgeCraft.Grid();
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        grid.set("Jonas", new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.GREEN, f.Vector3.ZERO()));
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        f.Debug.log("Canvas", canvas);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(2, 10, 50));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        game = new f.Node("FudgeCraft");
        fallingFragment.addComponent(new f.ComponentTransform());
        game.appendChild(fallingFragment);
        let fragment;
        fragment = new FudgeCraft.Fragment(1);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new FudgeCraft.Fragment(2);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-3))));
        game.appendChild(fragment);
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        f.Debug.log("Viewport", viewport);
        viewport.draw();
        f.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function update() {
        gravityCounter++;
        if (gravityCounter == 60 / fallspeed) {
            fallingFragment.cmpTransform.local.translate(new f.Vector3(0, -1, 0));
            f.RenderManager.update();
            viewport.draw();
            gravityCounter = 0;
        }
    }
    function hndKeyDown(_event) {
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
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Main.js.map