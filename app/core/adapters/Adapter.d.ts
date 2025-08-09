export interface Adapter {
  app: Hono
  handle: () => Promise<void>
}
