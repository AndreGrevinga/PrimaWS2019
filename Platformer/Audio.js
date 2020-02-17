"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let AUDIO;
    (function (AUDIO) {
        AUDIO["BACKGROUND"] = "/Platformer/Resources/Sound/TropicalJungle.mp3";
        AUDIO["MOVE"] = "/Platformer/Resources/Sound/move.wav";
    })(AUDIO = Platformer.AUDIO || (Platformer.AUDIO = {}));
    class Audio extends f.Node {
        static start() {
            Audio.appendAudio();
            Platformer.game.appendChild(Audio.node);
            f.AudioManager.default.listenTo(Audio.node);
        }
        static play(_audio, _on = true) {
            f.Debug.log(_audio);
            Audio.components.get(_audio).play(_on);
        }
        static async appendAudio() {
            Audio.components.set(AUDIO.BACKGROUND, new f.ComponentAudio(await f.Audio.load(AUDIO.BACKGROUND), true, false));
            Audio.components.set(AUDIO.MOVE, new f.ComponentAudio(await f.Audio.load(AUDIO.MOVE), false, false));
            Audio.components.forEach(element => Audio.node.addComponent(element));
        }
    }
    Audio.components = new Map();
    Audio.node = new Audio("Audio");
    Platformer.Audio = Audio;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Audio.js.map