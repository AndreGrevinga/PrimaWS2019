"use strict";
var Platformer;
(function (Platformer) {
    Platformer.f = FudgeCore;
    Platformer.Sprite = L14_ScrollerFoundation.Sprite;
    Platformer.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let game;
    let hare;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new Platformer.f.TextureImage();
        let fallSpeed = 0;
        txtHare.image = img;
        Platformer.Hare.generateSprites(txtHare);
        Platformer.f.RenderManager.initialize(true, false);
        game = new Platformer.f.Node("Game");
        hare = new Platformer.Hare("Hare");
        game.appendChild(hare);
        let cmpCamera = new Platformer.f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(Platformer.f.Vector3.ZERO());
        cmpCamera.backgroundColor = Platformer.f.Color.CSS("aliceblue");
        let viewport = new Platformer.f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        Platformer.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        Platformer.f.Loop.start(Platformer.f.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
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
        hare.act(Platformer.ACTION.IDLE);
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map