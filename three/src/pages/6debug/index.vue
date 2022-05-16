<!--
 * @Author: licl
 * @Date: 2022-05-11 21:16:49
 * @LastEditTime: 2022-05-15 19:29:07
 * @LastEditors: licl
 * @Description: debug
-->

<template>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

// 场景
const scene = new Scene()

// 立方体
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 4)
const material = new MeshBasicMaterial({
  color: 0x00FF00,
})
const mesh = new Mesh(geometry, material)
scene.add(mesh)

// debug
const gui = new dat.GUI({ name: 'My GUI' })
// 改变x
gui.add(mesh.position, 'x', -10, 10)
// 链式调用
gui.add(mesh.position, 'y').min(-10).max(10).step(0.1)
gui.add(material, 'wireframe').name('显示线框')

const params = {
  color: 0xFF0000,
  spin() {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + 10,
      duration: 1,
    })
  },
}
// 更改颜色
gui.addColor(params, 'color').onChange(() => {
  material.color.set(params.color)
})
// 旋转动画
gui.add(params, 'spin')

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
