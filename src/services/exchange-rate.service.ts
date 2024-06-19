import axios from "axios";
import { IExchangeRateResponse } from '@/types';

export class ExchangeRateService {
  readonly endpoint: string;

  constructor() {
    this.endpoint = `/api/v1/exchange-rate`;
  }

  /*
   *==================
   * GET requests
   *==================
   */

  async getExchangeRate({from, to}: {from: string, to: string}): Promise<IExchangeRateResponse> {
    try {
      const { data } = await axios.get(`${this.endpoint}?from=${from}&to=${to}`);
      return data;
    } catch (error) {
      console.error(`[ExchangeRateService][getExchangeRates]: ${error}`);
      throw error;
    }
  }

  async getSources(): Promise<Record<string, string>[]> {
    try {
      const { data } = await axios.get(`${this.endpoint}/sources`);
      return data;
    } catch (error) {
      console.error(`[ExchangeRateService][getSources]: ${error}`);
      throw error;
    }
  }

  async changeSource(param: { from: string; to: string; source: string }): Promise<IExchangeRateResponse> {
    try {
      const { data } = await axios.post(`${this.endpoint}/change-source?from=${param.from}&to=${param.to}&source=${param.source}`);
      return data;
    } catch (error) {
      console.error(`[ExchangeRateService][changeSource]: ${error}`);
      throw error;
    }

  }
}
