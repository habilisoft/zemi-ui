import axios from "axios";
import { IRegisterCustomerRequest } from '@/types';

export class CustomerService {
  readonly customer_endpoint: string;
  constructor() {
    this.customer_endpoint = `/api/customers/v1`;
  }
  /*
    *==================
    * POST requests
    * ==================
   */
  async registerCustomer(buyer: IRegisterCustomerRequest) {
    try {
      const { data } = await axios.post(this.customer_endpoint, buyer);
      return data;
    } catch (error) {
      console.error(`[CustomerService][createBuyer]: ${error}`);
      throw error;
    }
  }

  async changeCreditLimit(customerId: number, creditLimit: number) {
    try {
      const { data } = await axios.post(`/api/account-receivables/v1/customer/${customerId}/change-credit-limit`, { creditLimit });
      return data;
    } catch (error) {
      console.error(`[CustomerService][changeCreditLimit]: ${error}`);
      throw error;
    }
  }

  async changeNcfType(customerId: number, ncfType: string) {
    try {
      const { data } = await axios.post(`/api/tax-management/v1/customer/${customerId}/change-ncf-type`, { ncfType });
      return data;
    } catch (error) {
      console.error(`[CustomerService][changeNcfType]: ${error}`);
      throw error
    }
  }

  async changePriceList(customerId: number, priceListId: string) {
    try {
      const { data } = await axios.post(`/api/price-management/v1/customer/${customerId}/change-price-list`, { priceListId });
      return data;
    } catch (error) {
      console.error(`[CustomerService][changeNcfType]: ${error}`);
      throw error
    }
  }
}
