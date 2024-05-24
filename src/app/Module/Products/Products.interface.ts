export interface VariantsObject {
  type: string;
  value: string;
}
export interface InventoryObject {
  quantity: number;
  inStock: boolean;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  tags: string[];
  variants: VariantsObject[];
  inventory: InventoryObject;
}
