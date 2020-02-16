"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Grapple extends f.Node {
        constructor() {
            super("Grapple");
            this.moveVector = new f.Vector3();
        }
    }
    Platformer.Grapple = Grapple;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Grapple.js.map