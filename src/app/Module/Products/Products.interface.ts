export interface TVariantsObject {
  type: string;
  value: string;
}
export interface TInventoryObject {
  quantity: number;
  inStock: boolean;
}

export interface TProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  variants: TVariantsObject[];
  inventory: TInventoryObject;
}
