import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  console.info("running migration 3");
  try {
    sql`begin transaction;`; //eslint-disable-line no-unused-expressions

    await db
      .insertInto("settings")
      .values({ count: 5, excludedGroups: ["Flags", "Symbols"] })
      .execute();

    sql`commit;`; //eslint-disable-line no-unused-expressions
  } catch (error) {
    console.error("rolling back:", error);
    sql`rollback;`; //eslint-disable-line no-unused-expressions

    throw error;
  }
}

export async function down(db: Kysely<any>): Promise<void> {
  console.info("migrating down from: 3");
  await db.schema.dropTable("settings").execute();
}

export default { up, down };
