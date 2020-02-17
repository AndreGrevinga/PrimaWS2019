namespace Platformer {
  export enum TYPE {
    FLOOR = "Floor",
    SPAWNPOINT = "Spawnpoint"
  }

  interface TranslationJSON {
    x: number;
    y: number;
  }

  interface ScaleJSON {
    x: number;
    y: number;
  }

  interface GenericJSON {
    type: string;
    texture: string;
    translation: TranslationJSON;
    scale: ScaleJSON;
  }

  interface LevelJSON {
    objects: GenericJSON[];
  }

  export class LevelLoader {
    public static generateLevel(_filename: string): void {
      let file: XMLHttpRequest = new XMLHttpRequest();
      file.open("GET", _filename, false);
      file.send(null);
      let levelJSON: LevelJSON = JSON.parse(file.responseText);
      for (let object of levelJSON.objects) {
        this.generateObject(object);
      }
    }

    private static generateObject(_object: GenericJSON): void {
      switch (_object.type) {
        case TYPE.FLOOR:
          let floorJson: GenericJSON = _object;
          let image: HTMLImageElement = <HTMLImageElement>(
            document.getElementById(_object.texture)
          );
          let texture: f.TextureImage = new f.TextureImage();
          texture.image = image;
          console.log(image.src);
          let floor: Floor = new Floor(texture);
          floor.cmpTransform.local.translate(
            new f.Vector3(floorJson.translation.x, floorJson.translation.y, 0)
          );
          floor.cmpTransform.local.scale(
            new f.Vector3(floorJson.scale.x, floorJson.scale.y, 0)
          );
          level.appendChild(floor);
          break;
      }
    }
  }
}
