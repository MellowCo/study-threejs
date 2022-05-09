/*
 * @Author: licl
 * @Date: 2022-05-01 20:27:56
 * @Description:
 * @LastEditTime: 2022-05-04 09:07:01
 * @LastEditors: licl
 */
import { describe, expect, it } from 'vitest'
import routes from 'virtual:generated-pages'
import { formatRoutes } from '~/uitls'

describe('route', () => {
  it('filter route', () => {
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
          "name": "camera",
          "path": "/3camera",
        },
        {
          "name": "fullscreen",
          "path": "/4fullscreen",
        },
      ]
    `)
  })
})
