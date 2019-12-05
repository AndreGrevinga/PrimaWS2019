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
      this.push(
        f.Vector3.ZERO(),
        new GridElement(new Cube(CUBE_TYPE.GREY, f.Vector3.ZERO()))
      );
    }

    push(_position: f.Vector3, _element: GridElement = null): void {
      let key: string = this.toKey(_position);
      this.set(key, _element);
      if (_element) game.appendChild(_element.cube);
    }

    pull(_position: f.Vector3): GridElement {
      let key: string = this.toKey(_position);
      let element: GridElement = this.get(key);
      return element;
    }

    pop(_position: f.Vector3): GridElement {
      let key: string = this.toKey(_position);
      let element: GridElement = this.get(key);
      this.delete(key);
      if (element) game.removeChild(element.cube);
      return element;
    }

    toKey(_position: f.Vector3): string {
      let position: f.Vector3 = _position.map(Math.round);
      let key: string = position.toString();
      return key;
    }
    getNeighbours(_cube: Cube): Set<Cube> {
      let neighbours: Set<Cube> = new Set();
      let position: f.Vector3 = _cube.mtxWorld.translation;
      let name: string = _cube.name;
      [-1, 1].forEach(number => {
        neighbours.add(
          this.pull(new f.Vector3(position.x + number, 0, 0)).cube
        );
        neighbours.add(
          this.pull(new f.Vector3(position.y + number, 0, 0)).cube
        );
        neighbours.add(
          this.pull(new f.Vector3(position.z + number, 0, 0)).cube
        );
      });
      neighbours.forEach(cube => {
        if (cube.name != name) {
          neighbours.delete(cube);
        }
      });
      return neighbours;
    }
  }
}
