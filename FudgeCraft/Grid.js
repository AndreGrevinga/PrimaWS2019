"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    FudgeCraft.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(FudgeCraft.f.Vector3.ZERO(), new GridElement(new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.GREY, FudgeCraft.f.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                FudgeCraft.game.appendChild(_element.cube);
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                FudgeCraft.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    FudgeCraft.Grid = Grid;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Grid.js.map