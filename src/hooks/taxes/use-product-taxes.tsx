import { useQuery } from '@apollo/client';
import { GET_PRODUCT_TAXES } from '@/queries.ts';

export function useProductTaxes(productId?: number) {
    const { loading, data, refetch } = useQuery(GET_PRODUCT_TAXES, {
        variables: { productId },
        skip: !productId,
    });
    return {
        loading,
        taxes: data?.productTaxes || [] as any[],
        reload: refetch,
    };
}
