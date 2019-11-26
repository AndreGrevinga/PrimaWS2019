"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    function test() {
        testGrid();
    }
    FudgeCraft.test = test;
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