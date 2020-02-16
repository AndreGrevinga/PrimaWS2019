"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Background extends f.Node {
        constructor(image) {
            super("Background");
            this.addComponent(new f.ComponentTransform());
            Background.coat.texture = image;
            this.addComponent(new f.ComponentMaterial(Background.material));
            let cmpMesh = new f.ComponentMesh(Background.mesh);
            cmpMesh.pivot = Background.pivot;
            this.addComponent(cmpMesh);
        }
    }
    Background.mesh = new f.MeshSprite();
    Background.coat = new f.CoatTextured();
    Background.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Z(-10));
    Background.material = new f.Material("Background", f.ShaderTexture, Background.coat);
    Platformer.Background = Background;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Background.js.map