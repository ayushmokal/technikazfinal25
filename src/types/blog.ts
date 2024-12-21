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
  popular?: boolean;
  created_at: string;
  updated_at: string;
}

export const categories = {
  TECH: ["Tech Deals", "News"],
  GAMES: ["PC", "PS5", "Xbox", "Nintendo"],
  ENTERTAINMENT: ["MOVIES", "SERIES", "COMICS"],
  STOCKS: ["Market News", "Analysis", "IPO", "Crypto"]
} as const;

export type Category = keyof typeof categories;
export type Subcategory = typeof categories[Category][number];