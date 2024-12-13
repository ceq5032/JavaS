import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// Select the button
const goToTimelineButton = document.getElementById('goToTimeline');

// Add click event
goToTimelineButton.addEventListener('click', () => {
    window.location.href = 'timeLine.html';
});


goToTimelineButton.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'timeline.html';
    }, 500);
});



//to resize with screen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



//Create a torus geometry and material
//const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshStandardMaterial({ color: 0x6d180f });
//const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);
//torus.position.z = -5;
//torus.position.y = 0;
//torus.position.x = 0;


// Lighting setup
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(1, 1, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(pointLight, ambientLight);

renderer.render(scene, camera);

// Define textMesh - spinning word
let textMesh;

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', function (font) {
    console.log("Font loaded successfully");

    const textGeometry = new TextGeometry('" Y o u  w i l l  t r y . "', {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 0
   });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xa21818 });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-8, 0, 5);
    scene.add(textMesh);
    textMesh.visible = false;  //turns off word.

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

// amount of stars
Array(450).fill().forEach(addStar);

// Set background texture
const spaceTexture = new THREE.TextureLoader().load('images/blackSpace.jpg');
scene.background = spaceTexture;

//anakin
const anakinTexture = new THREE.TextureLoader().load('images/anakin2.jpg');
const anakin = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: anakinTexture }) //covers box with photo
);
scene.add(anakin);
anakin.position.z = -5;
anakin.position.y = 0;
anakin.position.x = 5;

// Darth
const darthVTexture = new THREE.TextureLoader().load('images/darthV.jpg');
const darthV = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: darthVTexture }) //covers box with photo
);
scene.add(darthV);
darthV.position.z = 45;
darthV.position.y = 0;
darthV.position.x = 5;

// Sphere with texture
const dStarTexture = new THREE.TextureLoader().load('images/deathStar.jpg');
const normalTexture = new THREE.TextureLoader().load('images/texture2.jpg');

const dStar = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({ map: dStarTexture,
    normalMap: normalTexture }) //creates actual texture on image
);
scene.add(dStar);

dStar.position.z = 55;
dStar.position.setX(-20);


//tie fighter that I made in blender
const loader1 = new GLTFLoader();

loader1.load('images/tieFighter3.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.rotation.x = Math.PI / 6;
    gltf.scene.rotation.y = -Math.PI / 2;
    gltf.scene.rotation.z = -Math.PI / 40;



    gltf.scene.position.z= 44;
    gltf.scene.position.setX(-10);
    gltf.scene.scale.set( 2, 2, 2);

}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.error('An error occurred while loading the model.', error); 1
});

//tie fighter that I made in blender
const loader2 = new GLTFLoader();

loader2.load('images/tieFighter3.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.rotation.x = Math.PI / 6;
    gltf.scene.rotation.y = -Math.PI / 2;


    gltf.scene.position.z= 10;
    gltf.scene.position.setX(10);
    gltf.scene.position.setY(10);
    gltf.scene.scale.set( 2, 2, 2);

}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.error('An error occurred while loading the model.', error); 1
});


// Move camera on scroll
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
   // torus.rotation.x += 0.005;
   // torus.rotation.y += 0.005;
   // torus.rotation.z += 0.005;

    darthV.rotation.x += 0.003;
    darthV.rotation.y += 0.003;
    darthV.rotation.z += 0.003;

    dStar.rotation.x += 0.005;
    dStar.rotation.y += 0.005;
    dStar.rotation.z += 0.005;

    anakin.rotation.x += 0.003;
    anakin.rotation.y += 0.003;
    anakin.rotation.z += 0.003;

   


    if (textMesh) {
        textMesh.rotation.x += 0;
        textMesh.rotation.y += 0;
    }

    camera.position.z = t * -0.01;  //position of camera
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

  //  torus.rotation.x += 0.01;
  //  torus.rotation.y += 0.005;
  //  torus.rotation.z += 0.01;

    darthV.rotation.y += 0.01;
    darthV.rotation.z += 0.004;
    darthV.rotation.x += 0.01;

    dStar.rotation.x += 0.01;
    dStar.rotation.y += 0.01;
    dStar.rotation.z += 0.005;

    anakin.rotation.x += 0.005;
    anakin.rotation.y += 0.005;
    anakin.rotation.z += 0.005;


    if (textMesh) {
        textMesh.rotation.x += 0;
        textMesh.rotation.y += 0;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();


