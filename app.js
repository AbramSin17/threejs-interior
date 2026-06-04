import * as THREE from 'https://esm.sh/three@0.160.0';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08090c);
scene.fog = new THREE.FogExp2(0x08090c, 0.08);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.2, 4.2);

const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById("c"), 
    antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.xr.enabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; 
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.target.set(0, 0.8, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfff3e0, 1.5); 
directionalLight.position.set(3, 6, 2);
directionalLight.castShadow = true; 
directionalLight.shadow.mapSize.width = 2048; 
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = -0.0004;
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0x7aa2f7, 0.5); 
fillLight.position.set(-3, 3, 1);
scene.add(fillLight);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');

const createTileTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#dedee2';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#c5c5cb';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
};

const createPaintingTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 312;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#d6684d';
    ctx.fillRect(0, 0, 512, 312);
    
    ctx.fillStyle = '#e29578';
    ctx.beginPath();
    ctx.arc(256, 156, 90, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#1b1c24';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(412, 262);
    ctx.moveTo(412, 50);
    ctx.lineTo(100, 262);
    ctx.stroke();
    
    return new THREE.CanvasTexture(canvas);
};

const interactiveObjects = [];

const floorGeo = new THREE.PlaneGeometry(5, 5);
const floorMat = new THREE.MeshStandardMaterial({ map: createTileTexture(), roughness: 0.2, metalness: 0.0 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true; 
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({ color: 0x1b1c24, roughness: 0.8 }); 

const backWallGeo = new THREE.BoxGeometry(5, 3.2, 0.2);
const backWall = new THREE.Mesh(backWallGeo, wallMat);
backWall.position.set(0, 1.6, -2.5); 
backWall.receiveShadow = true;
scene.add(backWall);

const sideWallGeo = new THREE.BoxGeometry(0.2, 3.2, 5);
const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
leftWall.position.set(-2.5, 1.6, 0); 
leftWall.receiveShadow = true;
scene.add(leftWall);

// OBJEK KARPET SUDAH DIHAPUS SEPENUHNYA DARI SINI

const artFrameGeo = new THREE.BoxGeometry(1.6, 1.0, 0.06);
const artFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f0f12, roughness: 0.3, metalness: 0.7 }); 
const artFrame = new THREE.Mesh(artFrameGeo, artFrameMat);
artFrame.position.set(0, 1.8, -2.38); 
artFrame.castShadow = true;
scene.add(artFrame);

const paintingGeo = new THREE.PlaneGeometry(1.5, 0.9);
const paintingMat = new THREE.MeshStandardMaterial({ map: createPaintingTexture(), roughness: 0.6 }); 
const painting = new THREE.Mesh(paintingGeo, paintingMat);
painting.position.set(0, 1.8, -2.34);
scene.add(painting);

const tableGeo = new THREE.BoxGeometry(2.4, 0.12, 1.2);
const tableMat = new THREE.MeshStandardMaterial({ color: 0x4a3227, roughness: 0.3, metalness: 0.1, clearcoat: 0.4 });
const table = new THREE.Mesh(tableGeo, tableMat);
table.position.set(0, 0.75, 0);
table.castShadow = true;   
table.receiveShadow = true;
table.name = "Meja Kayu Walnut";
table.userData = { tipe: "Furnitur Utama", deskripsi: "Meja kerja utama ruangan berbahan kayu jati cokelat tua dengan guratan mewah, berlapisan pernis semi-glossy." };
scene.add(table);
interactiveObjects.push(table);

const legMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5, metalness: 0.6 });
const legGeo = new THREE.BoxGeometry(0.08, 0.75, 1.0);
const legL = new THREE.Mesh(legGeo, legMat); legL.position.set(-1.0, 0.375, 0); legL.castShadow = true; scene.add(legL);
const legR = legL.clone(); legR.position.x = 1.0; legR.castShadow = true; scene.add(legR);

const ballGeo = new THREE.SphereGeometry(0.18, 32, 32);
const ballMat = new THREE.MeshStandardMaterial({ map: earthTexture, roughness: 0.2, metalness: 0.1 });
const ball = new THREE.Mesh(ballGeo, ballMat);
ball.position.set(0.6, 1.12, 0.1); 
ball.castShadow = true;
ball.name = "Globe Bumi Levitation";
ball.userData = { tipe: "Dekorasi Teknologi", deskripsi: "Bola dunia kristal interaktif dengan mekanisme levitasi magnetik otomatis yang mengambang konstan di atas pemancar induksi." };
scene.add(ball);
interactiveObjects.push(ball);

const baseGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0x1d1e24, roughness: 0.2, metalness: 0.8 });
const baseMesh = new THREE.Mesh(baseGeo, baseMat);
baseMesh.position.set(0.6, 0.83, 0.1);
baseMesh.castShadow = true;
scene.add(baseMesh);

const glowLight = new THREE.PointLight(0x4ecdc4, 1.4, 0.6);
glowLight.position.set(0.6, 0.92, 0.1);
scene.add(glowLight);

const lampPoleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.65, 16);
const lampPoleMat = new THREE.MeshStandardMaterial({ color: 0xc5a028, roughness: 0.2, metalness: 0.9 }); 
const lampPole = new THREE.Mesh(lampPoleGeo, lampPoleMat);
lampPole.position.set(-0.8, 1.1, -0.3);
lampPole.castShadow = true;
lampPole.name = "Tiang Lampu Kuningan";
lampPole.userData = { tipe: "Komponen Pencahayaan", deskripsi: "Tiang stik vertikal penahan rumah lampu berbahan kuningan disikat berlapis emas reflektif." };
scene.add(lampPole);
interactiveObjects.push(lampPole);

const lampShadeGeo = new THREE.ConeGeometry(0.14, 0.24, 16); 
const lampShadeMat = new THREE.MeshStandardMaterial({ color: 0xb22e2e, roughness: 0.5, metalness: 0.2 }); 
const lampShade = new THREE.Mesh(lampShadeGeo, lampShadeMat);
lampShade.position.set(-0.8, 1.42, -0.3);
lampShade.rotation.x = Math.PI; 
lampShade.castShadow = true;
lampShade.name = "Kap Lampu Geometris";
lampShade.userData = { tipe: "Aksesoris Pencahayaan", deskripsi: "Kap pelindung sebaran cahaya bohlam berbentuk kerucut bersudut rapi dengan finishing cat matte." };
scene.add(lampShade);
interactiveObjects.push(lampShade);

const torusGeo = new THREE.TorusGeometry(0.1, 0.035, 12, 48);
const torusMat = new THREE.MeshStandardMaterial({ color: 0xeaa810, roughness: 0.2, metalness: 0.8 }); 
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.position.set(-0.1, 0.86, 0.05);
torus.rotation.x = Math.PI / 2; 
torus.castShadow = true;
torus.name = "Pajangan Cincin Logam Emas";
torus.userData = { tipe: "Dekorasi Meja", deskripsi: "Aksesoris pemberat dokumen kertas (paperweight) berbentuk lingkaran cincin torus berbahan tembaga murni lapis emas." };
scene.add(torus);
interactiveObjects.push(torus);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let hoveredObject = null;
let selectedObject = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
    if (hoveredObject) {
        if (selectedObject === hoveredObject) {
            selectedObject = null;
            document.getElementById('status').innerHTML = "Arahkan mouse ke objek untuk melihat efek hover, dan klik objek untuk melihat detail informasi barang.";
        } else {
            selectedObject = hoveredObject;
            document.getElementById('status').innerHTML = `
                <strong style="color:#ffbe0b; font-size:15px;">${selectedObject.name}</strong><br>
                <small style="color:#aaa; text-transform:uppercase; font-size:11px;">Kategori: ${selectedObject.userData.tipe}</small>
                <p style="margin-top:8px; border-top:1px dashed #444; padding-top:8px; text-align:justify;">${selectedObject.userData.deskripsi}</p>
            `;
        }
    }
});

const vrBtn = document.getElementById('vrBtn');

async function checkXRSupport() {
    if (!('xr' in navigator)) {
        vrBtn.innerText = 'WebXR tidak tersedia';
        vrBtn.disabled = true;
        return;
    }
    const ok = await navigator.xr.isSessionSupported('immersive-vr');
    if (!ok) {
        vrBtn.innerText = 'VR tidak didukung';
        vrBtn.disabled = true;
        return;
    }
    vrBtn.disabled = false;
    vrBtn.innerText = 'Masuk VR';
}

vrBtn.addEventListener('click', async () => {
    try {
        const session = await navigator.xr.requestSession('immersive-vr', {
            optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
        });
        await renderer.xr.setSession(session);
        vrBtn.innerText = 'VR Aktif';
        session.addEventListener('end', () => {
            vrBtn.innerText = 'Masuk VR';
        });
    } catch(e) { 
        console.error(e); 
    }
});

checkXRSupport();

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    if (!renderer.xr.isPresenting) {
        controls.update();
    }

    const elapsedTime = clock.getElapsedTime();

    ball.rotation.y += 0.005;
    ball.position.y = 1.12 + Math.sin(elapsedTime * 2.5) * 0.025;

    if (!renderer.xr.isPresenting) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0) {
            const topObject = intersects[0].object;

            if (hoveredObject !== topObject) {
                if (hoveredObject) {
                    hoveredObject.material.emissive.setHex(0x000000);
                    hoveredObject.scale.set(1, 1, 1);
                }
                hoveredObject = topObject;
                hoveredObject.material.emissive.setHex(0x111122);
                hoveredObject.scale.set(1.04, 1.04, 1.04); 
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (hoveredObject) {
                hoveredObject.material.emissive.setHex(0x000000);
                hoveredObject.scale.set(1, 1, 1);
                hoveredObject = null;
                document.body.style.cursor = 'default';
            }
        }
    }

    renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});