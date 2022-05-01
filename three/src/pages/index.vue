<template>
  <RouterLink
    v-for="({ path, name }, index) in routes"
    :key="index"
    :to="path"
    class="p-2 bg-white hover:bg-gray-100 shadow-md rounded mr-2"
  >
    {{ name }}
  </RouterLink>
</template>

<script setup lang="ts">
const routes = useRouter().options.routes
</script>
