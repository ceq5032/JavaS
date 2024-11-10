import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);




// Create a torus geometry and material
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x171c52 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lighting setup
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(pointLight, ambientLight);

// Define textMesh
let textMesh;

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', function (font) {
    console.log("Font loaded successfully");

    const textGeometry = new TextGeometry('Welcome!', {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x0f56d1 });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-5, 0, 0);
    scene.add(textMesh);
}, undefined, function (error) {
    console.error("Font failed to load", error);
});

const controls = new OrbitControls(camera, renderer.domElement);

// Function to add stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(400).fill().forEach(addStar);

// Set background texture
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// Avatar
const chelsTexture = new THREE.TextureLoader().load('images/chels.jpg');
const chels = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: chelsTexture })
);
scene.add(chels);
chels.position.z = 45;
chels.position.y = 0;
chels.position.x = 5;

// Sphere with texture
const texTexture = new THREE.TextureLoader().load('images/texture.jpg');
const tex = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: texTexture })
);
scene.add(tex);
tex.position.z = 60;
tex.position.setX(-15);

// Move camera on scroll
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    torus.rotation.x += 0.05;
    torus.rotation.y += 0.05;
    torus.rotation.z += 0.05;

    chels.rotation.y += 0.05;
    chels.rotation.z += 0.05;

    tex.rotation.x += 0.05;
    tex.rotation.y += 0.05;
    tex.rotation.z += 0.05;


    if (textMesh) {
        textMesh.rotation.x += 0.05;
        textMesh.rotation.y += 0.05;
    }

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    chels.rotation.y += 0.01;
    chels.rotation.z += 0.004;
    chels.rotation.x += 0.01;

    tex.rotation.x += 0.01;
    tex.rotation.y += 0.01;
    tex.rotation.z += 0.005;


    if (textMesh) {
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
