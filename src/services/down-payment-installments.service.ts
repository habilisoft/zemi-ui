import axios from 'axios';
import { IDownPaymentInstallmentResponse } from '@/types';

export class DownPaymentInstallmentsService {
  readonly endpoint: string;

  constructor() {
    this.endpoint = `/api/v1/down-payment/installments`;
  }

  /*
   *==================
   * GET requests
   *==================
   */

  async getDownPaymentInstallment(id: string): Promise<IDownPaymentInstallmentResponse> {
    try {
      const { data } = await axios.get(this.endpoint + "/" + id);
      return data;
    } catch (error) {
      console.error(`[DownPaymentInstallmentsService][getDownPaymentInstallments]: ${error}`);
      throw error;
    }
  }
}