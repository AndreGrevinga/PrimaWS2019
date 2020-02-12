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
    let spaceTimer = 0;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new Platformer.f.TextureImage();
        let lastSpaceStatus = false;
        txtHare.image = img;
        Platformer.Hare.generateSprites(txtHare);
        Platformer.f.RenderManager.initialize(true, false);
        Platformer.game = new Platformer.f.Node("Game");
        hare = new Platformer.Hare("Hare");
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
            let spaceStatus = keysPressed[Platformer.f.KEYBOARD_CODE.SPACE];
            if (spaceStatus) {
                spaceTimer++;
            }
            else if (!lastSpaceStatus) {
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
    function handleKeyboard(_event) {
        keysPressed[_event.code] = _event.type == "keydown";
    }
    function processInput() {
        if (keysPressed[Platformer.f.KEYBOARD_CODE.A]) {
            hare.act(Platformer.ACTION.WALK, Platformer.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[Platformer.f.KEYBOARD_CODE.D]) {
            hare.act(Platformer.ACTION.WALK, Platformer.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[Platformer.f.KEYBOARD_CODE.SPACE] && spaceTimer < framerate / 3) {
            hare.act(Platformer.ACTION.JUMP);
            return;
        }
        if (hare.speed.y != 0) {
            hare.act(Platformer.ACTION.FALL);
            return;
        }
        hare.act(Platformer.ACTION.IDLE);
    }
    function createLevel() {
        let level = new Platformer.f.Node("Level");
        let floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new Platformer.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.15);
        floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
        return level;
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map