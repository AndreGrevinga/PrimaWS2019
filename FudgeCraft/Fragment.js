"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var f = FudgeCore;
    class Fragment extends f.Node {
        constructor(_shape, _position = f.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            this.position = new f.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type;
                do {
                    type = Fragment.getRandomEnum(FudgeCraft.CUBE_TYPE);
                } while (type == FudgeCraft.CUBE_TYPE.GREY);
                let vctPosition = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new FudgeCraft.Cube(type, vctPosition);
                this.appendChild(cube);
            }
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
        }
        static getRandom() {
            let shape = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment = new Fragment(shape);
            return fragment;
        }
        static getShapeArray() {
            return [
                // corner
                [
                    [0, 0, 0],
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ],
                // quad
                [
                    [0, 0, 0],
                    [1, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                // s
                [
                    [0, 0, 0],
                    [0, 1, 0],
                    [1, 0, 0],
                    [1, -1, 0]
                ]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    FudgeCraft.Fragment = Fragment;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Fragment.js.map