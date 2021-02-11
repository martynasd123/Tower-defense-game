const Assets = {
    models: {
        cannon: {
            path: '/assets/models/Cannon.gltf',
            gltf: null,
        },
        tower: { //Tower with 5 HP
            path: '/assets/models/Tower.gltf',
            gltf: null,
        },
        tower_4_hp: { //Tower with 4 HP
            path: '/assets/models/TowerDamaged1.gltf',
            gltf: null,
        },
        tower_3_hp: { //Tower with 3 HP
            path: '/assets/models/TowerDamaged2.gltf',
            gltf: null,
        },
        tower_2_hp: { //Tower with 2 HP
            path: '/assets/models/TowerDamaged3.gltf',
            gltf: null,
        },
        tower_1_hp: { //Tower with 1 hp
            path: '/assets/models/TowerDamaged4.gltf',
            gltf: null,
        },
        tower_0_hp: { //Defeated tower (For now same model as 1HP)
            path: '/assets/models/TowerDestroyed.gltf',
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