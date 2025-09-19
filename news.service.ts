const Yaml = import("js-yaml").then((m) => m.default);
import { once } from "es-toolkit";
import { addDays, retry } from "@/util";
import type { ByLang } from "@/util.types";
import type { NewsItem, NewsServiceI } from "@/home/news.types";

const NEWS_URL: string = import.meta.env.VITE_NEWS_URL;

/** A news item in the Newsdesk repo */
type SbNewsItem = {
  title: ByLang | string;
  body: ByLang | string;
  created: Date;
  expires?: Date;
  tags?: string[];
};

/**
 * Fetch and parse a YAML newsfeed
 *
 * @returns Recent news items
 * @throws Fetch or parse errors
 */
export const fetchAllNews = once(async (): Promise<SbNewsItem[]> => {
  if (!NEWS_URL) return [];
  const response = await retry(() => fetch(NEWS_URL));
  const yaml = await response.text();
  const items = (await Yaml).load(yaml) as SbNewsItem[];

  const now = new Date();
  const filtered = items.filter(
    (item) =>
      item.created <= now && // Skip future items
      (!item.expires || item.expires > now) && // Skip expired items
      item.created > addDays(now, -365 / 2), // Skip items older than 6 months
  );

  return filtered;
});

/**
 * Fetch news
 *
 * @param featured Select items having, or not having, the "featured" tag.
 * @returns Recent news items
 * @throws Fetch or parse errors
 */
export async function fetchNews(featured: boolean): Promise<NewsItem[]> {
  const items = await fetchAllNews();
  return items.filter((item) => !!item.tags?.includes("featured") == featured);
}

const newsService: NewsServiceI = {
  loadNews: () => fetchNews(false),
  loadFeatured: () => fetchNews(true),
};

export default newsService;
