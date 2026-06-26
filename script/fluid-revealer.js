import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform sampler2D uPrevTrails;
  uniform vec2 uMouse;
  uniform bool uIsMoving;

  varying vec2 vUv;

  void main() {
    vec4 prevState = texture2D(uPrevTrails, vUv);
    float newValue = prevState.r * 0.97;

    if (uIsMoving) {
      float dist = distance(vUv, uMouse);
      float intensity = smoothstep(0.08, 0.0, dist) * 0.4;
      newValue = min(newValue + intensity, 0.6);
    }

    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
  }
`;

const displayFragmentShader = `
  uniform sampler2D uFluid;

  varying vec2 vUv;

  void main() {
    float fluid = texture2D(uFluid, vUv).r;

    float threshold = 0.01;
    float edge = 0.006;
    float t = smoothstep(threshold - edge, threshold + edge, fluid);

    vec3 violet = vec3(0.318, 0.224, 0.553);
    gl_FragColor = vec4(violet, t * 0.65);
  }
`;

const canvas = document.getElementById('fluid-canvas');
if (!canvas) throw new Error('#fluid-canvas not found');

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setClearColor(0x000000, 0);

const simSize = Math.min(500, window.innerWidth, window.innerHeight);

function resizeRenderer() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

resizeRenderer();

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const mouse = new THREE.Vector2(0.5, 0.5);
let isMoving = false;
let lastMoveTime = 0;

const hero = document.querySelector('.hero');
if (!hero) throw new Error('.hero not found');

function onPointerMove(clientX, clientY) {
  const rect = hero.getBoundingClientRect();
  const nx = (clientX - rect.left) / rect.width;
  const ny = 1 - (clientY - rect.top) / rect.height;
  mouse.x = THREE.MathUtils.clamp(nx, 0, 1);
  mouse.y = THREE.MathUtils.clamp(ny, 0, 1);
  isMoving = true;
  lastMoveTime = performance.now();
}

hero.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
hero.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  },
  { passive: false },
);

const rtOpts = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  type: THREE.FloatType,
};
const targets = [
  new THREE.WebGLRenderTarget(simSize, simSize, rtOpts),
  new THREE.WebGLRenderTarget(simSize, simSize, rtOpts),
];

renderer.setRenderTarget(targets[0]);
renderer.clear();
renderer.setRenderTarget(targets[1]);
renderer.clear();
renderer.setRenderTarget(null);

const fluidMat = new THREE.ShaderMaterial({
  uniforms: {
    uPrevTrails: { value: null },
    uMouse: { value: mouse },
    uIsMoving: { value: false },
  },
  vertexShader,
  fragmentShader: fluidFragmentShader,
});

const displayMat = new THREE.ShaderMaterial({
  uniforms: {
    uFluid: { value: null },
  },
  vertexShader,
  fragmentShader: displayFragmentShader,
});

const geo = new THREE.PlaneGeometry(2, 2);
const displayMesh = new THREE.Mesh(geo, displayMat);
scene.add(displayMesh);

const simScene = new THREE.Scene();
const simMesh = new THREE.Mesh(geo, fluidMat);
simScene.add(simMesh);

let currentTarget = 0;

function animate() {
  if (isMoving && performance.now() - lastMoveTime > 50) {
    isMoving = false;
  }

  const prev = targets[currentTarget];
  currentTarget = (currentTarget + 1) % 2;
  const cur = targets[currentTarget];

  fluidMat.uniforms.uPrevTrails.value = prev.texture;
  fluidMat.uniforms.uIsMoving.value = isMoving;

  renderer.setRenderTarget(cur);
  renderer.render(simScene, camera);

  displayMat.uniforms.uFluid.value = cur.texture;

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeRenderer();
});

requestAnimationFrame(animate);
