import axios from 'axios';
import { INcfSequenceRequest } from '@/types';

export class TaxManagementService {
  readonly endpoint: string;
  constructor() {
    this.endpoint = '/api/tax-management/v1';
  }

  async addNcfSequence(data: INcfSequenceRequest) {
    try {
      const response = await axios.post(`${this.endpoint}/ncf-sequence`, data);
      return response.data;
    } catch (error) {
      console.error(`[TaxManagementService][addNcfSequence]: ${error}`);
      throw error;
    }
  }

}
