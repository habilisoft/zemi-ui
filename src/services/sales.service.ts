import axios from 'axios';

export class SalesService {
  readonly endpoint: string;

  constructor() {
    this.endpoint = '/api/sales/v1';
  }


  async makeSale(data: any) {
    try {
      const response = await axios.post(`${this.endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`[SalesService][makeSale]: ${error}`);
      throw error;
    }
  }

}
