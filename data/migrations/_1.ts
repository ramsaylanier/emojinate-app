import { Kysely, sql } from "kysely";
import { SQLiteType } from "kysely-expo";

export async function up(db: Kysely<any>): Promise<void> {
  console.info("running migration 1");
  try {
    sql`begin transaction;`; //eslint-disable-line no-unused-expressions

    await db.schema
      .createTable("posts")
      .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
      .addColumn("name", SQLiteType.String, (col) => col.notNull())
      .addColumn("emoji", SQLiteType.Json, (col) => col.notNull())
      .addColumn("content", SQLiteType.String, (col) => col.notNull())
      .addColumn("created_at", SQLiteType.DateTime, (col) => col.notNull())
      .addColumn("updated_at", SQLiteType.DateTime)
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
  console.info("migrating down from: 1");
  await db.schema.dropTable("posts").execute();
}

export default { up, down };
