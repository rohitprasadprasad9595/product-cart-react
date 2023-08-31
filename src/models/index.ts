export interface IProduct {
  id: number;
  sku: number;
  title: string;
  availableVariants: string[];
  price: number;
  currencyId: string;
  currencyFormat: string;
 }

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface ICartTotal {
  productQuantity: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}