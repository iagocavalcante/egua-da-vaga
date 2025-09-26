import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'dev.iagocavalcante.eguadavaga',
  appPath: 'app',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  ios: {
    deploymentTarget: '12.0',
  },
} as NativeScriptConfig
