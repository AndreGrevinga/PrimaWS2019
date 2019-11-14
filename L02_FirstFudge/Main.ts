namespace L02_FirstFudge {
    interface KeyPressed {
        [code: string]: boolean;
    }

    import f = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;

    let ball: f.Node;
    let paddleLeft: f.Node;
    let paddleRight: f.Node;
    let pong: f.Node;
    let scoreLeft: number = 0;
    let scoreRight: number = 0;
    let isBallMoving: boolean = false;
    let ballSpeed: f.Vector3 = new f.Vector3(0.2, -0.2, 0);
    let wallTop: f.Node;
    let wallBottom: f.Node;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        pong = createPong();
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(50);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }


    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }
    function update(_event: Event): void {
        if (keysPressed[f.KEYBOARD_CODE.SPACE]) {
            isBallMoving = true;
        }
        if (isBallMoving) {
            if ((keysPressed[f.KEYBOARD_CODE.ARROW_UP]) && !detectHit(wallTop, paddleRight.cmpTransform.local.translation))
                paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
            if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN] && !detectHit(wallBottom, paddleRight.cmpTransform.local.translation))
                paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
            if (keysPressed[f.KEYBOARD_CODE.W] && !detectHit(wallTop, paddleLeft.cmpTransform.local.translation))
                paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
            if (keysPressed[f.KEYBOARD_CODE.S] && !detectHit(wallBottom, paddleLeft.cmpTransform.local.translation))
                paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));

            for (let node of pong.getChildren()) {
                if (node.name == "Ball")
                    continue;
                if (detectHit(node, ball.cmpTransform.local.translation))
                    processHit(node);
            }
            moveBall();
            f.RenderManager.update();
            viewport.draw();
        }
    }

    function moveBall(): void {
        ball.cmpTransform.local.translate(ballSpeed);
    }

    function detectHit(_node: f.Node, _position: f.Vector3): boolean {
        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;
        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }
    function resetBallAndPaddles(): void {
        isBallMoving = false;
        ball.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        ballSpeed = new f.Vector3(0.2, -0.2, 0);
        paddleLeft.cmpTransform.local.translation = new f.Vector3(-20, 0, 0);
        paddleRight.cmpTransform.local.translation = new f.Vector3(20, 0, 0);
    }
    function processHit(_node: f.Node): void {
        switch (_node.name) {
            case "WallBottom":
            case "WallTop":
                ballSpeed.y *= -1;
                break;
            case "WallLeft":
                scoreRight += 1;
                console.log(scoreRight);
                resetBallAndPaddles();
                break;
            case "WallRight":
                scoreLeft += 1;
                console.log(scoreLeft);
                resetBallAndPaddles();
                break;
            case "PaddleLeft":
            case "PaddleRight":
                ballSpeed.x *= -1.2;
                ballSpeed.y *= 1.2;
                break;
            default:
                console.warn("Oh, no I hit something unknown", _node.name);
                break;
        }
    }
    function createNode(_name: string, _mesh: f.Mesh, _material: f.Material, _translation: f.Vector2, _scaling: f.Vector2): f.Node {
        let node: f.Node = new f.Node(_name);
        node.addComponent(new f.ComponentTransform);
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;
    }
    function createPong(): f.Node {
        let pong: f.Node = new f.Node("Pong");
        let meshQuad: f.MeshQuad = new f.MeshQuad();
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));

        pong.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new f.Vector2(22, 0), new f.Vector2(1, 30)));
        pong.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new f.Vector2(-22, 0), new f.Vector2(1, 30)));

        wallTop = createNode("WallTop", meshQuad, mtrSolidWhite, new f.Vector2(0, 15), new f.Vector2(45, 1));
        wallBottom = createNode("WallBottom", meshQuad, mtrSolidWhite, new f.Vector2(0, -15), new f.Vector2(45, 1));
        ball = createNode("Ball", meshQuad, mtrSolidWhite, f.Vector2.ZERO, new f.Vector2(1, 1));
        paddleLeft = createNode("PaddleLeft", meshQuad, mtrSolidWhite, new f.Vector2(-20, 0), new f.Vector2(1, 4));
        paddleRight = createNode("PaddleRight", meshQuad, mtrSolidWhite, new f.Vector2(20, 0), new f.Vector2(1, 4));

        pong.appendChild(ball);
        pong.appendChild(wallTop);
        pong.appendChild(wallBottom);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
}