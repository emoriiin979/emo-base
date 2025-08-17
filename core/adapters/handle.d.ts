import type { Hono } from 'hono'

export type handle = (
  app: Hono
) => Promise<void>
