namespace Platformer {
  import f = FudgeCore;

  export class Grapple extends f.Node {
    private moveVector: f.Vector3 = new f.Vector3();
    public constructor(_startPos: f.Vector3, _direction: DIRECTION) {
      super("Grapple");
    }
  }
}
