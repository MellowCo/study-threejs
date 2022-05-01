<!--
 * @Author: licl
 * @Date: 2022-05-01 20:57:55
 * @Description: 动画
 * @LastEditTime: 2022-05-01 21:43:46
 * @LastEditors: licl
-->
<template>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import gsap from 'gsap'

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
const camera = new PerspectiveCamera(75, size.width / size.height)
camera.position.set(0, 0, 5)
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

  // let time = Date.now()
  // const animation = () => {
  //   // 通过 date 保持不同帧率，旋转速度相同
  //   const currentTime = Date.now()
  //   const deltaTime = currentTime - time
  //   time = currentTime
  //   // 旋转
  //   mesh.rotation.y += deltaTime * 0.001
  //   requestAnimationFrame(animation)
  //   renderer.render(scene, camera)
  // }

  // const clock = new Clock()
  // const animation = () => {
  //   // 通过 clock 保持不同帧率，旋转速度相同
  //   const elapsedTime = clock.getElapsedTime()

  //   // 旋转
  //   // mesh.rotation.y = elapsedTime

  //   // 圆周运动
  //   mesh.position.y = Math.sin(elapsedTime)
  //   mesh.position.x = Math.cos(elapsedTime)

  //   requestAnimationFrame(animation)
  //   renderer.render(scene, camera)
  // }

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
})

</script>

<style scoped>

</style>
