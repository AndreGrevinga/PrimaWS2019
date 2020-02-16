"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor(textureImage = new f.TextureImage()) {
            super("Floor");
            let coat = new f.CoatTextured();
            coat.texture = textureImage;
            let material = new f.Material("Floor", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(material));
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new f.MeshSprite();
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    Platformer.Floor = Floor;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Floor.js.map