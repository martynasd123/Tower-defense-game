const Assets = {
    models: {
        cannon: {
            path: '/assets/models/Cannon.gltf',
            gltf: null,
        },
        tower: {
            path: '/assets/models/Tower.gltf',
            gltf: null,
        },
        terrain: {
            path: '/assets/models/Terrain.gltf',
            gltf: null,
        },
    },
    skyboxes: {
        sky: {
            paths: [
                '/assets/textures/skybox/TropicalSunnyDay_px.jpg',
                '/assets/textures/skybox/TropicalSunnyDay_nx.jpg',
                '/assets/textures/skybox/TropicalSunnyDay_py.jpg',
                '/assets/textures/skybox/TropicalSunnyDay_ny.jpg',
                '/assets/textures/skybox/TropicalSunnyDay_pz.jpg',
                '/assets/textures/skybox/TropicalSunnyDay_nz.jpg'
            ],
            skybox: null,
        }
    },
    fonts: {
        roboto_regular: {
            path: '/assets/fonts/roboto_regular.json',
            font: ''
        }
    }
}

export default Assets;