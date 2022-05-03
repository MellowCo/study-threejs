<!--
 * @Author: licl
 * @Date: 2022-05-03 21:09:28
 * @Description:
 * @LastEditTime: 2022-05-03 21:26:27
 * @LastEditors: licl
-->

<template>
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
