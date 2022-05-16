import type { RouteRecordRaw } from 'vue-router'

export function formatRoutes(routes: RouteRecordRaw[]) {
  return routes
    .filter(route => /\d/.test(route.name as string))
    .sort((a, b) => {
      const aN = +(a.name as string).match(/\d+/)![0]
      const bN = +(b.name as string).match(/\d+/)![0]
      return aN - bN
    })
    .map(route => ({
      path: route.path,
      name: (route.name! as string).replace(/\d/g, ''),
    }))
}
