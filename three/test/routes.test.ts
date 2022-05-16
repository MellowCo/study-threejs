/*
 * @Author: licl
 * @Date: 2022-05-01 20:27:56
 * @Description:
 * @LastEditTime: 2022-05-11 21:36:20
 * @LastEditors: licl
 */
import { describe, expect, it } from 'vitest'
import type { RouteRecordRaw } from 'vue-router'
import { formatRoutes } from '~/uitls'

describe('route', () => {
  it('filter route', () => {
    const routes: RouteRecordRaw[]
    = [
      {
        name: 'index',
        path: '/',
        component: () => {},
        props: true,
      },
      {
        name: 'all',
        path: '/:all(.*)*',
        component: () => {},
        props: true,
      },
      {
        name: '1transform',
        path: '/1transform',
        component: () => {},
        props: true,
      },
      {
        name: '2animations',
        path: '/2animations',
        component: () => {},
        props: true,
      },
      {
        name: '5geometry',
        path: '/5geometry',
        component: () => {},
        props: true,
      },
      {
        name: '11xx12x',
        path: '/11xxxxx',
        component: () => {},
        props: true,
      },
      {
        name: '10xxxxx',
        path: '/10xxxxx',
        component: () => {},
        props: true,
      },
      {
        name: '6debug',
        path: '/6debug',
        component: () => {},
        props: true,
      },
      {
        name: '5geometry-custom-geometry',
        path: '/5geometry/custom-geometry',
        component: () => {},
        props: true,
      },
    ]

    const filterRoutes = formatRoutes(routes)

    expect(filterRoutes).toMatchInlineSnapshot(`
      [
        {
          "name": "transform",
          "path": "/1transform",
        },
        {
          "name": "animations",
          "path": "/2animations",
        },
        {
          "name": "geometry",
          "path": "/5geometry",
        },
        {
          "name": "geometry-custom-geometry",
          "path": "/5geometry/custom-geometry",
        },
        {
          "name": "debug",
          "path": "/6debug",
        },
        {
          "name": "xxxxx",
          "path": "/10xxxxx",
        },
        {
          "name": "xxx",
          "path": "/11xxxxx",
        },
      ]
    `)
  })
})
