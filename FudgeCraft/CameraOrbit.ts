namespace FudgeCraft {
  import f = FudgeCore;
  export class CameraOrbit extends f.Node {
    maxRotationX: number;
    minDistance: number = 1;
    constructor(_maxRotationX: number) {
      super("CameraOrbit");
      let cmpTransform = new f.ComponentTransform();
      this.maxRotationX = Math.min(_maxRotationX, 89);
      this.addComponent(cmpTransform);
      this.maxRotationX = _maxRotationX;
      let rotatorX = new f.Node("CameraRotatorX");
      this.appendChild(rotatorX);
      this.setDistance(20);
      let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
      cmpCamera.pivot.lookAt(f.Vector3.ZERO());
      cmpCamera.backgroundColor = f.Color.WHITE;
      rotatorX.addComponent(cmpCamera);
    }
    get cmpCamera(): f.ComponentCamera {
      let rotatorX: f.Node = this.getChildrenByName("CameraRotatorX")[0];
      return rotatorX.getComponent(f.ComponentCamera);
    }
    get rotatorX(): f.Node {
      return this.getChildrenByName("CameraRotatorX")[0];
    }
    rotateY(_delta: number) {
      this.setRotationY(this.cmpTransform.local.rotation.y + _delta);
    }
    setRotationY(_angle: number) {
      this.cmpTransform.local.rotation.y = _angle;
    }
    rotateX(_delta: number) {
      this.setRotationX(this.cmpTransform.local.rotation.y + _delta);
    }
    setRotationX(_angle: number) {
      this.cmpTransform.local.rotation.x = _angle;
    }
    setDistance(_distance: number) {
      this.cmpCamera.pivot.translation = f.Vector3.Y(
        Math.max(this.minDistance, _distance)
      );
    }
    public moveDistance(_delta: number) {
      this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
    }
  }
}
