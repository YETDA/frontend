export interface Creator {
  id: string;
  name: string;
  email: string;
  role: string;
  followers: number;
  following: number;
  likes: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  amount: number;
  deliveryMethod: string;
  deliveryDate: Date;
  maxQuantity: number;
  currentQuantity: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mainImage: string;
  images: string[];
  creator: Creator;
  currentFunding: number;
  fundingPeriod: {
    start: Date;
    end: Date;
  };
  rewards: Reward[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
