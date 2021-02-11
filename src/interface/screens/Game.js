import React, {useContext, useEffect, useRef, useState} from "react";
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
    const [playerTurnIndex, setPlayerTurnIndex] = useState(null);
    const [turnTime, setTurnTime] = useState(null);
    const [players, setPlayers] = useState([]);
    const [bigTextVisible, setBigTextVisible] = useState(false)
    const [bigText, setBigText] = useState("");

    const onRoomStateChanged = (state) => {
        const stateParsed = JSON.parse(JSON.stringify(state)).gameState;
        setPlayerTurnIndex(stateParsed.playerTurnIndex);
        setTurnTime(stateParsed.turnTime)
        setPlayers(stateParsed.players);
    }

    const showBigText = (text) => {
        setBigText(text);
        setBigTextVisible(true);
        setTimeout(() => {
            setBigTextVisible(false);
        }, 3000)
    }

    useEffect(() => {
        if(players.length === 0)
            return;
        showBigText(`${players[playerTurnIndex].authUser.username}'s turn`)
    }, [playerTurnIndex])

    useEffect(() => {
        if(serverManager == null || canvas == null)
            return;

        serverManager.onRoomStateChange(onRoomStateChanged)

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

            <div style={{position: 'absolute', top: 10, left: 10}}>
                {players.map((player, index) => {
                    if(playerTurnIndex == index)
                        return <h1 style={{color: 'red'}} key={player.authUser.id}>{player.authUser.username}</h1>
                    else
                        return <h2 key={player.authUser.id}>{player.authUser.username}</h2>
                })}
            </div>
            {bigTextVisible && <div style={{position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <h1 style={{color: 'white', fontSize: 80}}>{bigText}</h1>
            </div>}
            {turnTime != null && <div style={{position: 'absolute', bottom: 10, left: 10}}>
                <h2 style={{color: 'red'}}>{turnTime} sec. left</h2>
            </div>}
        </div>
    )
}