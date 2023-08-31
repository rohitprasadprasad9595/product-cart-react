import { createContext, useContext, FC, useState } from 'react';
import { ICartProduct, ICartTotal } from 'models';
import useLocalStorageState from 'use-local-storage-state';

export interface ICartContext {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
  products: ICartProduct[];
  setProducts(products: ICartProduct[]): void;
  total: ICartTotal;
  setTotal(products: any): void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);
const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

const totalInitialValues = {
  productQuantity: 0,
  totalPrice: 0,
  currencyId: 'USD',
  currencyFormat: '$',
};

const CartProvider: FC<{ children: React.ReactNode }> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useLocalStorageState<ICartProduct[]>('cartProducts', {defaultValue: []});
  const [total, setTotal] = useLocalStorageState<ICartTotal>('total', {defaultValue: totalInitialValues});

  const CartContextValue: ICartContext = {
    isOpen,
    setIsOpen,
    products,
    setProducts,
    total,
    setTotal,
  };

  return <CartContext.Provider value={CartContextValue}>{children}</CartContext.Provider>;
};

export { CartProvider, useCartContext };
