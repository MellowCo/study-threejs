<!--
 * @Author: licl
 * @Date: 2022-05-03 19:27:37
 * @Description: 正交相机
 * @LastEditTime: 2022-05-03 20:01:03
 * @LastEditors: licl
-->

<template>
  <div class="text-left text-2xl py-2">
    正交相机
  </div>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, OrthographicCamera, Scene, WebGLRenderer } from 'three'

// 场景
const scene = new Scene()

// 立方体
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const size = {
  width: 800,
  height: 200,
}

// 相机
// 设置横纵比，保证物体的比例正确
const aspectRatio = size.width / size.height
const camera = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)
camera.position.set(2, 2, 10)
camera.lookAt(mesh.position)
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
