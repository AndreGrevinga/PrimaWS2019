"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var f = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
        CUBE_TYPE["MAGENTA"] = "Magenta";
        CUBE_TYPE["CYAN"] = "Cyan";
        CUBE_TYPE["GREY"] = "Grey";
    })(CUBE_TYPE = FudgeCraft.CUBE_TYPE || (FudgeCraft.CUBE_TYPE = {}));
    class Cube extends f.Node {
        constructor(_type, _position) {
            super("Cube." + _type);
            let cmpMesh = new f.ComponentMesh(Cube.mesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.9));
            this.addComponent(cmpMesh);
            let cmpMaterial = new f.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new f.Material(CUBE_TYPE.RED, f.ShaderFlat, new f.CoatColored(f.Color.RED))],
                [CUBE_TYPE.GREEN, new f.Material(CUBE_TYPE.GREEN, f.ShaderFlat, new f.CoatColored(f.Color.GREEN))],
                [CUBE_TYPE.BLUE, new f.Material(CUBE_TYPE.BLUE, f.ShaderFlat, new f.CoatColored(f.Color.BLUE))],
                [CUBE_TYPE.MAGENTA, new f.Material(CUBE_TYPE.MAGENTA, f.ShaderFlat, new f.CoatColored(f.Color.MAGENTA))],
                [CUBE_TYPE.YELLOW, new f.Material(CUBE_TYPE.YELLOW, f.ShaderFlat, new f.CoatColored(f.Color.YELLOW))],
                [CUBE_TYPE.CYAN, new f.Material(CUBE_TYPE.CYAN, f.ShaderFlat, new f.CoatColored(f.Color.CYAN))],
                [CUBE_TYPE.GREY, new f.Material(CUBE_TYPE.GREY, f.ShaderFlat, new f.CoatColored(f.Color.LIGHT_GREY))]
            ]);
        }
    }
    Cube.mesh = new f.MeshCube();
    Cube.materials = Cube.createMaterials();
    FudgeCraft.Cube = Cube;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Cube.js.map