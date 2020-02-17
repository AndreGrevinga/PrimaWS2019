namespace Platformer {
  import f = FudgeCore;

  export class Background extends f.Node {
    private static mesh: f.MeshSprite = new f.MeshSprite();

    public constructor(image: f.TextureImage, dist: number) {
      super("Background" + dist.toString());
      this.addComponent(new f.ComponentTransform());
      let coat: f.CoatTextured = new f.CoatTextured();
      let pivot: f.Matrix4x4 = new f.Matrix4x4();
      coat.texture = image;
      pivot.translateZ(-dist);
      pivot.translateY(0.17);
      pivot.translateX(0.1);
      let material: f.Material = new f.Material(
        "Background",
        f.ShaderTexture,
        coat
      );
      this.addComponent(new f.ComponentMaterial(material));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Background.mesh);
      cmpMesh.pivot = pivot;
      this.addComponent(cmpMesh);
    }
  }
}
