<!--
 * @Author: licl
 * @Date: 2022-05-16 20:18:59
 * @LastEditTime: 2022-05-16 21:47:37
 * @LastEditors: licl
 * @Description: 纹理
-->

<template>
  <canvas ref="threeCanvas" />
</template>

<script setup lang="ts">
import {
  BoxGeometry, LinearFilter, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LoadingManager, Mesh, MeshBasicMaterial, NearestFilter,
  NearestMipMapLinearFilter, NearestMipMapNearestFilter, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

// 场景
const scene = new Scene()

// 纹理加载管理器
const loadingManager = new LoadingManager()

loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log(`${url} start: ${itemsLoaded}/${itemsTotal}`)
}

loadingManager.onLoad = () => {
  console.log('all textures loaded')
}

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`${url} loaded: ${itemsLoaded}/${itemsTotal}`)
}

loadingManager.onError = (url) => {
  console.log(`${url} load error`)
}

// 纹理加载器
const textureLoader = new TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/static/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/static/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/static/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load(
//   '/static/textures/door/ambientOcclusion.jpg',
// )
// const metalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg')

const checkerboard1024 = textureLoader.load('/static/textures/checkerboard-1024x1024.png')
const minecraft = textureLoader.load('/static/textures/minecraft.png')

// 放大滤镜
minecraft.magFilter = LinearFilter
// 缩小滤镜
checkerboard1024.minFilter = LinearFilter

// 立方体
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 4)
const material = new MeshBasicMaterial({
  // 设置纹理
  map: minecraft,
})
const mesh = new Mesh(geometry, material)
scene.add(mesh)

// debug
const gui = new dat.GUI({ name: 'My GUI' })
// minecraft
gui.add(minecraft, 'magFilter', {
  NearestFilter,
  LinearFilter,
}).name('纹理放大').onChange(() => {
  minecraft.needsUpdate = true
})
gui.add(mesh, 'visible').name('显示/隐藏')

const geometry2 = new BoxGeometry(1, 1, 1, 2, 2, 4)
const material2 = new MeshBasicMaterial({
  // 设置纹理
  map: checkerboard1024,
})
const mesh2 = new Mesh(geometry2, material2)
scene.add(mesh2)

// minecraft
gui.add(checkerboard1024, 'minFilter', {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapNearestFilter,
  LinearMipMapLinearFilter,
}).name('纹理缩小').onChange(() => {
  checkerboard1024.needsUpdate = true
})
gui.add(mesh2, 'visible').name('显示/隐藏')

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
