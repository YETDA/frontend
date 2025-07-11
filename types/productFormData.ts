export interface ProductOption {
  name: string;
  price: string;
  description: string;
}

export interface ProductFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  price: string;
  images: string[];
  options: ProductOption[];
  creatorName: string;
  creatorBio: string;
  creatorAvatar: string;
}
