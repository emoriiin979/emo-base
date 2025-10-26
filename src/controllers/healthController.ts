import type { Context } from 'hono'
import { HealthPageView } from '../views/healthView.js'

/**
 * ヘルスチェックページ
 * GET /health
 * @param c Context
 * @returns 
 */
export const healthPage = (c: Context) => {
  return c.render(HealthPageView())
}
