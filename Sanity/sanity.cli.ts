import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tg3ixu9i',
    dataset: 'production',
  },
  deployment: {
    appId: 'tnb5px2p5am8k5xfz64d5yku',
    autoUpdates: true,
  },
})
