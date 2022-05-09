<!--
 * @Author: licl
 * @Date: 2022-05-09 21:06:38
 * @LastEditTime: 2022-05-09 21:58:13
 * @LastEditors: licl
 * @Description: 自定义几何体
-->
<template>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 场景
const scene = new Scene()

// 自定义几何体
const geometry = new BufferGeometry()

const vertices = new Float32Array([
  // 第一点的坐标 x,y,z
  0, 0, 0,
  // 第二点的坐标 x,y,z
  0, 1, 0,
  // 第三点的坐标 x,y,z
  1, 0, 0,
])

// itemSize = 3，3组顶点为一组图形（三角形），可以通过多个三角形，构成一个几何体，和BoxGeometry相同
geometry.setAttribute('position', new BufferAttribute(vertices, 3))
const material = new MeshBasicMaterial({ color: 0xFF0000, wireframe: true })
const mesh = new Mesh(geometry, material)

scene.add(mesh)

// 设置画面大小
let size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// 相机
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
camera.position.set(0, 0, 2)
scene.add(camera)

const threeCanvas = ref(null)

onMounted(() => {
  // 控制器
  const controls = new OrbitControls(camera, threeCanvas.value!)
  controls.enableDamping = true

  // 渲染器
  const renderer = new WebGLRenderer({
    canvas: threeCanvas.value!,
  })
  renderer.setSize(size.width, size.height)
  // 根据设备设置像素比
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.render(scene, camera)

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

  const animation = () => {
    // 更新控制器
    controls.update()

    renderer.render(scene, camera)

    requestAnimationFrame(animation)
  }

  animation()
})

</script>
