import { Stack } from "expo-router";
import { KyselyProvider } from "kysely-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMigrator } from "@/data/migrations/migrations";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Database } from "@/data/schema";
import { DATABASE_NAME } from "@/constants/app";

export default function RootLayout() {
  const { background } = useThemeColors();

  return (
    <KyselyProvider<Database>
      database={DATABASE_NAME}
      autoAffinityConversion
      debug={__DEV__ ? true : false}
      onInit={async (database) => {
        try {
          await getMigrator(database).migrateToLatest();
        } catch (err) {
          console.error({ err });
        }
      }}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            headerTitleStyle: {
              fontFamily: "NotoSans-Regular",
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="(main)" />
        </Stack>
      </SafeAreaView>
    </KyselyProvider>
  );
}
