export interface DonationFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  // 목표 금액
  targetAmount: string;
  images: string[];
  creatorName: string;
  creatorBio: string;
  creatorAvatar: string;
}
