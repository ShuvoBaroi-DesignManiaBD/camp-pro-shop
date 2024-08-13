
export type ProductImage = {
  url: string;
  alt?: string;
}

export type TProduct = {
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: ProductImage[];
  isStock: boolean;
  isDeleted: boolean;
}

