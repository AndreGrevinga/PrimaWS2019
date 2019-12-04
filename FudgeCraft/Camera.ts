namespace FudgeCraft {
  import f = FudgeCore;

  export class CameraOrbit extends f.Node {
    //rotatorX: f.Node;
    maxRotX: number = 75;
    minDistance: number = 10;

    constructor(_maxRotX: number) {
      super("CameraOrbit");

      this.maxRotX = Math.min(_maxRotX, 89);

      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      this.addComponent(cmpTransform);

      let rotatorX: f.Node = new f.Node("CameraRotX");
      rotatorX.addComponent(new f.ComponentTransform());
      this.appendChild(rotatorX);

      let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
      cmpCamera.backgroundColor = f.Color.WHITE;
      rotatorX.addComponent(cmpCamera);
      this.setDistance(20);
    }

    get cmpCamera(): f.ComponentCamera {
      return this.rotatorX.getComponent(f.ComponentCamera);
    }

    get rotatorX(): f.Node {
      return this.getChildrenByName("CameraRotX")[0];
    }

    setDistance(_distance: number): void {
      let newDistance: number = Math.max(this.minDistance, _distance);
      this.cmpCamera.pivot.translation = f.Vector3.Z(newDistance);
    }

    moveDistance(_delta: number): void {
      this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
    }

    setRotationY(_angle: number): void {
      this.cmpTransform.local.rotation = f.Vector3.Y(_angle);
    }

    setRotationX(_angle: number): void {
      // @Jonas: rotation.z = ... verändert nur die Koordinate einer Kopie
      _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
      this.rotatorX.cmpTransform.local.rotation = f.Vector3.X(_angle);
    }

    rotateY(_delta: number): void {
      this.cmpTransform.local.rotateY(_delta);
    }

    rotateX(_delta: number): void {
      let angle: number = this.rotatorX.cmpTransform.local.rotation.x + _delta;
      this.setRotationX(angle);
    }
    translate(_delta: number): void {
      let distance: number = this.cmpCamera.pivot.translation.z + _delta;
      this.setDistance(distance);
    }
  }
}
