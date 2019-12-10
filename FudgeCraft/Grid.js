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
        findNeigbors(_of) {
            let found = [];
            let offsets = [
                [0, 0, 1],
                [0, 0, -1],
                [0, 1, 0],
                [0, -1, 0],
                [1, 0, 0],
                [-1, 0, 0]
            ];
            for (let offset of offsets) {
                let posNeighbor = FudgeCraft.f.Vector3.SUM(_of, new FudgeCraft.f.Vector3(...offset));
                let neighbor = FudgeCraft.grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
            }
            return found;
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