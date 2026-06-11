import { addDays, retry } from "@/util";
import type { NewsItem, NewsService } from "@/news/news.types";

const NEWS_URL: string =
  "https://raw.githubusercontent.com/spraakbanken/newsdesk/main/data/mink.yaml";
const RECENT_DAYS = 31;

/** A news item in the Newsdesk repo */
type SbNewsItem = NewsItem & {
  expires?: Date;
  tags?: string[];
};

/** Fetches news from Språkbanken's newdesk (a remote YAML file) */
export class SbNewsService implements NewsService {
  /** Loaded news items */
  protected items: SbNewsItem[] | null = null;

  /** Fetch, parse and filter news items */
  static async fetchItems() {
    const response = await retry(() => fetch(NEWS_URL));
    const yaml = await response.text();

    // Parse with timestamp support
    const YAML = await import("yaml");
    const items = YAML.parse(yaml, {
      customTags: ["timestamp"],
    }) as SbNewsItem[];

    const now = new Date();
    return items.filter(
      (item) =>
        item.created <= now && // Skip future items
        (!item.expires || item.expires > now) && // Skip expired items
        item.created > addDays(now, -RECENT_DAYS), // Skip old items
    );
  }

  /** Load news items if not already loaded */
  async loadItems() {
    if (!this.items) this.items = await SbNewsService.fetchItems();
    return this.items;
  }

  /** @inheritdoc */
  async loadLatestNews() {
    const items = await this.loadItems();
    return items.filter((item) => !item.tags?.includes("featured"));
  }

  /** @inheritdoc */
  async loadFeaturedNews() {
    const items = await this.loadItems();
    return items.filter((item) => item.tags?.includes("featured"));
  }
}
