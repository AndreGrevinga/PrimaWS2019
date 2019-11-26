namespace FudgeCraft {
    import f = FudgeCore;
    export class Fragment extends f.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: f.Vector3 = new f.Vector3(0, 0, 0);

        constructor(_shape: number, _position: f.Vector3 = f.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            let shape: number[][] = Fragment.shapes[_shape];
            for (let position of shape) {
                let type: CUBE_TYPE;
                do {
                    type = Fragment.getRandomEnum(CUBE_TYPE);
                } while (type == CUBE_TYPE.GREY);
                let vctPosition: f.Vector3 = f.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
        }

        public static getRandom(): Fragment {
            let shape: number = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment: Fragment = new Fragment(shape);
            return fragment;
        }

        private static getShapeArray(): number[][][] {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }

        private static getRandomEnum<T>(_enum: { [key: string]: T }): T {
            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
}