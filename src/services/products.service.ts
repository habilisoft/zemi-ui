import axios, { AxiosError } from 'axios';
import { ICreateProductRequest } from '@/types';

export class ProductsService {
  readonly products_endpoint: string;

  constructor() {
    this.products_endpoint = `/api/catalog/v1/products`;
  }

  async createProduct(data: ICreateProductRequest): Promise<any> {
    try {
      const response = await axios.post(this.products_endpoint, data);
      return response.data;
    } catch (error: AxiosError | any) {
      console.error(`[ProductsService][createProduct]: ${error}`);
      throw error;
    }
  }

  async changePrice(productId: number, price: number): Promise<any> {
    try {
      const response = await axios.post(`/api/price-management/v1/product/${productId}/change-price`, { price });
      return response.data;
    } catch (error: AxiosError | any) {
      console.error(`[ProductsService][changePrice]: ${error}`);
      throw error;
    }
  }
  async changeTaxes(productId: number, taxes: number[]): Promise<any> {
    try {
      const response = await axios.post(`/api/tax-management/v1/product/${productId}/tax`, { taxes });
      return response.data;
    } catch (error: AxiosError | any) {
      console.error(`[ProductsService][changeTaxes]: ${error}`);
      throw error;
    }
  }
}
