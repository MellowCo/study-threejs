<!--
 * @Author: licl
 * @Date: 2022-05-01 13:43:30
 * @Description:
 * @LastEditTime: 2022-05-02 17:02:09
 * @LastEditors: licl
-->
<template>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { AxesHelper, BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'

// 场景
const scene = new Scene()

// 立方体
// const geometry = new BoxGeometry(1, 1, 1);
// const material = new MeshBasicMaterial({ color: 0x00ff00 });
// const mesh = new Mesh(geometry, material);

// 通过position 改变坐标位置
// mesh.position.x = 0.5;
// mesh.position.y = -0.5;
// mesh.position.z = 1;

// 通过set方法 设置3个坐标
// mesh.position.set(0.5, -0.5, 1);
// scene.add(mesh);

// 1.224744871391589
// console.log(mesh.position.length())
// 将物体位置重置到(1,1,1)
// mesh.position.normalize();
// 1
// console.log(mesh.position.length())

// scale 缩放
// mesh.scale.x = 1;
// mesh.scale.y = 1.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(1, 1.5, 0.5);

// rotation 旋转
// reorder 重置选择顺序
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = 0.25 * Math.PI;
// mesh.rotation.x = 0.5 * Math.PI;

// 通过group 创建一个组
const group = new Group()
scene.add(group)

const mesh1 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0x00FF00 }))
const mesh2 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xFF0000 }))
const mesh3 = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0x0000FF }))

mesh2.position.x = 1.5
mesh3.position.y = 1.5

group.add(mesh1)
group.add(mesh2)
group.add(mesh3)

group.position.x = 1
group.scale.y = 0.5
group.rotation.z = 0.25 * Math.PI

const size = {
  width: 800,
  height: 600,
}

// 相机
const camera = new PerspectiveCamera(75, size.width / size.height)
camera.position.set(1, 1, 4)
scene.add(camera)

// 显示坐标辅助
const axesHelper = new AxesHelper(3)
scene.add(axesHelper)

const threeCanvas = ref(null)
onMounted(() => {
  // const canvas = document.getElementById('threeCanvas') as HTMLCanvasElement
  // 渲染器
  const renderer = new WebGLRenderer({
    canvas: threeCanvas.value!,
  })
  renderer.setSize(size.width, size.height)
  renderer.render(scene, camera)
})

// 立方体距离(0,0,0)的直线距离
// console.log(mesh.position.length())

// 立方体和相机的直线距离
// console.log(mesh.position.distanceTo(camera.position));

// 立方体距离(0,1,2)的直线距离
console.log(mesh1.position.distanceTo(new Vector3(0, 1, 2)))

</script>
