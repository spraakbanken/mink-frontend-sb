import { once } from "es-toolkit";
import { addDays, retry } from "@/util";
import type { ByLang } from "@/util.types";
import type { NewsService } from "@/news/news.types";

const NEWS_URL: string =
  "https://raw.githubusercontent.com/spraakbanken/newsdesk/main/data/mink.yaml";

/** A news item in the Newsdesk repo */
export type NewsItem = {
  title: ByLang | string;
  body: ByLang | string;
  created: Date;
  expires?: Date;
  tags?: NewsTag[];
};

/** News item tags recognized by this frontend */
type NewsTag = "featured" | string;

export class SbNewsService implements NewsService {
  loadLatestNews = () => fetchNews(false);
  loadFeaturedNews = () => fetchNews(true);
}

/**
 * Fetch and parse a YAML newsfeed
 *
 * @returns All items
 * @throws Fetch or parse errors
 */
export const fetchAllNews = once(async (): Promise<NewsItem[]> => {
  if (!NEWS_URL) return [];
  const response = await retry(() => fetch(NEWS_URL));
  const yaml = await response.text();
  const YAML = await import("yaml");
  return YAML.parse(yaml, { customTags: ["timestamp"] }) as NewsItem[];
});

/**
 * Fetch news and select recent items
 *
 * @param filterFeatured If true, select items having the "featured" tag;
 *   if false, select items *not* having the "featured" tag;
 *   if undefined, select all recent items.
 * @returns Recent news items
 * @throws Fetch or parse errors
 */
export async function fetchNews(filterFeatured?: boolean): Promise<NewsItem[]> {
  const now = new Date();
  let items = (await fetchAllNews()).filter(
    (item) =>
      item.created <= now && // Skip future items
      (!item.expires || item.expires > now) && // Skip expired items
      item.created > addDays(now, -31), // Skip items older than 1 month
  );

  // Filter by the "featured" tag if specified
  if (filterFeatured != null)
    items = items.filter(
      (item) => !!item.tags?.includes("featured") == filterFeatured,
    );

  return items;
}
