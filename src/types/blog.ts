import type { MicroCMSListContent } from "microcms-js-sdk";

export type PostTag = {
  name: string
} & MicroCMSListContent

export type Post = {
  title: string;
  description: string,
  content: string,
  eyecatch: {
    url: string,
    height: number,
    width: number,
  },
  tag: PostTag[],
} & MicroCMSListContent
