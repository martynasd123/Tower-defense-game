import {CubeTextureLoader, DefaultLoadingManager, FontLoader} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Prepares a LoadingManager instance
 * @param assets The object to load assets into (and to read their paths from)
 * @returns {LoadingManager} The prepared LoadingManager
 */
export function PrepareLoadingManager(assets){
    const loadingManager = DefaultLoadingManager;

    //Loading GLTF models
    const gltfLoader = new GLTFLoader(loadingManager);
    for (const model of Object.values(assets.models)) {
        gltfLoader.load(model.path, (gltf) => {
            model.gltf = gltf;
        });
    }

    //Loading skyboxes (cube textures)
    const skyboxLoader = new CubeTextureLoader(loadingManager);
    for (const skybox of Object.values(assets.skyboxes)) {
        skyboxLoader.load(skybox.paths, (cubeTexture) => {
            skybox.skybox = cubeTexture;
        });
    }

    //Loading fonts
    const fontLoader = new FontLoader();
    for (const font of Object.values(assets.fonts)) {
        fontLoader.load(font.path, (loadedFont) => {
            font.font = loadedFont;
        });
    }

    return loadingManager;
}