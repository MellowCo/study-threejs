<template>
  <div class="text-center p-4">
    <RouterLink
      v-for="({ path, name }, index) in routes"
      :key="index"
      :to="path"
      class="p-2 bg-white hover:bg-gray-100 shadow-md rounded mr-2"
    >
      {{ name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import vr from 'virtual:generated-pages'
import { formatRoutes } from '~/uitls'
console.log(vr)

const routes = formatRoutes(vr)
</script>
