"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    FudgeCraft.f = FudgeCore;
    window.addEventListener("load", hndLoad);
    FudgeCraft.game = new FudgeCraft.f.Node("FudgeCraft");
    FudgeCraft.grid = new FudgeCraft.Grid();
    let control = new FudgeCraft.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        FudgeCraft.f.RenderManager.initialize(true);
        FudgeCraft.f.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new FudgeCraft.f.ComponentLight(new FudgeCraft.f.LightDirectional(FudgeCraft.f.Color.WHITE));
        cmpLight.pivot.lookAt(new FudgeCraft.f.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new FudgeCraft.f.ComponentLight(new FudgeCraft.f.LightAmbient(FudgeCraft.f.Color.DARK_GREY));
        FudgeCraft.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new FudgeCraft.CameraOrbit(75);
        FudgeCraft.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new FudgeCraft.f.Viewport();
        viewport.initialize("Viewport", FudgeCraft.game, camera.cmpCamera, canvas);
        FudgeCraft.f.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        FudgeCraft.game.appendChild(control);
        startGame();
        //startTests();
        updateDisplay();
        FudgeCraft.f.Debug.log("Game", FudgeCraft.game);
    }
    function startGame() {
        FudgeCraft.grid.push(FudgeCraft.f.Vector3.ZERO(), new FudgeCraft.GridElement(new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.GREY, FudgeCraft.f.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    FudgeCraft.updateDisplay = updateDisplay;
    function hndPointerMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == FudgeCraft.f.KEYBOARD_CODE.SPACE) {
            let frozen = control.freeze();
            let combos = new FudgeCraft.Combos(frozen);
            handleCombos(combos);
            startRandomFragment();
        }
        let transformation = FudgeCraft.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function handleCombos(_combos) {
        for (let combo of _combos.found)
            if (combo.length > 2)
                for (let element of combo) {
                    let mtxLocal = element.cube.cmpTransform.local;
                    console.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.rotateX(45);
                    // mtxLocal.rotateY(45);
                    // mtxLocal.rotateY(45, true);
                    mtxLocal.scale(FudgeCraft.f.Vector3.ONE(0.5));
                }
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
            updateDisplay();
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