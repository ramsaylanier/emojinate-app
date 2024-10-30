import { Generated, Selectable } from "kysely";

export interface PostsTable {
  id: Generated<number>;
  name: string;
  emoji: Emoji[];
  content: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export type PostRecord = Selectable<PostsTable>;

export interface SettingsTable {
  count: number;
  excludedGroups: string[];
}

export type SettingsRecord = Selectable<SettingsTable>;

export interface Database {
  posts: PostsTable;
  settings: SettingsTable;
}
