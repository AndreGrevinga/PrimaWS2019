"use strict";
var Platformer;
(function (Platformer) {
    Platformer.f = FudgeCore;
    Platformer.Sprite = L14_ScrollerFoundation.Sprite;
    Platformer.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    const framerate = 60;
    let character;
    let jumpTimer = 0;
    let background;
    function test() {
        let canvas = document.querySelector("canvas");
        let images = document.querySelectorAll("img");
        let characterImg = images[0];
        let platformImg = images[2];
        let txtCharacter = new Platformer.f.TextureImage();
        let lastjumpStatus = false;
        txtCharacter.image = characterImg;
        Platformer.Character.generateSprites(txtCharacter);
        Platformer.f.RenderManager.initialize(true, false);
        Platformer.game = new Platformer.f.Node("Game");
        character = new Platformer.Character("character");
        //create the parallax background
        let txtBackground = new Platformer.f.TextureImage();
        let txtPlatform = new Platformer.f.TextureImage();
        txtPlatform.image = platformImg;
        let backgroundImg = images[1];
        txtBackground.image = backgroundImg;
        background = new Platformer.Background(txtBackground, 10);
        background.cmpTransform.local.scaleY(18);
        background.cmpTransform.local.scaleX(64);
        Platformer.game.appendChild(background);
        Platformer.game.appendChild(character);
        Platformer.level = createLevel(txtPlatform);
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
            if (character.speed.y == 0) {
                jumpTimer = 0;
            }
            let characterTranslation = character.cmpTransform.local.translation;
            let cameraTranslation = cmpCamera.pivot.translation;
            cmpCamera.pivot.translateX(characterTranslation.x - cameraTranslation.x);
            cmpCamera.pivot.translateY(characterTranslation.y - cameraTranslation.y);
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
        else if (character.speed.y != 0) {
            action = Platformer.ACTION.FALL;
        }
        character.act(action, direction);
        if (keysPressed[Platformer.f.KEYBOARD_CODE.W] && jumpTimer < framerate / 3) {
            character.act(Platformer.ACTION.JUMP);
        }
    }
    function createLevel(texture) {
        let level = new Platformer.f.Node("Level");
        let floor = new Platformer.Floor(texture);
        floor.cmpTransform.local.scaleY(0.4);
        floor.cmpTransform.local.scaleX(2);
        level.appendChild(floor);
        floor = new Platformer.Floor(texture);
        floor.cmpTransform.local.scaleY(0.4);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.3);
        floor.cmpTransform.local.translateX(2);
        level.appendChild(floor);
        floor = new Platformer.Floor(texture);
        floor.cmpTransform.local.scaleY(0.4);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.6);
        floor.cmpTransform.local.translateX(4);
        level.appendChild(floor);
        floor = new Platformer.Floor(texture);
        floor.cmpTransform.local.scaleY(0.4);
        floor.cmpTransform.local.scaleX(2);
        floor.cmpTransform.local.translateY(0.9);
        floor.cmpTransform.local.translateX(6);
        level.appendChild(floor);
        return level;
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map