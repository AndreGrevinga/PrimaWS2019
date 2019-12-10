namespace FudgeCraft {
  export class GridElement {
    public cube: Cube;

    constructor(_cube: Cube = null) {
      this.cube = _cube;
    }
  }

  export class Grid extends Map<string, GridElement> {
    // private grid: Map<string, Cube> = new Map();
    constructor() {
      super();
    }

    public push(_position: f.Vector3, _element: GridElement = null): void {
      let key: string = this.toKey(_position);
      this.set(key, _element);
      if (_element) game.appendChild(_element.cube);
    }

    public pull(_position: f.Vector3): GridElement {
      let key: string = this.toKey(_position);
      let element: GridElement = this.get(key);
      return element;
    }

    public pop(_position: f.Vector3): GridElement {
      let key: string = this.toKey(_position);
      let element: GridElement = this.get(key);
      this.delete(key);
      if (element) game.removeChild(element.cube);
      return element;
    }

    public findNeigbors(_of: f.Vector3): GridElement[] {
      let found: GridElement[] = [];
      let offsets: number[][] = [
        [0, 0, 1],
        [0, 0, -1],
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0]
      ];
      for (let offset of offsets) {
        let posNeighbor: f.Vector3 = f.Vector3.SUM(
          _of,
          new f.Vector3(...offset)
        );
        let neighbor: GridElement = grid.pull(posNeighbor);
        if (neighbor) found.push(neighbor);
      }
      return found;
    }

    private toKey(_position: f.Vector3): string {
      let position: f.Vector3 = _position.map(Math.round);
      let key: string = position.toString();
      return key;
    }
  }
}
