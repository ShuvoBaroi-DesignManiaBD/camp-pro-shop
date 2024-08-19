
export type ProductImage = {
  url: string;
  alt?: string;
}

export type TProduct = {
  _id: string;
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

export interface ProductData {
  name: string;
  price: number;
  images: ProductImage[];
}