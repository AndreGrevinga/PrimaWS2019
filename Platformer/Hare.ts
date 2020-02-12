namespace Platformer {
  import f = FudgeCore;

  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    JUMP = "Jump",
    THROW = "Throw",
    FALL = "Fall"
  }
  export enum DIRECTION {
    LEFT,
    RIGHT
  }

  export class Hare extends f.Node {
    private static sprites: Sprite[];
    private static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
    private static gravity: f.Vector2 = f.Vector2.Y(-3);
    private framecounter: number = 0;
    public speed: f.Vector3 = f.Vector3.ZERO();

    constructor(_name: string = "Hare") {
      super(_name);
      this.addComponent(new f.ComponentTransform());

      for (let sprite of Hare.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => {
            (<NodeSprite>_event.currentTarget).showFrameNext();
          },
          true
        );

        this.appendChild(nodeSprite);
      }

      this.show(ACTION.IDLE);
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_txtImage: f.TextureImage): void {
      Hare.sprites = [];
      let sprite: Sprite = new Sprite(ACTION.IDLE);
      sprite.generateByGrid(
        _txtImage,
        f.Rectangle.GET(0, 0, 60, 80),
        4,
        f.Vector2.ZERO(),
        64,
        f.ORIGIN2D.BOTTOMCENTER
      );
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.WALK);
      sprite.generateByGrid(
        _txtImage,
        f.Rectangle.GET(0, 90, 60, 80),
        6,
        f.Vector2.ZERO(),
        64,
        f.ORIGIN2D.BOTTOMCENTER
      );
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.JUMP);
      sprite.generateByGrid(
        _txtImage,
        f.Rectangle.GET(180, 180, 60, 80),
        3,
        f.Vector2.ZERO(),
        64,
        f.ORIGIN2D.BOTTOMCENTER
      );
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.FALL);
      sprite.generateByGrid(
        _txtImage,
        f.Rectangle.GET(360, 180, 60, 80),
        1,
        f.Vector2.ZERO(),
        64,
        f.ORIGIN2D.BOTTOMCENTER
      );
      Hare.sprites.push(sprite);
    }

    public show(_action: ACTION): void {
      for (let child of this.getChildren())
        child.activate(child.name == _action);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          let direction: number = _direction == DIRECTION.RIGHT ? 1 : -1;
          this.speed.x = Hare.speedMax.x; // * direction;
          this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
          // console.log(direction);
          break;
        case ACTION.JUMP:
          this.speed.y = 2;
          break;
      }
      this.show(_action);
    }

    private update = (_event: f.Eventƒ): void => {
      this.framecounter++;
      if (this.framecounter == 6) {
        this.framecounter = 0;
        this.broadcastEvent(new CustomEvent("showNext"));
      }

      let timeFrame: number = f.Loop.timeFrameGame / 1000;
      this.speed.y += Hare.gravity.y * timeFrame;
      let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      this.checkCollision();
    };

    private checkCollision(): void {
      for (let floor of level.getChildren()) {
        let rect: f.Rectangle = (<Floor>floor).getRectWorld();
        let hit: boolean = rect.isInside(
          this.cmpTransform.local.translation.toVector2()
        );
        if (hit) {
          let translation: f.Vector3 = this.cmpTransform.local.translation;
          translation.y = rect.y;
          this.cmpTransform.local.translation = translation;
          this.speed.y = 0;
        }
      }
    }
  }
}
