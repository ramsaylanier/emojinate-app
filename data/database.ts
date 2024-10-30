import { Database } from "./schema";
import { ExpoDialect } from "kysely-expo";
import { Kysely, ParseJSONResultsPlugin } from "kysely";
import { DATABASE_NAME } from "@/constants/app";

const db = new Kysely<Database>({
  dialect: new ExpoDialect({ database: DATABASE_NAME }),
  plugins: [new ParseJSONResultsPlugin()],
});

export default db;

// DATABASE METHODS
export const insertPost = async (
  name: string,
  emoji: Emoji[],
  content: string,
  createdAt: Date,
  updatedAt: Date
) => {
  const res = await db
    .insertInto("posts")
    .values({
      name,
      emoji,
      content,
      created_at: createdAt,
      updated_at: updatedAt,
    })
    .executeTakeFirst();

  if (!res) {
    throw Error("Record not created");
  }

  return res;
};

export const fetchPosts = async () => {
  return db.selectFrom("posts").selectAll().execute();
};

export const deletePost = async (id: number) => {
  if (!id) {
    throw Error("No id found.");
  }

  return db.deleteFrom("posts").where("id", "=", Number(id)).execute();
};

export const updateSettings = async (
  count: number,
  excludedGroups: string[]
) => {
  try {
    const res = await db
      .updateTable("settings")
      .set({ count, excludedGroups })
      .execute();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSettings = async () => {
  return db.selectFrom("settings").selectAll().executeTakeFirst();
};
