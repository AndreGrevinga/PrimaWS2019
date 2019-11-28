"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    FudgeCraft.f = FudgeCore;
    window.addEventListener("load", hndLoad);
    FudgeCraft.game = new FudgeCraft.f.Node("FudgeCraft");
    FudgeCraft.grid = new FudgeCraft.Grid();
    let control = new FudgeCraft.Control();
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        FudgeCraft.f.RenderManager.initialize(true);
        FudgeCraft.f.Debug.log("Canvas", canvas);
        //let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        //cmpCamera.pivot.translate(new f.Vector3(4, 6, 20));
        //cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        //cmpCamera.backgroundColor = f.Color.WHITE;
        let camera = new FudgeCraft.CameraOrbit(75);
        let cmpLight = new FudgeCraft.f.ComponentLight(new FudgeCraft.f.LightDirectional(FudgeCraft.f.Color.WHITE));
        cmpLight.pivot.lookAt(new FudgeCraft.f.Vector3(0.5, 1, 0.8));
        FudgeCraft.game.addComponent(cmpLight);
        let cmpLightAmbient = new FudgeCraft.f.ComponentLight(new FudgeCraft.f.LightAmbient(FudgeCraft.f.Color.DARK_GREY));
        FudgeCraft.game.addComponent(cmpLightAmbient);
        viewport = new FudgeCraft.f.Viewport();
        viewport.initialize("Viewport", FudgeCraft.game, camera.cmpCamera, canvas);
        FudgeCraft.f.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        FudgeCraft.game.appendChild(control);
        viewport.draw();
        FudgeCraft.f.Debug.log("Game", FudgeCraft.game);
        window.addEventListener("keydown", hndKeyDown);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == FudgeCraft.f.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = FudgeCraft.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation
                ? FudgeCraft.f.Vector3.SCALE(_transformation.rotation, fullRotation)
                : new FudgeCraft.f.Vector3(),
            translation: _transformation.translation
                ? FudgeCraft.f.Vector3.SCALE(_transformation.translation, fullTranslation)
                : new FudgeCraft.f.Vector3()
        };
        let timers = FudgeCraft.f.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        FudgeCraft.f.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = FudgeCraft.Fragment.getRandom();
        control.cmpTransform.local = FudgeCraft.f.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    FudgeCraft.startRandomFragment = startRandomFragment;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Main.js.map