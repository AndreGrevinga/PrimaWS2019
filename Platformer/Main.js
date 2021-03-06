"use strict";
var Platformer;
(function (Platformer) {
    Platformer.f = FudgeCore;
    Platformer.Sprite = L14_ScrollerFoundation.Sprite;
    Platformer.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", start);
    let keysPressed = {};
    const framerate = 60;
    Platformer.level = new Platformer.f.Node("level");
    let character;
    let jumpTimer = 0;
    let background = new Platformer.f.Node("Background");
    let gameIsStarted = false;
    let musicIsPlaying = false;
    function start() {
        let canvas = document.querySelector("canvas");
        let txtCharacter = loadTexture("character");
        let lastjumpStatus = false;
        let backgrounds = document.querySelectorAll("img");
        Platformer.Character.generateSprites(txtCharacter);
        Platformer.f.RenderManager.initialize(false, false);
        Platformer.game = new Platformer.f.Node("Game");
        character = new Platformer.Character("character");
        Platformer.game.appendChild(character);
        Platformer.game.appendChild(Platformer.level);
        Platformer.LevelLoader.generateLevel("Level.json");
        let distance = 20;
        for (let i = 0; i < backgrounds.length; i++) {
            let txt = new Platformer.f.TextureImage();
            let backgroundImg = backgrounds[i];
            if (backgroundImg.id == "paralaxBackground") {
                txt.image = backgroundImg;
                let bg = new Platformer.Background(txt, distance);
                bg.cmpTransform.local.scaleY(9 * 3);
                bg.cmpTransform.local.scaleX(16 * 3);
                background.appendChild(bg);
                distance = distance - 3;
            }
        }
        Platformer.game.appendChild(background);
        let cmpCamera = new Platformer.f.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.lookAt(Platformer.f.Vector3.ZERO());
        cmpCamera.backgroundColor = Platformer.f.Color.CSS("aliceblue");
        let viewport = new Platformer.f.Viewport();
        viewport.initialize("Viewport", Platformer.game, cmpCamera, canvas);
        viewport.draw();
        Platformer.Audio.start();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        document.getElementById("playBtn").addEventListener("click", () => {
            if (!gameIsStarted) {
                Platformer.Audio.play(Platformer.AUDIO.BACKGROUND);
                Platformer.f.Loop.start(Platformer.f.LOOP_MODE.TIME_GAME, framerate);
                gameIsStarted = true;
                musicIsPlaying = true;
            }
        });
        document.getElementById("muteBtn").addEventListener("click", () => {
            Platformer.Audio.play(Platformer.AUDIO.BACKGROUND, !musicIsPlaying);
            musicIsPlaying = !musicIsPlaying;
        });
        Platformer.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
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
    function loadTexture(_elementID) {
        let image = (document.getElementById(_elementID));
        let texture = new Platformer.f.TextureImage();
        texture.image = image;
        return texture;
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
        if (keysPressed[Platformer.f.KEYBOARD_CODE.E]) {
            character.act(Platformer.ACTION.THROW);
        }
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map