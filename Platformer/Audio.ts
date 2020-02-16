namespace Platformer {
  import f = FudgeCore;

  export enum AUDIO {
    BACKGROUND = "Resources/Sound/TropicalJungle.mp3",
    MOVE = "Resources/Sound/Move.mp3"
  }

  export class Audio extends f.Node {
    private static components: Map<AUDIO, f.ComponentAudio> = new Map();
    private static readonly node: Audio = new Audio("Audio");

    public static start(): void {
      Audio.appendAudio();
      game.appendChild(Audio.node);
      f.AudioManager.default.listenTo(Audio.node);
    }

    public static play(_audio: AUDIO, _on: boolean = true): void {
      f.Debug.log(_audio);
      Audio.components.get(_audio).play(_on);
    }

    private static async appendAudio(): Promise<void> {
      Audio.components.set(
        AUDIO.BACKGROUND,
        new f.ComponentAudio(await f.Audio.load(AUDIO.BACKGROUND), true, false)
      );
      Audio.components.set(
        AUDIO.MOVE,
        new f.ComponentAudio(await f.Audio.load(AUDIO.MOVE), false, false)
      );
      Audio.components.forEach(element => Audio.node.addComponent(element));
    }
  }
}
