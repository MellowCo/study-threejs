## 基础结构

```js
// 场景
const scene = new THREE.Scene();

// 立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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

通过4个属性改变物体，threejs中所有物体类都继承[Object3D ](https://threejs.org/docs/index.html#api/zh/core/Object3D)

* position
* scale
* rotation
* quaternion

> 改变这些属性，必须在`render(...)`方法前

### position 坐标位置

`position`有3个坐标属性，`x`,`y`,`z`,`positon`继承自[Vector3 ](https://threejs.org/docs/index.html#api/zh/math/Vector3)

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202204302020132.png" alt="image-20220430202007002" style="zoom:50%;" />

```js
// 通过position 改变坐标位置
mesh.position.x = 0.5;
mesh.position.y = -0.5;
mesh.position.z = 1;
```

#### 方法

##### .set(x,y,z)

> 设置该向量的x、y 和 z 。

```js
// 通过set方法 设置3个坐标
mesh.position.set(0.5, -0.5, 1);
```



---

##### .length ()

> 计算物体的直线距离，（0,0,0）到（x,y,z）的距离

```js
// 立方体距离(0,0,0)的直线距离
console.log(mesh.position.length())
```



---

##### .distanceTo(v2)

> 计算该向量到v2的距离

```js
// 立方体和相机的直线距离
console.log(mesh.position.distanceTo(camera.position));

// 立方体距离(0,1,2)的直线距离
console.log(mesh.position.distanceTo(new Vector3(0, 1, 2)))
```



---

##### .normalize ()

> 将物体位置重置到(1,1,1)

```js
// 1.224744871391589
console.log(mesh.position.length())
// 将物体位置重置到(1,1,1)
mesh.position.normalize();
// 1
console.log(mesh.position.length())
```

#### 辅助工具AxesHelper	

> [AxesHelper](https://threejs.org/docs/index.html?q=ax#api/zh/helpers/AxesHelper)用于简单模拟3个坐标轴的对象.红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.

```js
// 相机
const camera = new PerspectiveCamera(75, size.width / size.height);
camera.position.set(1, 1, 4)
scene.add(camera);

// 显示坐标辅助
const axesHelper = new AxesHelper(3);
scene.add(axesHelper);
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202204302052710.png" alt="image-20220430205200677" style="zoom:50%;" />



---

### scale 缩放

```js
// scale
mesh.scale.x = 1;
mesh.scale.y = 1.5;
mesh.scale.z = 0.5;

mesh.scale.set(1, 1.5, 0.5);
```



---

### rotation 旋转

> 在`x`,`y`,`z`的基础上加入旋转角度，[Euler](https://threejs.org/docs/index.html?q=Euler#api/zh/math/Euler)

```js
// rotation 旋转
mesh.rotation.x = 0.5 * Math.PI;
mesh.rotation.y = 0.25 * Math.PI;
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202204302114081.png" alt="image-20220430211436059" style="zoom:50%;" />

> 旋转时，同时会旋转物体的x，y，z轴，导致旋转的位置难以计算，所以需要调整旋转的顺序，默认的旋转顺序为`XYZ`

```js
// reorder 重置选择顺序
mesh.rotation.reorder('YXZ')
mesh.rotation.y = 0.25 * Math.PI;
mesh.rotation.x = 0.5 * Math.PI;
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202204302126848.png" alt="image-20220430212648809" style="zoom:50%;" />



---

### Group

> 通过[Group](https://threejs.org/docs/index.html?q=Grou#api/zh/objects/Group)管理多个物体

```js
// 通过group 创建一个组
const group = new Group();
scene.add(group)

const mesh1 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0x00ff00 }));
const mesh2 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
const mesh3 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0x0000ff }));

mesh2.position.x = 1.5;
mesh3.position.y = 1.5;

group.add(mesh1);
group.add(mesh2);
group.add(mesh3);

group.position.x = 1;
group.scale.y = 0.5;
group.rotation.z = 0.25 * Math.PI;
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202204302143422.png" alt="image-20220430214321392" style="zoom:50%;" />



---

## 动画（animation）

> 使用`requestAnimationFrame`，在每一帧调用动画

```js
 const animation = () => {
    mesh.rotation.y += 0.05
    requestAnimationFrame(animation)
    renderer.render(scene, camera)
    console.log(1)
  }

  animation()
```

> 由于`requestAnimationFrame`按照刷新率执行动画，帧速率越高，旋转速度越快

### deltaTime

> 使用增量时间，无论帧速率如何，都以相同的速度旋转

```js
let time = Date.now()
const animation = () => {
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime
  // 旋转
  mesh.rotation.y += deltaTime * 0.001
  requestAnimationFrame(animation)
  renderer.render(scene, camera)
}

animation()
```



---

### [Clock](https://threejs.org/docs/index.html?q=Clock#api/zh/core/Clock)

> 使用`threejs`中的内置时钟

```js
const clock = new Clock()
const animation = () => {
  // 通过 clock 保持不同帧率，旋转速度相同
  const elapsedTime = clock.getElapsedTime()

  // 旋转
  // mesh.rotation.y = elapsedTime

  // 圆周运动
  mesh.position.y = Math.sin(elapsedTime)
  mesh.position.x = Math.cos(elapsedTime)

  requestAnimationFrame(animation)
  renderer.render(scene, camera)
}

animation()
```



---

### 复杂动画	

> 使用`gasp`,生成复杂动画

```shell
pnpm add gsap@3.5.1
```

```js
import gsap from 'gsap'
 

// 使用gasp实现 一段动画
gsap.to(mesh.position, {
  x: 1,
  duration: 1,
  delay: 1,
})

gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  delay: 2,
})

const animation = () => {
  requestAnimationFrame(animation)
  renderer.render(scene, camera)
}

animation()
```



---

## [相机 Camera](https://threejs.org/docs/index.html#api/zh/cameras/Camera)

### [PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)

> 透视相机，模拟人眼所看到的景象，物体的大小会随着相机的距离而改变，近大远小

```js
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
```



---
### [OrthographicCamera](https://threejs.org/docs/index.html#api/zh/cameras/OrthographicCamera)

> 正交相机，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。需要给相机设置`横纵比`，保证物体的比例正确

<img src="https://mellow-notebook-img.oss-cn-shanghai.aliyuncs.com/2022/202205031936169.png" alt="image-20220503193629072" style="zoom:50%;" />

```js
const size = {
  width: 800,
  height: 200,
}

// 设置横纵比，保证物体的比例正确
const aspectRatio = size.width / size.height
const camera = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
```

<img src="https://mellow-notebook-img.oss-cn-shanghai.aliyuncs.com/2022/202205031942062.png" alt="image-20220503194238019" style="zoom:50%;" />



---

### 使用鼠标移动相机

```js
// mouse事件
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', (event) => {
  // -0.5 到 0.5 将canvas分为上下左右区域
  cursor.x = event.clientX / size.width - 0.5
  cursor.y = -(event.clientY / size.height - 0.5)
})

  const animation = () => {
    // 移动相机
    camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
    camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)

    requestAnimationFrame(animation)
    renderer.render(scene, camera)
  }

  animation()
```



---

### [控制器-OrbitControls](https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls)

> 通过`OrbitControls`,实现鼠标移动相机

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 控制器
const controls = new OrbitControls(camera, threeCanvas.value!)
// 启用阻尼,使动画有重量感
controls.enableDamping = true
                                   
// 通过定时器，更新控制器                        
const animation = () => {
  // 更新控制器
  controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}

animation()
```



---

## 全屏和调整视口大小

### 全屏

```js
// 设置画面大小
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
```



---
### 监听浏览器窗口

```js
  window.addEventListener('resize', () => {
    // 浏览器窗口大小改变时，重新设置画面大小
    size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    // 更新相机横纵比
    camera.aspect = size.width / size.height
    // 更新相机投影
    camera.updateProjectionMatrix()
    // 更新画布的大小
    renderer.setSize(size.width, size.height)
  })
```



---

### 像素比（解决模糊问题）

```js
  // 根据设备设置像素比
  renderer.setPixelRatio(window.devicePixelRatio)
```



---

## [几何体 Geometry](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry)

### [立方体 BoxGeometry](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry)

* width — X轴上面的宽度，默认值为1。
* height — Y轴上面的高度，默认值为1。
* depth — Z轴上面的深度，默认值为1。
* widthSegments — （可选）宽度的分段数，默认值是1。
* heightSegments — （可选）高度的分段数，默认值是1。
* depthSegments — （可选）深度的分段数，默认值是1

```js
// 立方体
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 4)


const material = new MeshBasicMaterial({
  color: 0x00FF00,
  // wireframe: 显示线框
  wireframe: true,
})
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202205092057158.png" alt="image-20220507221900365" style="zoom:50%;" />



---

### [BufferGeometry](https://threejs.org/docs/index.html?q=Geometry#api/zh/core/BufferGeometry)

> 自定义几何体

```js
const geometry = new BufferGeometry()

const vertices = new Float32Array([
  // 第一点的坐标 x,y,z
  0, 0, 0,
  // 第二点的坐标 x,y,z
  0, 1, 0,
  // 第三点的坐标 x,y,z
  1, 0, 0,
])

// itemSize = 3，3组顶点为一组图形（ ），可以通过多个三角形，构成一个几何体，和BoxGeometry相同
geometry.setAttribute('position', new BufferAttribute(vertices, 3))
const material = new MeshBasicMaterial({ color: 0xFF0000, wireframe: true })
const mesh = new Mesh(geometry, material)
```

<img src="https://cdn.jsdelivr.net/gh/MellowCo/image-host/2022/202205092154318.png" alt="image-20220509215444238" style="zoom:50%;" />
