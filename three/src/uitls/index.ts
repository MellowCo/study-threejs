import type { RouteRecordRaw } from 'vue-router'

export function formatRoutes(routes: RouteRecordRaw[]) {
  return routes.filter(route => /\d/.test(route.name as string))
    .map(route => ({
      path: route.path,
      name: (route.name! as string).replace(/\d/g, ''),
    }))
}
