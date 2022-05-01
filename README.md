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

## Group

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
