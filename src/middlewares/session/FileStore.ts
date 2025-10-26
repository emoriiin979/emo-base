import type { SessionData, Store } from 'hono-sessions'
import fs from 'fs/promises'
import path from 'path'

/**
 * File storage driver class
 */
export class FileStore implements Store
{
  basePath: string

  constructor(basePath = '/sessions') {
    this.basePath = basePath
  }

  private filePath(key: string) {
    return path.join(this.basePath, `${key}.json`)
  }

  async getSessionById(sessionId: string): Promise<SessionData | null> {
    try {
      const data = await fs.readFile(this.filePath(sessionId), 'utf-8')
      return JSON.parse(data) as SessionData
    } catch {
      return null
    }
  }

  async createSession(sessionId: string, initialData: SessionData): Promise<void> {
    await fs.mkdir(this.basePath, { recursive: true })
    await fs.writeFile(this.filePath(sessionId), JSON.stringify(initialData), 'utf-8')
  }

  async persistSessionData(sessionId: string, sessionData: SessionData): Promise<void> {
    await fs.mkdir(this.basePath, { recursive: true })
    await fs.writeFile(this.filePath(sessionId), JSON.stringify(sessionData), 'utf-8')
  }

  async deleteSession(sessionId: string): Promise<void> {
    try {
      await fs.unlink(this.filePath(sessionId))
    } catch {
      // nop.
    }
  }
}
