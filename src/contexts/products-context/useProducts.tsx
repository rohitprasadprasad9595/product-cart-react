import { useCallback } from 'react';

import { useProductsContext } from './ProductsContextProvider';
import { IProduct } from 'models';
import { getProducts } from 'services/products';

const useProducts = () => {
  const {
    products,
    setProducts,
    filters,
    setFilters,
  } = useProductsContext();

  const fetchProducts = useCallback(() => {
    getProducts().then((products: IProduct[]) => {
      setProducts(products);
    });
  }, [setProducts]);

  const filterProducts = (filters: string[]) => {
    getProducts().then((products: IProduct[]) => {
      let filteredProducts;

      if (filters && filters.length > 0) {
        filteredProducts = products.filter((p: IProduct) =>
          filters.find((filter: string) =>
            p.availableVariants.find((size: string) => size === filter)
          )
        );
      } else {
        filteredProducts = products;
      }

      setFilters(filters);
      setProducts(filteredProducts);
    });
  };

  return {
    fetchProducts,
    products,
    filterProducts,
    filters,
  };
};

export default useProducts;