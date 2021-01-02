import { config } from 'dotenv'
import { notarize } from 'electron-notarize'
import path from 'path'

config()

const notarizeArch = (arch: 'arm' | 'x') =>
  notarize({
    appBundleId: 'com.browserosaurus',
    appPath: path.resolve(
      __dirname,
      '..',
      `out/Browserosaurus-darwin-${arch}64/Browserosaurus.app`,
    ),
    appleId: String(process.env.APPLE_ID),
    appleIdPassword: '@keychain:AC_PASSWORD',
    // Team ID
    ascProvider: 'Z89KPMLTFR',
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Notarization didn't work :(", error.message)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })

;(async () => {
  await notarizeArch('arm')
  await notarizeArch('x')
})()
