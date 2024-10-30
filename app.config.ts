import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "emojinate",
  slug: "emojinate",
  ios: {
    bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_ID,
  },
  android: {
    package: process.env.EXPO_PUBLIC_BUNDLE_ID,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
    },
  },
  owner: process.env.EXPO_PUBLIC_OWNER,
});
