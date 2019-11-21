"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    class Grid extends Map {
        setCube(_cube) {
            console.log(_cube.mtxWorld.translation.toString);
            let round = _cube.mtxWorld.translation.round();
            console.log(round);
        }
    }
    FudgeCraft.Grid = Grid;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Grid.js.map