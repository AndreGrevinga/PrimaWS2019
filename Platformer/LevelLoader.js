"use strict";
var Platformer;
(function (Platformer) {
    let TYPE;
    (function (TYPE) {
        TYPE["FLOOR"] = "Floor";
        TYPE["SPAWNPOINT"] = "Spawnpoint";
    })(TYPE = Platformer.TYPE || (Platformer.TYPE = {}));
    class LevelLoader {
        static generateLevel(_filename) {
            let file = new XMLHttpRequest();
            file.open("GET", _filename, false);
            file.send(null);
            let levelJSON = JSON.parse(file.responseText);
            for (let object of levelJSON.objects) {
                this.generateObject(object);
            }
        }
        static generateObject(_object) {
            switch (_object.type) {
                case TYPE.FLOOR:
                    let floorJson = _object;
                    let image = (document.getElementById(_object.texture));
                    let texture = new Platformer.f.TextureImage();
                    texture.image = image;
                    console.log(image.src);
                    let floor = new Platformer.Floor(texture);
                    floor.cmpTransform.local.translate(new Platformer.f.Vector3(floorJson.translation.x, floorJson.translation.y, 0));
                    floor.cmpTransform.local.scale(new Platformer.f.Vector3(floorJson.scale.x, floorJson.scale.y, 0));
                    Platformer.level.appendChild(floor);
                    break;
            }
        }
    }
    Platformer.LevelLoader = LevelLoader;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=LevelLoader.js.map