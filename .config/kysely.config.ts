import { defineConfig } from "kysely-ctl";
import { ExpoDialect } from "kysely-expo";
import { DATABASE_NAME } from "@/constants/app";

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: new ExpoDialect({ database: DATABASE_NAME }),
  migrations: {
    migrationFolder: "./data/migrations",
  },
  plugins: [],
  seeds: {
    seedFolder: "seeds",
  },
});
