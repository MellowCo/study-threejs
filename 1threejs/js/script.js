//scene
const scene = new THREE.Scene();

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const size = {
  width: 800,
  height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3
scene.add(camera);

// render
const canvas = document.getElementById('threeCanvas');
console.log(canvas);

const render = new THREE.WebGLRenderer({
  canvas
})
render.setSize(size.width, size.height);
render.render(scene, camera);

