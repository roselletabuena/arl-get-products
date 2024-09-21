export interface Variety {
  unit: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface Product {
  name: string;
  totalQuantity: number;
  varieties: Variety[];
  description?: string;
}
