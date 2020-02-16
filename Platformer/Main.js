"use strict";
var Platformer;
(function (Platformer) {
    Platformer.f = FudgeCore;
    Platformer.Sprite = L14_ScrollerFoundation.Sprite;
    Platformer.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    const framerate = 60;
    let hare;
    let jumpTimer = 0;
    let background;
    function test() {
        let canvas = document.querySelector("canvas");
        let images = document.querySelectorAll("img");
        let hareImg = images[0];
        let backgroundImg = images[1];
        let txtHare = new Platformer.f.TextureImage();
        let txtBackground = new Platformer.f.TextureImage();
        let lastjumpStatus = false;
        txtHare.image = hareImg;
        txtBackground.image = backgroundImg;
        Platformer.Hare.generateSprites(txtHare);
        Platformer.f.RenderManager.initialize(true, false);
        Platformer.game = new Platformer.f.Node("Game");
        hare = new Platformer.Hare("Hare");
        background = new Platformer.Background(txtBackground);
        background.cmpTransform.local.scaleY(50);
        background.cmpTransform.local.scaleX(150);
        Platformer.game.appendChild(background);
        Platformer.game.appendChild(hare);
        Platformer.level = createLevel();
        Platformer.game.appendChild(Platformer.level);
        let cmpCamera = new Platformer.f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.lookAt(Platformer.f.Vector3.ZERO());
        cmpCamera.backgroundColor = Platformer.f.Color.CSS("aliceblue");
        let viewport = new Platformer.f.Viewport();
        viewport.initialize("Viewport", Platformer.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        Platformer.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        Platformer.f.Loop.start(Platformer.f.LOOP_MODE.TIME_GAME, framerate);
        function update(_event) {
            let jumpStatus = keysPressed[Platformer.f.KEYBOARD_CODE.W];
            if (jumpStatus) {
                jumpTimer++;
            }
            else if (!lastjumpStatus) {
                jumpTimer = framerate;
            }
            lastjumpStatus = jumpStatus;
            if (hare.speed.y == 0) {
                jumpTimer = 0;
            }
            let hareTranslation = hare.cmpTransform.local.translation;
            let cameraTranslation = cmpCamera.pivot.translation;
            cmpCamera.pivot.translateX(hareTranslation.x - cameraTranslation.x);
            cmpCamera.pivot.translateY(hareTranslation.y - cameraTranslation.y);
            processInput();
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = _event.type == "keydown";
    }
    function processInput() {
        let action = Platformer.ACTION.IDLE;
        let direction;
        if (keysPressed[Platformer.f.KEYBOARD_CODE.A]) {
            action = Platformer.ACTION.WALK;
            direction = Platformer.DIRECTION.LEFT;
        }
        else if (keysPressed[Platformer.f.KEYBOARD_CODE.D]) {
            action = Platformer.ACTION.WALK;
            direction = Platformer.DIRECTION.RIGHT;
        }
        else if (hare.speed.y != 0) {
            action = Platformer.ACTION.FALL;
        }
        hare.act(action, direction);
        if (keysPressed[Platformer.f.KEYBOARD_CODE.W] && jumpTimer < framerate / 3) {
            hare.act(Platformer.ACTION.JUMP);
        }
    }
    function createLevel() {
        let level = new Platformer.f.Node("Level");
        let floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(0.15);
        floor.cmpTransform.local.translateX(1);
        level.appendChild(floor);
        floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(0.3);
        floor.cmpTransform.local.translateX(2);
        level.appendChild(floor);
        floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(0.45);
        floor.cmpTransform.local.translateX(3);
        level.appendChild(floor);
        return level;
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map