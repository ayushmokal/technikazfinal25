export interface BlogFormData {
  id?: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  author: string;
  image_url: string;
  slug: string;
  featured?: boolean;
  featured_in_category?: boolean;
  popular?: boolean;
  created_at: string;
  updated_at: string;
}

export const categories = {
  TECH: ["Tech Deals", "News"],
  GAMES: ["PS5", "Xbox", "Nintendo", "PC"],
  ENTERTAINMENT: ["Movies", "Series", "Comics"],
  STOCKS: ["Market News", "Analysis", "IPO", "Crypto"],
  GADGETS: ["MOBILE", "LAPTOPS"]
} as const;

export type Category = keyof typeof categories;
export type Subcategory = (typeof categories[Category][number] | "ALL");