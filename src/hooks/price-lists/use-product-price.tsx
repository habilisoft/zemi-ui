import { useQuery } from '@apollo/client';
import { GET_PRODUCT_PRICE } from '@/queries.ts';

export function useProductPrice(productId?: number, priceListId?: number) {
    const { loading, data, refetch } = useQuery(GET_PRODUCT_PRICE, {
        variables: { productId, priceListId },
        skip: !productId,
    });
    return {
        loading,
        price: data?.productPrice?.price,
        reload: refetch,
    };
}
