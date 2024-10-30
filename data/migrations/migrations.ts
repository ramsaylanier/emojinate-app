import { Kysely, Migrator } from "kysely";

import { ExpoMigrationProvider } from "kysely-expo";
import { Database } from "../schema";

import _1 from "./_1";
import _2 from "./_2";
import _3 from "./_3";

export const getMigrator = (database: Kysely<Database>) =>
  new Migrator({
    db: database,
    provider: new ExpoMigrationProvider({
      migrations: {
        "1": _1,
        "2": _2,
        "3": _3,
      },
    }),
  });
