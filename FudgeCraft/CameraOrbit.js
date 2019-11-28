"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
        constructor(_maxRotationX) {
            super("CameraOrbit");
            this.minDistance = 1;
            let cmpTransform = new f.ComponentTransform();
            this.maxRotationX = Math.min(_maxRotationX, 89);
            this.addComponent(cmpTransform);
            this.maxRotationX = _maxRotationX;
            let rotatorX = new f.Node("CameraRotatorX");
            this.appendChild(rotatorX);
            this.setDistance(20);
            let cmpCamera = new f.ComponentCamera();
            cmpCamera.pivot.lookAt(f.Vector3.ZERO());
            cmpCamera.backgroundColor = f.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
        }
        get cmpCamera() {
            let rotatorX = this.getChildrenByName("CameraRotatorX")[0];
            return rotatorX.getComponent(f.ComponentCamera);
        }
        get rotatorX() {
            return this.getChildrenByName("CameraRotatorX")[0];
        }
        rotateY(_delta) {
            this.setRotationY(this.cmpTransform.local.rotation.y + _delta);
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation.y = _angle;
        }
        rotateX(_delta) {
            this.setRotationX(this.cmpTransform.local.rotation.y + _delta);
        }
        setRotationX(_angle) {
            this.cmpTransform.local.rotation.x = _angle;
        }
        setDistance(_distance) {
            this.cmpCamera.pivot.translation = f.Vector3.Y(Math.max(this.minDistance, _distance));
        }
        moveDistance(_delta) {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }
    }
    FudgeCraft.CameraOrbit = CameraOrbit;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=CameraOrbit.js.map