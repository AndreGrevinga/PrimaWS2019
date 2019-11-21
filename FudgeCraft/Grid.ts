namespace FudgeCraft {
    import f = FudgeCore;
    export class Grid extends Map<string, Cube> {        
        setCube(_cube: Cube): void {
            console.log(_cube.mtxWorld.translation.toString)
            let round: f.Vector3 = _cube.mtxWorld.translation.round()
            console.log(round)
        } 
    }
}