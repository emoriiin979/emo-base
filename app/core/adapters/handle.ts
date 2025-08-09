import type { Adapter } from './Adapter.d.js'

const handle = async (
  adapter: Adapter
) => {
  adapter.handle()
}

export default handle
