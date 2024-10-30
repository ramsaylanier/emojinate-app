import React from "react";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  deletePost,
  fetchPosts,
  fetchSettings,
  insertPost,
  updateSettings,
} from "@/data/database";
import emoji from "@/emoji.json";

export class Post {
  id: number;
  name: string;
  emoji: Emoji[];
  content: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    emoji: Emoji[],
    content: string,
    created_at: Date,
    updated_at: Date
  ) {
    makeObservable(this);
    this.id = id;
    this.name = name;
    this.emoji = emoji;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  @computed
  get excerpt() {
    return this.content.substring(0, 30).concat("...");
  }
}

const defaultExcludedGroups = ["Flags", "Symbols"];

export const emojiGroupNames = emoji.map((g) => g.group);

export class Store {
  @observable emojiLength = 5;
  @observable visibleEmoji = [] as Emoji[];
  @observable posts = [] as Post[];
  @observable excludedGroups = defaultExcludedGroups;
  @observable emojiGroupNames = emojiGroupNames;

  constructor() {
    makeObservable(this);
    this.fetchSettings();
    this.fetchPosts();
  }

  @computed
  get flatMapEmoji() {
    return emoji
      .filter((g) => !this.excludedGroups.includes(g.group))
      .reduce((emoji, group) => {
        emoji.push(...group.emoji);
        return emoji;
      }, [] as Emoji[]);
  }

  @computed
  get postsByDate() {
    return this.posts.slice().sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  @action
  setEmojiLength(value: number) {
    this.emojiLength = value;
    this.resetEmojis();
  }

  @action
  resetEmojis() {
    this.visibleEmoji = Array.from(
      { length: this.emojiLength },
      (v, i) =>
        this.flatMapEmoji[Math.floor(Math.random() * this.flatMapEmoji.length)]
    );
  }

  @action
  toggleEmojiGroup(group: string) {
    if (this.excludedGroups.includes(group)) {
      this.excludedGroups = this.excludedGroups.filter((g) => g !== group);
    } else {
      this.excludedGroups.push(group);
    }
    this.resetEmojis();
  }

  @action
  async addPost(name: string = "", content: string = "") {
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) {
      throw Error("Name is required.");
    }

    if (!trimmedContent) {
      throw Error("Content is required.");
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const res = await insertPost(
      name,
      this.visibleEmoji,
      content,
      createdAt,
      updatedAt
    );
    if (res) {
      runInAction(() => {
        const newPost = new Post(
          Number(res.insertId),
          name,
          this.visibleEmoji,
          content,
          createdAt,
          updatedAt
        );
        this.posts.push(newPost);
      });
    }
  }

  @action
  async deletePost(id: number) {
    this.posts = this.posts.filter((p) => p.id !== id);
    deletePost(id);
  }

  @action
  async fetchPosts() {
    const posts = await fetchPosts();
    if (posts) {
      runInAction(() => {
        this.posts = posts.map(
          (p) =>
            new Post(
              p.id,
              p.name,
              p.emoji,
              p.content,
              p.created_at,
              p.updated_at
            )
        );
      });
    }
  }

  @action
  saveSettings() {
    return updateSettings(this.emojiLength, this.excludedGroups);
  }

  @action
  async fetchSettings() {
    const settings = await fetchSettings();
    if (settings) {
      runInAction(() => {
        this.emojiLength = settings.count;
        this.excludedGroups = settings.excludedGroups;
        this.resetEmojis();
      });
    }
  }
}

const store = new Store();
export const StoreContext = React.createContext<Store>(store);
export const useStore = () => React.useContext(StoreContext);
