## 基础结构

```js
// 场景
const scene = new THREE.Scene();

// 立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const size = {
  width: 800,
  height: 600
}

// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3
scene.add(camera);

// 渲染器
const canvas = document.getElementById('threeCanvas');
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
```



## 改变物体（transform）

物体的4个属性

* position
* scale
* rotation
* quaternion



