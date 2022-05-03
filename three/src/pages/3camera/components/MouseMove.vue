<!--
 * @Author: licl
 * @Date: 2022-05-03 19:59:25
 * @Description: 移动相机
 * @LastEditTime: 2022-05-03 20:19:37
 * @LastEditors: licl
-->
<template>
  <div class="text-left text-2xl py-2">
    相机跟随鼠标移动
  </div>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

// 场景
const scene = new Scene()

// 立方体
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const size = {
  width: 800,
  height: 600,
}

// 相机
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
camera.position.set(2, 2, 2)
camera.lookAt(mesh.position)
scene.add(camera)

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

const threeCanvas = ref(null)

onMounted(() => {
  // const canvas = document.getElementById('threeCanvas') as HTMLCanvasElement
  // 渲染器
  const renderer = new WebGLRenderer({
    canvas: threeCanvas.value!,
  })
  renderer.setSize(size.width, size.height)
  renderer.render(scene, camera)

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
})

</script>
