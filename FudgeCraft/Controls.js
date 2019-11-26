"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    class Control extends FudgeCraft.f.Node {
        constructor() {
            super("Control");
            this.addComponent(new FudgeCraft.f.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[FudgeCraft.f.KEYBOARD_CODE.ARROW_UP] = { rotation: FudgeCraft.f.Vector3.X(-1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.ARROW_DOWN] = { rotation: FudgeCraft.f.Vector3.X(1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.ARROW_LEFT] = { rotation: FudgeCraft.f.Vector3.Y(-1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: FudgeCraft.f.Vector3.Y(1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.W] = { translation: FudgeCraft.f.Vector3.Z(-1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.S] = { translation: FudgeCraft.f.Vector3.Z(1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.A] = { translation: FudgeCraft.f.Vector3.X(-1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.D] = { translation: FudgeCraft.f.Vector3.X(1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.SHIFT_LEFT] = controls[FudgeCraft.f.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: FudgeCraft.f.Vector3.Y(1) };
            controls[FudgeCraft.f.KEYBOARD_CODE.CTRL_LEFT] = controls[FudgeCraft.f.KEYBOARD_CODE.CTRL_RIGHT] = { translation: FudgeCraft.f.Vector3.Y(-1) };
            return controls;
        }
        setFragment(_fragment) {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }
        move(_transformation) {
            let mtxControl = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxControl.translate(_transformation.translation);
        }
        checkCollisions(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            let save = [mtxContainer.getMutator(), mtxFragment.getMutator()];
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
            FudgeCraft.f.RenderManager.update();
            let collisions = [];
            for (let cube of this.fragment.getChildren()) {
                let element = FudgeCraft.grid.pull(cube.mtxWorld.translation);
                if (element)
                    collisions.push({ element, cube });
            }
            mtxContainer.mutate(save[0]);
            mtxFragment.mutate(save[1]);
            return collisions;
        }
        freeze() {
            for (let cube of this.fragment.getChildren()) {
                let position = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                FudgeCraft.grid.push(position, new FudgeCraft.GridElement(cube));
            }
        }
    }
    Control.transformations = Control.defineControls();
    FudgeCraft.Control = Control;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Controls.js.map