namespace Platformer {
  import f = FudgeCore;

  export class Floor extends f.Node {
    private static mesh: f.MeshSprite = new f.MeshSprite();
    private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(
      f.Vector3.Y(-0.5)
    );

    public constructor(textureImage: f.TextureImage = new f.TextureImage()) {
      super("Floor");
      let coat: f.CoatTextured = new f.CoatTextured();
      coat.texture = textureImage;
      let material: f.Material = new f.Material("Floor", f.ShaderTexture, coat);
      this.addComponent(new f.ComponentTransform());
      this.addComponent(new f.ComponentMaterial(material));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Floor.mesh);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);
    }

    public getRectWorld(): f.Rectangle {
      let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
      let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
      let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

      let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(
        this.mtxWorld,
        Floor.pivot
      );
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: f.Vector2 = new f.Vector2(
        bottomright.x - topleft.x,
        bottomright.y - topleft.y
      );
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}
