import { createContext, useContext, FC } from 'react';

import { IProduct } from 'models';
import useLocalStorageState from 'use-local-storage-state';

export interface IProductsContext {
  products: IProduct[];
  setProducts(products: IProduct[]): void;
  filters: string[];
  setFilters(filters: string[]): void;
}

const ProductsContext = createContext<IProductsContext | undefined>(undefined);
const useProductsContext = (): IProductsContext => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider'
    );
  }

  return context;
};

const ProductsProvider:  FC<{ children: React.ReactNode }> = ({children}) => {
  const [products, setProducts] = useLocalStorageState<IProduct[]>('allProducts', {defaultValue: []});
  const [filters, setFilters] = useLocalStorageState<string[]>('filters', {defaultValue:[]});

  const ProductContextValue: IProductsContext = {
    products,
    setProducts,
    filters,
    setFilters,
  };

  return <ProductsContext.Provider value={ProductContextValue}>{children}</ProductsContext.Provider>;
};

export { ProductsProvider, useProductsContext };