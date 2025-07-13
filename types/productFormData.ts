export interface ProductImage {
  file: File;
  previewUrl: string;
}

export interface ProductFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  price: string;
  images: ProductImage[];
  options: {
    name: string;
    price: string;
    description: string;
    file?: File;
  }[];
  creatorName: string;
  creatorBio: string;
  creatorAvatar: string;
}
