namespace Platformer {
  import f = FudgeCore;

  export class Background extends f.Node {
    private static mesh: f.MeshSprite = new f.MeshSprite();
    private static coat: f.CoatTextured = new f.CoatTextured();
    private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(
      f.Vector3.Z(-10)
    );
    private static material: f.Material = new f.Material(
      "Background",
      f.ShaderTexture,
      Background.coat
    );
    public constructor(image: f.TextureImage) {
      super("Background");
      this.addComponent(new f.ComponentTransform());
      Background.coat.texture = image;
      this.addComponent(new f.ComponentMaterial(Background.material));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Background.mesh);
      cmpMesh.pivot = Background.pivot;
      this.addComponent(cmpMesh);
    }
  }
}
