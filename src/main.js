"use strict";

let DOMVIDEO = null;
let animationMixer = null;
let gltfData = null;
let scene = new THREE.Scene();

export function main() { // entry point
    DOMVIDEO = document.getElementById('webcamVideo');
    WebARRocksMediaStreamAPIHelper.get(DOMVIDEO, init, function () {
        alert('Cannot get video bro :(');
    }, {
        "video": { facingMode: { ideal: 'environment' } },
        "audio": false
    })
    // Instantiate a loader
    const loader = new GLTFLoader();
    // Load a glTF resource
    loader.load(
        // resource URL
        'animations/oranges.glb',
        // called when the resource is loaded
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            gltfData = gltf;

            if (gltf.animations && gltf.animations.length > 0) {
                animationMixer = new THREE.AnimationMixer(model);
            }
        },
        // called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened: ' + error);
        }
    );
}
// Make it globally accessible for onload
window.main = main;

function init() {
    const ARCanvas = document.getElementById('ARCanvas');

    WebARRocksObjectThreeHelper.init({
        video: DOMVIDEO,
        ARCanvas: ARCanvas,
        threeCanvas: document.getElementById('threeCanvas'),
        NNPath: 'neuralNets/NN_Object3DCheburashka_2025-09-29.json',
        callbackReady: start,
        loadNNOptions: {
            notHereFactor: 0.0,
            paramsPerLabel: {
                Cheburashka: {
                    thresholdDetect: 0.98
                }
            }
        },
        nDetectsPerLoop: 3, // 0 -> adaptative
        detectOptions: {
            isKeepTracking: true,
            isSkipConfirmation: false,
            thresholdDetectFactor: 0.8,
            cutShader: 'median',
            thresholdDetectFactorUnstitch: 0.2,
            trackingFactors: [0.5, 0.4, 1.5]
        },
        cameraFov: 0, // In degrees, camera vertical FoV. 0 -> auto mode
        followZRot: true,
        scanSettings: {
            nScaleLevels: 2,
            scale0Factor: 0.8,
            overlapFactors: [2, 2, 2], // between 0 (max overlap) and 1 (no overlap). Along X,Y,S
            scanCenterFirst: true
        },
        isFullScreen: true,
        stabilizerOptions: {}
    });
}

// Executed when WebAR.rocks.object is initialized and NN is loaded:
function start() {
    WebARRocksObjectThreeHelper.add('Cheburashka', gltfData.scene);
    const action = animationMixer.clipAction(gltfData.animations[0]);
    action.setLoop(THREE.LoopOnce);
    WebARRocksObjectThreeHelper.set_callback('Cheburashka', 'ondetect', function () {
        console.log('Cheburashka detected!!')
        action.play();
    });
    WebARRocksObjectThreeHelper.set_callback('Cheburashka', 'onloose', animationMixer.reset);
    animate();
}

//main loop (rendering + detecting)
function animate() {
    animationMixer.update(0.016 * 10); // 0.016 = 60fps
    WebARRocksObjectThreeHelper.animate();
    window.requestAnimationFrame(animate);
}


function resize() {
    WebARRocksObjectThreeHelper.resize();
}

window.addEventListener('load', main);
window.addEventListener('resize', resize);
