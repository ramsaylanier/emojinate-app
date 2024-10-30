import { Kysely, sql } from "kysely";
import { SQLiteType } from "kysely-expo";

export async function up(db: Kysely<any>): Promise<void> {
  console.info("running migration 2");
  try {
    sql`begin transaction;`; //eslint-disable-line no-unused-expressions

    await db.schema
      .createTable("settings")
      .addColumn("count", "integer")
      .addColumn("excludedGroups", SQLiteType.Json)
      .ifNotExists()
      .execute();

    sql`commit;`; //eslint-disable-line no-unused-expressions
  } catch (error) {
    console.error("rolling back:", error);
    sql`rollback;`; //eslint-disable-line no-unused-expressions

    throw error;
  }
}

export async function down(db: Kysely<any>): Promise<void> {
  console.info("migrating down from: 2");
  await db.schema.dropTable("settings").execute();
}

export default { up, down };
