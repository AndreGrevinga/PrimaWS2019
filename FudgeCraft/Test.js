"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    function startTests() {
        testGrid();
        testCombos();
    }
    FudgeCraft.startTests = startTests;
    function testCombos() {
        let setup = [
            {
                type: FudgeCraft.CUBE_TYPE.RED,
                positions: [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, -1, 0],
                    [0, 0, -1],
                    [-1, 0, 0]
                ]
            },
            {
                type: FudgeCraft.CUBE_TYPE.GREEN,
                positions: [
                    [-5, 0, 0],
                    [-5, 0, 1],
                    [-5, 1, 2],
                    [-5, -1, 2]
                ]
            },
            {
                type: FudgeCraft.CUBE_TYPE.CYAN,
                positions: [
                    [3, 0, 0],
                    [3, 0, 1],
                    [3, 0, 2],
                    [3, 0, 3],
                    [3, 0, 4],
                    [3, 0, 5],
                    [3, 0, 6],
                    [3, 0, -1],
                    [3, 0, -2]
                ]
            }
        ];
        setup.forEach((_combo) => {
            _combo.positions.forEach((_position) => {
                let position = new FudgeCraft.f.Vector3(..._position);
                let cube = new FudgeCraft.Cube(_combo.type, position);
                FudgeCraft.grid.push(position, new FudgeCraft.GridElement(cube));
            });
        });
        let startElements = setup.map((_combo) => {
            return FudgeCraft.grid.pull(new FudgeCraft.f.Vector3(..._combo.positions[0]));
        });
        let combos = new FudgeCraft.Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal = element.cube.cmpTransform.local;
                console.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                mtxLocal.scale(FudgeCraft.f.Vector3.ONE(0.5));
            }
        FudgeCraft.updateDisplay();
    }
    function testGrid() {
        let cube = new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.GREEN, FudgeCraft.f.Vector3.ZERO());
        FudgeCraft.grid.push(cube.cmpTransform.local.translation, new FudgeCraft.GridElement(cube));
        let pulled = FudgeCraft.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = FudgeCraft.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = FudgeCraft.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Test.js.map