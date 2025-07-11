import type { Creator } from "./creator";
import type { DonationData } from "./donationData";
import type { FAQ } from "./faq";
import type { ProductOption } from "./productOption";
import type { Review } from "./review";
import type { Update } from "./update";

type ProjectType = "sell" | "donation";

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  // subCategories: string[];
  images: string[];
  creator: Creator;
  price?: number;
  options?: ProductOption[]; // 이것도 판매만
  donation?: DonationData; // 이건 후원만
  updates: Update[];
  reviews: Review[];
  faqs: FAQ[];
  stats: {
    likes: number;
    shares: number;
    views: number;
  };
}
