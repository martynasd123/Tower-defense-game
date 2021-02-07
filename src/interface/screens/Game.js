import React, {useContext, useEffect, useRef} from "react";
import Assets from "../../game/Assets";
import * as THREE from "three";
import {PrepareLoadingManager} from "../../game/util/AssetUtils";
import {WebGLRenderer} from "three";
import Core, {globals} from "../../game/Core";
import CameraControls from "camera-controls";
import {ServerManagerContext} from "../contexts/ServerManagerProvider";

export default function Game() {

    const canvas = useRef(null);
    const {serverManager} = useContext(ServerManagerContext);

    useEffect(() => {
        if(serverManager == null || canvas == null)
            return;

        const loadingManager = PrepareLoadingManager(Assets);

        //Necessary initialization for camera controls library to work
        CameraControls.install( { THREE: THREE } );

        //Initializing WebGL renderer
        const renderer = new WebGLRenderer({
            antialias: true,
            canvas: canvas.current,
        });

        renderer.gammaOutput = true;
        //We can safely ignore this deprecation warning. More info: https://discourse.threejs.org/t/gltfexported-model-is-way-darker/6686
        renderer.gammaFactor = 2.2;

        const game = new Core();

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        let then = 0;
        const render = (now) => {
            // convert to seconds
            globals.time = now * 0.001;
            // make sure delta time isn't too big.
            globals.deltaTime = Math.min(globals.time - then, 1 / 20);
            then = globals.time;

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                game.updateRendererDisplaySize(canvas.clientWidth, canvas.clientHeight)
            }

            game.render();

            requestAnimationFrame(render);
        }

        loadingManager.onLoad = () => {
            //Starting the actual game
            game.init(renderer, serverManager);
            render(Date.now)
        };

    }, [canvas, serverManager]);

    return (
        <div>
            <canvas ref={canvas} style={
                {
                    width: '100%',
                    height: '100vh',
                    display: 'block'
                }}>

            </canvas>
        </div>
    )
}