"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["THROW"] = "Throw";
        ACTION["FALL"] = "Fall";
    })(ACTION = Platformer.ACTION || (Platformer.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = Platformer.DIRECTION || (Platformer.DIRECTION = {}));
    class Hare extends f.Node {
        constructor(_name = "Hare") {
            super(_name);
            this.framecounter = 0;
            this.speed = f.Vector3.ZERO();
            this.update = (_event) => {
                this.framecounter++;
                if (this.framecounter == 6) {
                    this.framecounter = 0;
                    this.broadcastEvent(new CustomEvent("showNext"));
                }
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Hare.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Hare.sprites) {
                let nodeSprite = new Platformer.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => {
                    _event.currentTarget.showFrameNext();
                }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Hare.sprites = [];
            let sprite = new Platformer.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 0, 60, 80), 4, f.Vector2.ZERO(), 64, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new Platformer.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 90, 60, 80), 6, f.Vector2.ZERO(), 64, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new Platformer.Sprite(ACTION.JUMP);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(180, 180, 60, 80), 3, f.Vector2.ZERO(), 64, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new Platformer.Sprite(ACTION.FALL);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(360, 180, 60, 80), 1, f.Vector2.ZERO(), 64, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = _direction == DIRECTION.RIGHT ? 1 : -1;
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
        checkCollision() {
            for (let floor of Platformer.level.getChildren()) {
                let rect = floor.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Hare.speedMax = new f.Vector2(1.5, 5); // units per second
    Hare.gravity = f.Vector2.Y(-3);
    Platformer.Hare = Hare;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Hare.js.map