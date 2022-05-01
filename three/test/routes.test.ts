/*
 * @Author: licl
 * @Date: 2022-05-01 20:27:56
 * @Description:
 * @LastEditTime: 2022-05-01 20:42:47
 * @LastEditors: licl
 */
import { describe, expect, it } from 'vitest'

describe('route', () => {
  it('filter route', () => {
    const routes = ['hi', 'index', '1transform', '11am']
    const list = routes
      .filter(route => /\d/.test(route))
      .map(route => route.replace(/\d/g, ''))

    expect(list).toMatchInlineSnapshot(`
      [
        "transform",
        "am",
      ]
    `)
  })
})
