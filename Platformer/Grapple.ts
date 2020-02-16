namespace Platformer {
  import f = FudgeCore;

  export class Grapple extends f.Node {
    private moveVector: f.Vector3 = new f.Vector3();
    public constructor() {
      super("Grapple");
    }
  }
}
