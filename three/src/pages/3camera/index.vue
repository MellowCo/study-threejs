<!--
 * @Author: licl
 * @Date: 2022-05-03 19:19:53
 * @Description: 相机
 * @LastEditTime: 2022-05-03 20:07:27
 * @LastEditors: licl
-->
<template>
  <MouseMove />

  <Perspective />
  <Orthographic />
</template>

<script setup lang="ts">
import Perspective from './components/Perspective.vue'
import Orthographic from './components/Orthographic.vue'
import MouseMove from './components/MouseMove.vue'
</script>
