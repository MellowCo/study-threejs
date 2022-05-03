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
const routes = useRouter().options.routes.filter(route => /\d/.test(route.name as string))
  .map(route => ({
    path: route.path,
    name: (route.name! as string).replace(/\d/g, ''),
  }))
</script>
