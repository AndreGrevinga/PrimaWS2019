"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Background extends f.Node {
        constructor(image, dist) {
            super("Background" + dist.toString());
            this.addComponent(new f.ComponentTransform());
            let coat = new f.CoatTextured();
            let pivot = new f.Matrix4x4();
            coat.texture = image;
            pivot.translateZ(-dist);
            pivot.translateY(0.17);
            pivot.translateX(0.1);
            let material = new f.Material("Background", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
            let cmpMesh = new f.ComponentMesh(Background.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);
        }
    }
    Background.mesh = new f.MeshSprite();
    Platformer.Background = Background;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Background.js.map