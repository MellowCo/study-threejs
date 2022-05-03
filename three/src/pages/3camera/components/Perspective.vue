<!--
 * @Author: licl
 * @Date: 2022-05-03 19:22:16
 * @Description: 透视相机
 * @LastEditTime: 2022-05-03 20:04:55
 * @LastEditors: licl
-->
<template>
  <div class="text-left text-2xl py-2">
    透视相机
  </div>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

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
camera.position.set(0, 0, 2)
scene.add(camera)

const threeCanvas = ref(null)

onMounted(() => {
  // const canvas = document.getElementById('threeCanvas') as HTMLCanvasElement
  // 渲染器
  const renderer = new WebGLRenderer({
    canvas: threeCanvas.value!,
  })
  renderer.setSize(size.width, size.height)
  renderer.render(scene, camera)

  const clock = new Clock()
  const animation = () => {
    // 通过 clock 保持不同帧率，旋转速度相同
    const elapsedTime = clock.getElapsedTime()

    // 旋转
    mesh.rotation.y = elapsedTime

    requestAnimationFrame(animation)
    renderer.render(scene, camera)
  }

  animation()
})

</script>

<style scoped>

</style>
