import { useEffect } from 'react';

import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function App() {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container>
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
         </S.Side>
        <S.Main>
          <S.MainHeader>
            <p>{products?.length} Product(s) found</p>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;